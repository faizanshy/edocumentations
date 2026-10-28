-- E DOCUMENTATIONS schema — run in the Supabase SQL Editor.
-- Review policies and business requirements before production launch.
create extension if not exists pgcrypto;

create type public.app_role as enum ('customer', 'admin');
create type public.order_state as enum (
  'Pending Review','Quotation Sent','Awaiting Customer Approval','Approved',
  'In Production','Ready for Pickup','Out for Delivery','Completed','Cancelled'
);
create type public.payment_state as enum ('Unpaid','Awaiting Payment','Partially Paid','Paid','Refunded','Not Applicable');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  unique(user_id, role)
);

create table public.service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.service_categories(id) on delete set null,
  name text not null,
  slug text unique,
  description text,
  specifications jsonb not null default '{}'::jsonb,
  base_price numeric(12,2),
  currency text not null default 'PKR',
  minimum_quantity integer not null default 1 check (minimum_quantity > 0),
  requires_custom_quote boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_options (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  option_key text not null,
  label text not null,
  options jsonb not null default '[]'::jsonb,
  required boolean not null default false,
  sort_order integer not null default 0,
  unique(product_id, option_key)
);

create table public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  rule_name text not null,
  rule_type text not null check (rule_type in ('base','per_page','per_copy','paper_size','paper_type','colour','sides','finishing','design','delivery','minimum_quantity')),
  match_value text,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'PKR',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_reference text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  city text,
  delivery_address text,
  service_category text not null,
  product_name text not null,
  specifications jsonb not null default '{}'::jsonb,
  quantity integer not null default 1 check (quantity > 0),
  estimated_price numeric(12,2),
  currency text not null default 'PKR',
  requested_delivery_date date,
  additional_instructions text,
  order_status public.order_state not null default 'Pending Review',
  payment_status public.payment_state not null default 'Unpaid',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null default 1 check (quantity > 0),
  specifications jsonb not null default '{}'::jsonb,
  unit_price numeric(12,2),
  line_total numeric(12,2),
  created_at timestamptz not null default now()
);

create table public.order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  storage_path text not null,
  original_filename text not null,
  mime_type text,
  file_size bigint check (file_size is null or file_size <= 10485760),
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.quotations (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  quote_reference text not null unique,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'PKR',
  line_items jsonb not null default '[]'::jsonb,
  terms text,
  valid_until date,
  sent_at timestamptz,
  accepted_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  previous_status public.order_state,
  new_status public.order_state not null,
  changed_by uuid references auth.users(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  service text,
  budget text,
  timeline text,
  reference_links text,
  description text not null,
  status text not null default 'New',
  admin_notes text,
  created_at timestamptz not null default now()
);

create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text not null,
  brief text,
  design_approach text,
  deliverables jsonb not null default '[]'::jsonb,
  is_concept boolean not null default true,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portfolio_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.service_packages (
  id uuid primary key default gen_random_uuid(),
  service_name text not null,
  package_name text not null,
  description text,
  features jsonb not null default '[]'::jsonb,
  price numeric(12,2),
  currency text not null default 'PKR',
  is_custom_quote boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index orders_user_created_idx on public.orders(user_id, created_at desc);
create index orders_status_created_idx on public.orders(order_status, created_at desc);
create index order_files_order_idx on public.order_files(order_id);
create index enquiries_created_idx on public.enquiries(created_at desc);
create index products_category_active_idx on public.products(category_id, is_active);

-- Role helper. Security definer avoids recursive RLS evaluation on user_roles.
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.service_categories enable row level security;
alter table public.products enable row level security;
alter table public.product_options enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_files enable row level security;
alter table public.quotations enable row level security;
alter table public.order_status_history enable row level security;
alter table public.enquiries enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_images enable row level security;
alter table public.faqs enable row level security;
alter table public.service_packages enable row level security;
alter table public.site_settings enable row level security;

create policy "profiles read own or admin" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
create policy "profiles update own" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles insert own" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "roles read own or admin" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.is_admin());
-- Never allow users to self-assign admin. Assign the first admin manually in the SQL editor.
create policy "categories public read active" on public.service_categories for select to anon, authenticated using (is_active or public.is_admin());
create policy "categories admin manage" on public.service_categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "products public read active" on public.products for select to anon, authenticated using (is_active or public.is_admin());
create policy "products admin manage" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "options public read active product" on public.product_options for select to anon, authenticated using (exists(select 1 from public.products p where p.id=product_id and p.is_active) or public.is_admin());
create policy "options admin manage" on public.product_options for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "pricing public read active" on public.pricing_rules for select to anon, authenticated using (is_active or public.is_admin());
create policy "pricing admin manage" on public.pricing_rules for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Guest submissions are allowed by this initial policy. In production, add rate limiting,
-- abuse prevention, and server-side validation / Edge Function submission.
create policy "guest or customer create order" on public.orders for insert to anon, authenticated with check (user_id is null or user_id = auth.uid());
create policy "customer read own orders or admin" on public.orders for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "admin update orders" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin delete orders" on public.orders for delete to authenticated using (public.is_admin());
create policy "order items customer read" on public.order_items for select to authenticated using (exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "order items admin manage" on public.order_items for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "order files customer read" on public.order_files for select to authenticated using (exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "order files admin manage" on public.order_files for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "order files create metadata" on public.order_files for insert to authenticated with check (uploaded_by = auth.uid() and exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "quotations customer read own or admin" on public.quotations for select to authenticated using (exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "quotations admin manage" on public.quotations for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "status history customer read own or admin" on public.order_status_history for select to authenticated using (exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "status history admin manage" on public.order_status_history for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "guest or customer create enquiry" on public.enquiries for insert to anon, authenticated with check (user_id is null or user_id=auth.uid());
create policy "admin manage enquiries" on public.enquiries for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "portfolio public read published" on public.portfolio_projects for select to anon, authenticated using (is_published or public.is_admin());
create policy "portfolio admin manage" on public.portfolio_projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "portfolio images public read published" on public.portfolio_images for select to anon, authenticated using (exists(select 1 from public.portfolio_projects p where p.id=project_id and p.is_published) or public.is_admin());
create policy "portfolio images admin manage" on public.portfolio_images for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "faqs public read published" on public.faqs for select to anon, authenticated using (is_published or public.is_admin());
create policy "faqs admin manage" on public.faqs for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "packages public read active" on public.service_packages for select to anon, authenticated using (is_active or public.is_admin());
create policy "packages admin manage" on public.service_packages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "site settings public read" on public.site_settings for select to anon, authenticated using (key in ('business_name','email','instagram') or public.is_admin());
create policy "site settings admin manage" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Create a private bucket in the Storage dashboard named "order-files".
-- Keep it PRIVATE. Add carefully reviewed storage.objects policies before enabling uploads.
-- For a first admin, create the account through Supabase Auth, then run:
-- insert into public.user_roles (user_id, role) values ('AUTH-USER-UUID', 'admin');
