import {
  Printer, FileText, Palette, Layers3, Globe, Search, Smartphone,
  PanelsTopLeft, BadgeCheck, Package, Instagram, ScanText
} from 'lucide-react'

export const services = [
  { title: 'Printing & Paper Products', text: 'Print-ready results for everyday documents and standout business materials.', icon: Printer, href: '/printing', tag: 'PRINT STUDIO' },
  { title: 'Documentation Services', text: 'Clear, polished documents, CVs, reports, forms and professional layouts.', icon: FileText, href: '/services#documentation', tag: 'DOCUMENTS' },
  { title: 'Graphic Design', text: 'Scroll-stopping social creatives, ads, posters, presentations and more.', icon: Palette, href: '/graphic-design', tag: 'CREATIVE' },
  { title: 'Branding & Identity', text: 'A consistent visual system for businesses ready to look the part.', icon: Layers3, href: '/branding', tag: 'IDENTITY' },
  { title: 'Website Design & Development', text: 'Responsive websites built around your goals, audience and content.', icon: Globe, href: '/web-design', tag: 'WEB' },
  { title: 'SEO Services', text: 'Technical foundations, on-page improvements and practical search strategy.', icon: Search, href: '/seo', tag: 'DISCOVERY' },
  { title: 'Social Media Management', text: 'Consistent content planning, design support and account coordination.', icon: Smartphone, href: '/social-media', tag: 'SOCIAL' },
  { title: 'Business & Marketing Materials', text: 'Business cards, flyers, brochures, stationery, menus and packaging artwork.', icon: Package, href: '/printing', tag: 'BUSINESS' },
]

export const printProducts = [
  { name: 'A4 Document Printing', category: 'Paper printing', detail: 'Everyday documents, reports and forms', icon: FileText },
  { name: 'A3 & A2 Printing', category: 'Paper printing', detail: 'Larger-format prints and presentations', icon: PanelsTopLeft },
  { name: 'Business Cards', category: 'Business materials', detail: 'Matte, glossy and premium concepts', icon: BadgeCheck },
  { name: 'Flyers & Posters', category: 'Business materials', detail: 'Promotional and event print materials', icon: Palette },
  { name: 'Brochures & Company Profiles', category: 'Business materials', detail: 'Multi-page business storytelling', icon: Layers3 },
  { name: 'Panaflex Banners', category: 'Large format', detail: 'Custom dimensions and print-ready artwork', icon: PanelsTopLeft },
  { name: 'CV & Resume Design', category: 'Documentation', detail: 'Professional layout and formatting', icon: FileText },
  { name: 'PDF / Word Formatting', category: 'Documentation', detail: 'Readable, organized and print-ready files', icon: ScanText },
]

export const faqs = [
  ['Which paper sizes can I request?', 'The catalogue includes A2, A3, A4, A5, A6 and custom-size requests. Final availability is confirmed when your order is reviewed.'],
  ['Can you help prepare my design?', 'Yes. Select “Design assistance required” in the order form and describe the look or content you need.'],
  ['What file formats can I upload?', 'Common artwork and document formats can be selected in the order form. Accepted formats and upload limits should be confirmed with the team before production.'],
  ['How much does printing cost?', 'Pricing depends on product, paper, dimensions, colour, quantity and finishing. Where a price has not been configured, request a custom quotation.'],
  ['Can I request a service not listed?', 'Yes. Use the custom requirement field or the Get a Quote page to explain what you need.'],
  ['How do I track my order?', 'After customer accounts and Supabase are configured, sign in to view your orders. You can also contact the business with your order reference.'],
  ['What are your turnaround and delivery times?', 'These depend on the job and destination. They are confirmed with the quotation rather than assumed on this website.'],
]

export const portfolio = [
  { title: 'Emerald Identity System', category: 'Branding', kind: 'Concept project', desc: 'A clean identity direction with bold typography and a focused green accent.' },
  { title: 'Modern Business Card', category: 'Business Cards', kind: 'Concept project', desc: 'A crisp, print-led card layout with considered spacing and contrast.' },
  { title: 'Product Launch Creative', category: 'Social Media', kind: 'Concept project', desc: 'A campaign visual system designed for a consistent social rollout.' },
  { title: 'Editorial Print Layout', category: 'Print Design', kind: 'Concept project', desc: 'A restrained brochure concept built around hierarchy and legibility.' },
  { title: 'Packaging Direction', category: 'Packaging', kind: 'Concept project', desc: 'A packaging concept with a strong silhouette and simple brand cues.' },
  { title: 'Digital Studio Homepage', category: 'Website Design', kind: 'Concept project', desc: 'A responsive homepage direction for a contemporary service business.' },
]
