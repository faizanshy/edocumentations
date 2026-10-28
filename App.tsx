import { useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, Check, ChevronDown, CircleHelp, Clock3, FileUp,
  Instagram, Mail, Menu, MoveUpRight, Printer, ShieldCheck, Sparkles, X,
  Send, Layers3, Globe, Palette, Search, Smartphone, FileText, Package, UserRound,
  LayoutDashboard, LogIn, UploadCloud, CheckCircle2
} from 'lucide-react'
import { services, printProducts, faqs, portfolio } from './data'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const email = 'faizanshy7@gmail.com'
const instagram = 'https://www.instagram.com/edocumentations/'
const nav = [
  ['Services', '/services'], ['Printing', '/printing'], ['Our Work', '/portfolio'],
  ['About', '/about'], ['FAQs', '/faqs']
]

function Logo({ light = false }: { light?: boolean }) {
  return <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="E DOCUMENTATIONS home">
    <span className="brand-symbol" aria-hidden="true"><span /></span>
    <span className="brand-type"><b>E</b> DOCUMENTATIONS<small>PRINT · DESIGN · DIGITAL</small></span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  return <header className="header">
    <div className="nav-wrap">
      <Logo />
      <button className="mobile-menu icon-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        {nav.map(([label, href]) => <NavLink key={href} to={href} onClick={() => setOpen(false)} className={({ isActive }) => isActive || (href === '/services' && location.pathname !== '/' && ['/graphic-design','/branding','/web-design','/seo','/social-media'].includes(location.pathname)) ? 'nav-active' : ''}>{label}</NavLink>)}
        <Link className="nav-cta" to="/order" onClick={() => setOpen(false)}>Start an order <ArrowUpRightIcon /></Link>
      </nav>
    </div>
  </header>
}
function ArrowUpRightIcon() { return <MoveUpRight size={16} /> }

function Footer() {
  return <footer className="footer">
    <div className="footer-top">
      <div className="footer-brand"><Logo light /><p>From every page to every pixel.<br />Your complete print & digital partner.</p>
        <a className="social-link" href={instagram} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram <MoveUpRight size={14} /></a>
      </div>
      <div><h4>Explore</h4><Link to="/services">All services</Link><Link to="/printing">Printing catalogue</Link><Link to="/portfolio">Our work</Link><Link to="/about">About us</Link></div>
      <div><h4>Services</h4><Link to="/graphic-design">Graphic design</Link><Link to="/branding">Brand identity</Link><Link to="/web-design">Web development</Link><Link to="/seo">SEO services</Link></div>
      <div><h4>Let's talk</h4><a href={`mailto:${email}`}>{email}</a><Link to="/quote">Get a quote <ArrowRight size={14} /></Link><Link to="/contact">Contact us</Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} E DOCUMENTATIONS</span><div><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms & conditions</Link></div><span>Made for ideas that move.</span></div>
  </footer>
}

function Scene3D() {
  return <div className="hero-art" aria-label="Stylized printing studio illustration">
    <div className="scene-glow" />
    <motion.div className="paper paper-back" animate={{ y: [0, -7, 0], rotate: [5, 7, 5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div className="paper paper-mid" animate={{ y: [0, 8, 0], rotate: [-4, -2, -4] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div className="paper paper-front" animate={{ y: [0, -5, 0], rotate: [2, 0, 2] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="mockup-brand"><span className="mini-e">E</span><b>DOCUMENTATIONS</b></div>
      <div className="mockup-rule" /><div className="mockup-heading">Ideas,<br />in print.</div><div className="mockup-lines"><i /><i /><i /></div>
      <div className="mockup-foot"><span>PRINT / DESIGN / DIGITAL</span><span>01—26</span></div>
    </motion.div>
    <motion.div className="card-mockup" animate={{ y: [0, 6, 0], rotate: [-8, -5, -8] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
      <span className="mini-e">E</span><b>Make it matter.</b><small>CREATIVE STUDIO</small>
    </motion.div>
    <div className="printer-mockup"><div className="printer-top" /><div className="printer-slot" /><div className="printer-front"><span /><span /><span /></div><div className="printer-paper" /></div>
    <div className="scene-stamp"><Sparkles size={15} /> MADE TO STAND OUT</div>
    <div className="scene-shadow" />
  </div>
}

function Home() {
  return <>
    <section className="hero container">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> YOUR COMPLETE PRINT & DIGITAL PARTNER</div>
        <h1>From every page<br />to every <em>pixel.</em></h1>
        <p className="hero-lead">Professional printing, documentation, graphic design, branding, websites, and digital marketing — all under one roof.</p>
        <div className="hero-actions"><Link className="btn btn-primary" to="/order">Start your order <ArrowRight size={18} /></Link><Link className="btn btn-secondary" to="/services">Explore our services <ArrowDownRight size={17} /></Link></div>
        <p className="hero-mantra">PRINT IT. <b>DESIGN IT.</b> BUILD IT. GROW IT.</p>
        <div className="hero-proof"><span><Check size={15} /> Print & documentation</span><span><Check size={15} /> Creative & digital</span></div>
      </div>
      <Scene3D />
      <div className="hero-side-note">ED / STUDIO — 01</div>
    </section>
    <div className="trust-strip"><div className="container trust-inner"><span>Precision printing</span><i /><span>Creative design</span><i /><span>Digital growth</span><i /><span>One simple starting point</span></div></div>
    <section className="section container">
      <SectionIntro eyebrow="WHAT WE DO" title={<>One partner.<br /><em>Every possibility.</em></>} text="From a single document to a complete brand presence, bring your next idea to a team that can help shape it, prepare it and bring it into the world." link="/services" linkText="Explore all services" />
      <div className="service-grid">{services.slice(0,6).map((s,i) => <ServiceCard key={s.title} service={s} index={i} />)}</div>
    </section>
    <section className="feature-band"><div className="container feature-layout"><div className="feature-graphic"><div className="feature-sheet"><span className="mini-e">E</span><div className="feature-big-type">MAKE<br />YOUR<br /><em>MARK.</em></div><div className="feature-bottom">E DOCUMENTATIONS / STUDIO</div></div><div className="feature-chip">PRINT READY <CheckCircle2 size={14}/></div></div><div className="feature-copy"><div className="eyebrow eyebrow-light">PRINT STUDIO × DIGITAL AGENCY</div><h2>Good ideas deserve<br />a <em>great finish.</em></h2><p>Thoughtful design and clear production details make the difference. Tell us what you're making, and we'll help you work out the next step.</p><div className="feature-points"><span><Check /> Print materials with purpose</span><span><Check /> Design that feels like you</span><span><Check /> Digital services built around your goals</span></div><Link className="btn btn-white" to="/quote">Discuss your project <ArrowRight size={17}/></Link></div></div></section>
    <section className="section container"><SectionIntro eyebrow="SELECTED DIRECTIONS" title={<>A glimpse of the<br /><em>creative possibilities.</em></>} text="These sample pieces are concept projects to show visual directions. Your project can be tailored to your own brand, audience and requirements." link="/portfolio" linkText="View the gallery" /><PortfolioGrid items={portfolio.slice(0,3)} /></section>
    <section className="cta-section container"><div><div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT PROJECT STARTS HERE</div><h2>Have an idea?<br /><em>Let's make it real.</em></h2><p>Share a few details and get a clear next step for your print or digital project.</p></div><div className="cta-actions"><Link to="/order" className="btn btn-primary">Start an order <ArrowRight size={18}/></Link><Link to="/quote" className="text-link">Or request a custom quote <ArrowUpRightIcon /></Link></div><span className="cta-watermark">E</span></section>
  </>
}

function SectionIntro({ eyebrow, title, text, link, linkText }: { eyebrow:string; title:React.ReactNode; text:string; link?:string; linkText?:string }) {
  return <div className="section-intro"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div><div className="intro-right"><p>{text}</p>{link && <Link className="text-link" to={link}>{linkText} <ArrowRight size={16}/></Link>}</div></div>
}
function ServiceCard({ service:s, index=0 }: { service:any; index?:number }) {
  const Icon=s.icon
  return <motion.div className="service-card" initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:.15 }} transition={{ duration:.4, delay:index*.04 }}>
    <div className="service-card-top"><span className="service-icon"><Icon size={21}/></span><span className="service-tag">{s.tag}</span></div>
    <h3>{s.title}</h3><p>{s.text}</p><Link to={s.href} className="card-arrow" aria-label={`Explore ${s.title}`}><ArrowUpRightIcon /></Link>
  </motion.div>
}
function PortfolioGrid({ items=portfolio }: {items?:typeof portfolio}) {
  return <div className="portfolio-grid">{items.map((p,i)=><Link to="/portfolio" className={`portfolio-card portfolio-tone-${i%3}`} key={p.title}>
    <div className="portfolio-visual"><div className="portfolio-paper"><span className="mini-e">E</span><span className="portfolio-word">{p.category.toUpperCase()}</span><div className="portfolio-bars"><i/><i/><i/></div><b>{['MAKE IT CLEAR.','BUILT TO BE SEEN.','A BETTER FIRST LOOK.'][i%3]}</b></div><span className="concept-label">CONCEPT WORK</span></div>
    <div className="portfolio-info"><div><span>{p.category}</span><h3>{p.title}</h3></div><ArrowUpRightIcon /></div>
  </Link>)}</div>
}

function PageHero({ eyebrow, title, text, action='/quote', actionText='Discuss a project' }: {eyebrow:string; title:React.ReactNode; text:string; action?:string; actionText?:string}) {
  return <section className="page-hero container"><div className="eyebrow"><span className="eyebrow-dot"/>{eyebrow}</div><h1>{title}</h1><p>{text}</p><Link to={action} className="btn btn-primary">{actionText}<ArrowRight size={17}/></Link><span className="page-hero-mark">E</span></section>
}
function ServicesPage() {
  return <><PageHero eyebrow="THE SERVICE MENU" title={<>Everything you need.<br /><em>Nothing you don't.</em></>} text="Explore print, documentation and digital services in one place. If your requirement is unusual, tell us about it and request a custom quote." action="/order" actionText="Start an order"/><section className="section container"><div className="service-grid service-grid-all">{services.map((s,i)=><ServiceCard key={s.title} service={s} index={i}/>)}</div></section><section className="section section-soft"><div className="container split-callout"><div><div className="eyebrow">NOT SURE WHERE TO START?</div><h2>Tell us what<br /><em>you're trying to do.</em></h2></div><p>Share your goal, deadline and any reference material. We'll help identify the most suitable service and what information is needed next.</p><Link className="btn btn-primary" to="/quote">Get a quote <ArrowRight size={17}/></Link></div></section></>
}

function PrintingPage() {
  const [query,setQuery] = useState('')
  const [category,setCategory] = useState('All')
  const cats=['All',...Array.from(new Set(printProducts.map(p=>p.category)))]
  const shown=printProducts.filter(p=>(category==='All'||p.category===category)&&(p.name+' '+p.detail+' '+p.category).toLowerCase().includes(query.toLowerCase()))
  return <><PageHero eyebrow="PRINT & PAPER PRODUCTS" title={<>Made to be held.<br /><em>Designed to be remembered.</em></>} text="Browse common print and document requests, then configure the details that matter to your job. Product availability and final pricing are confirmed during review." action="/order" actionText="Build an order"/><section className="section container">
    <div className="catalog-toolbar"><div><div className="eyebrow">THE CATALOGUE</div><h2>Find your <em>format.</em></h2></div><label className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." aria-label="Search print products"/></label></div>
    <div className="filter-row">{cats.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'filter-active':'filter-button'}>{c}</button>)}</div>
    <div className="product-grid">{shown.map((p,i)=>{const Icon=p.icon;return <div className="product-card" key={p.name}><div className={`product-art product-art-${i%4}`}><div className="product-paper"><span className="mini-e">E</span><span className="product-paper-label">{p.category.toUpperCase()}</span><b>{p.name}</b><i/><i/></div><span className="product-number">0{i+1}</span></div><div className="product-body"><span className="eyebrow">{p.category}</span><h3>{p.name}</h3><p>{p.detail}</p><Link to={`/order?service=${encodeURIComponent(p.name)}`} className="text-link">Request this product <ArrowRight size={15}/></Link></div></div>})}</div>
    <div className="custom-order"><div className="custom-icon"><Package /></div><div><h3>Have something custom in mind?</h3><p>Request custom dimensions, a special finish, a product not listed here, or print-ready file preparation.</p></div><Link className="btn btn-primary" to="/quote">Custom quote <ArrowRight size={17}/></Link></div>
  </section></>
}

function CategoryPage({ type }: {type:string}) {
  const configs:Record<string,any> = {
    'graphic-design': { eyebrow:'GRAPHIC DESIGN', title:<>Visuals with a<br /><em>reason to exist.</em></>, text:'Social creatives, advertising artwork, posters, presentations and tailored graphic design projects.', icon:Palette, items:['Social media posts & carousels','Stories and reel covers','Advertising creatives','Promotional banners','YouTube thumbnails','Product advertisements','Presentations & infographics','Menus, CVs and educational graphics','Print-ready artwork'] },
    branding: { eyebrow:'BRANDING & IDENTITY', title:<>Make your brand<br /><em>feel unmistakable.</em></>, text:'Build a consistent visual identity that makes your business easier to recognize and remember.', icon:Layers3, items:['Logo design','Brand identity systems','Brand colour palettes & typography','Business cards and stationery','Brand guidelines','Packaging design','Brand launch creatives','Marketing campaign visuals'] },
    'web-design': { eyebrow:'WEBSITE DESIGN & DEVELOPMENT', title:<>A better home<br /><em>for your business.</em></>, text:'Responsive websites and landing pages built around your content, customer journey and business goals.', icon:Globe, items:['Business and portfolio websites','E-commerce design','Landing pages','Responsive development','Website redesign & maintenance','Speed optimization','Basic technical SEO','Contact and enquiry forms'] },
    seo: { eyebrow:'SEARCH ENGINE OPTIMIZATION', title:<>Be easier to find.<br /><em>Earn the click.</em></>, text:'Practical SEO support focused on technical foundations, useful content and search discoverability. Rankings are never guaranteed.', icon:Search, items:['SEO audits','On-page & technical SEO','Keyword and competitor research','Metadata & image alt text','Internal linking','Local SEO setup assistance','Search Console setup assistance','Content strategy & reporting'] },
    'social-media': { eyebrow:'SOCIAL MEDIA MANAGEMENT', title:<>Show up with<br /><em>consistency.</em></>, text:'Organized social content and account support to help your brand communicate with a consistent voice.', icon:Smartphone, items:['Instagram and Facebook management','Content calendars','Post and carousel design','Captions and hashtag research','Reels planning','Promotional campaigns','Community management','Performance reporting'] },
  }
  const c=configs[type]||configs['graphic-design']; const Icon=c.icon
  return <><PageHero eyebrow={c.eyebrow} title={c.title} text={c.text} action="/quote" actionText="Request this service"/><section className="section container"><div className="detail-layout"><div className="detail-aside"><div className="detail-big-icon"><Icon size={34}/></div><span className="eyebrow">WHAT WE CAN HELP WITH</span><h2>A focused service.<br /><em>Made for your goals.</em></h2><p>Every project starts with context. Share your needs, any reference links, your timeline and what success should look like.</p><Link className="btn btn-primary" to={`/quote?service=${encodeURIComponent(c.eyebrow)}`}>Request this service <ArrowRight size={17}/></Link></div><div className="detail-list">{c.items.map((item:string,i:number)=><div className="detail-item" key={item}><span>0{i+1}</span><h3>{item}</h3><ArrowUpRightIcon/></div>)}</div></div></section><section className="section section-soft"><div className="container"><SectionIntro eyebrow="HOW IT WORKS" title={<>A clear process.<br /><em>Better collaboration.</em></>} text="We review the brief, confirm the scope and share a quotation or next steps before work begins."/><div className="steps-grid">{[['01','Share the brief','Tell us what you need, why you need it and any deadline.'],['02','Confirm the scope','We review details and clarify deliverables, timing and price.'],['03','Make it happen','Work starts once the scope and terms have been agreed.']].map(x=><div className="step-card" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></div></section></>
}

function AboutPage() {
  return <><PageHero eyebrow="ABOUT E DOCUMENTATIONS" title={<>One partner. Every creative<br /><em>and printing need.</em></>} text="E DOCUMENTATIONS brings printing, document preparation, graphic design, branding, website development, SEO, and social media services together in one convenient place. Our goal is to make professional creative and documentation services easier to request, manage, and deliver." action="/contact" actionText="Talk to us"/><section className="section container"><div className="about-values"><div className="about-value"><span>01</span><h3>Clarity first</h3><p>Clear briefs, understandable options and practical next steps.</p></div><div className="about-value"><span>02</span><h3>Design with purpose</h3><p>Visual decisions should support the message, not distract from it.</p></div><div className="about-value"><span>03</span><h3>One connected partner</h3><p>Printing and digital creative needs can start from the same place.</p></div></div></section><section className="section section-soft"><div className="container split-callout"><div><div className="eyebrow">LET'S COLLABORATE</div><h2>Have a project<br /><em>to discuss?</em></h2></div><p>Whether you know exactly what you need or are still shaping the idea, send us a short brief and we can take it from there.</p><Link className="btn btn-primary" to="/quote">Get a quote <ArrowRight size={17}/></Link></div></section></>
}

function PortfolioPage() {
  const [category,setCategory]=useState('All')
  const cats=['All',...Array.from(new Set(portfolio.map(p=>p.category)))]
  const items=portfolio.filter(p=>category==='All'||p.category===category)
  return <><PageHero eyebrow="PORTFOLIO / CONCEPTS" title={<>Ideas in different<br /><em>forms and formats.</em></>} text="Explore illustrative sample work and visual directions. These are clearly marked concept projects, not claims of completed client engagements." action="/quote" actionText="Create something together"/><section className="section container"><div className="filter-row">{cats.map(c=><button key={c} className={category===c?'filter-active':'filter-button'} onClick={()=>setCategory(c)}>{c}</button>)}</div><PortfolioGrid items={items}/></section></>
}

function FAQPage() {
  const [active,setActive]=useState<number|null>(0)
  return <><PageHero eyebrow="QUESTIONS, ANSWERED" title={<>The details, made<br /><em>a little clearer.</em></>} text="Some common questions about print specifications, service requests and how to get started." action="/contact" actionText="Ask us directly"/><section className="section container faq-layout"><div><div className="detail-big-icon"><CircleHelp size={32}/></div><h2>Need a specific<br /><em>answer?</em></h2><p>For requirements that depend on your product, file or destination, contact us for confirmation.</p><a className="text-link" href={`mailto:${email}`}>Email the team <ArrowRight size={16}/></a></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${active===i?'faq-open':''}`} key={q}><button onClick={()=>setActive(active===i?null:i)} aria-expanded={active===i}><span>{q}</span><ChevronDown size={18}/></button>{active===i&&<p>{a}</p>}</div>)}</div></section></>
}

function ContactPage() {
  return <><PageHero eyebrow="CONTACT" title={<>Let's start with<br /><em>a conversation.</em></>} text="Tell us about the document, design, print job or digital project you're planning. We'll help you identify the right next step." action="/quote" actionText="Send a project brief"/><section className="section container contact-grid"><a className="contact-card" href={`mailto:${email}`}><span><Mail/></span><small>BUSINESS EMAIL</small><h3>{email}</h3><p>For quotes, project briefs and general enquiries.</p><ArrowUpRightIcon/></a><a className="contact-card" href={instagram} target="_blank" rel="noreferrer"><span><Instagram/></span><small>INSTAGRAM</small><h3>@edocumentations</h3><p>Visit the business Instagram profile.</p><ArrowUpRightIcon/></a><div className="contact-note"><ShieldCheck/><h3>Clear expectations matter.</h3><p>Prices, delivery, turnaround times and service availability are confirmed individually. No fixed price or service promise is assumed here.</p></div></section></>
}

function OrderForm({ quote=false }: {quote?:boolean}) {
  const params = new URLSearchParams(window.location.search)
  const [form,setForm]=useState({name:'',email:'',phone:'',city:'',service:params.get('service')||'',product:'',size:'A4',paper:'Not sure yet',gsm:'Not sure yet',colour:'Full colour',sides:'Single-sided',quantity:'1',finish:'Standard / not sure',date:'',fulfilment:'Pickup',address:'',design:'No',budget:'Not sure yet',timeline:'Flexible',reference:'',description:'',instructions:''})
  const [files,setFiles]=useState<File[]>([])
  const [busy,setBusy]=useState(false)
  const [message,setMessage]=useState<{kind:'error'|'success'|'info';text:string}|null>(null)
  const [reference,setReference]=useState('')
  const update=(key:string,value:string)=>setForm(prev=>({...prev,[key]:value}))
  const uploadFiles=(list:FileList|null)=>{if(!list)return;const next=Array.from(list);const tooBig=next.find(f=>f.size>10*1024*1024);if(tooBig){setMessage({kind:'error',text:`${tooBig.name} exceeds the 10 MB per-file limit.`});return}if(files.length+next.length>5){setMessage({kind:'error',text:'You can attach up to 5 files.'});return}setFiles(prev=>[...prev,...next])}
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setMessage(null);if(!supabase){setMessage({kind:'error',text:'Online submission is not active yet. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then run the SQL setup in supabase/schema.sql. Your request has not been submitted.'});return}
    setBusy(true)
    try{
      const {data:auth}=await supabase.auth.getUser()
      const ref=`ED-${new Date().getFullYear()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`
      const {data:order,error}=await supabase.from('orders').insert({
        order_reference:ref, user_id:auth.user?.id??null, customer_name:form.name, customer_email:form.email,
        customer_phone:form.phone, city:form.city||null, delivery_address:form.fulfilment==='Delivery'?form.address:null,
        service_category:quote?'Custom quote':'Printing', product_name:form.product||form.service||'Custom request',
        specifications:{size:form.size,paper:form.paper,gsm:form.gsm,colour:form.colour,sides:form.sides,finish:form.finish,fulfilment:form.fulfilment,design_assistance:form.design,budget:form.budget,timeline:form.timeline,reference:form.reference},
        quantity:Math.max(1,Number(form.quantity)||1), requested_delivery_date:form.date||null, additional_instructions:[form.description,form.instructions].filter(Boolean).join('\n'),
        order_status:'Pending Review', payment_status:'Unpaid'
      }).select('id,order_reference').single()
      if(error)throw error
      const uploaded:string[]=[]
      for(const file of files){
        const path=`${order.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`
        const {error:upErr}=await supabase.storage.from('order-files').upload(path,file,{upsert:false})
        if(upErr)throw upErr
        const {error:recordErr}=await supabase.from('order_files').insert({order_id:order.id,storage_path:path,original_filename:file.name,mime_type:file.type||null,file_size:file.size})
        if(recordErr)throw recordErr
        uploaded.push(path)
      }
      setReference(order.order_reference)
      setMessage({kind:'success',text:`Request ${order.order_reference} was saved. Keep this reference for follow-up.`})
    }catch(err:any){setMessage({kind:'error',text:`We could not confirm your submission. ${err?.message||'Please check your connection and try again.'} If an order record was created before a file error, contact the business before submitting again.`})}
    finally{setBusy(false)}
  }
  return <><PageHero eyebrow={quote?'CUSTOM QUOTATION':'ONLINE PRINTING ORDER'} title={quote?<>Your brief is the<br /><em>starting point.</em></>:<>Let's get your order<br /><em>into focus.</em></>} text={quote?'Share the goal, scope and constraints. We will review your requirements and confirm a suitable scope and quotation.':'Configure the details you know. Final availability, specifications and pricing are reviewed before production.'} action="/services" actionText="Explore services"/><section className="section container form-section"><div className="form-intro"><span className="eyebrow">PROJECT REQUEST</span><h2>{quote?'Tell us about your project.':'What are we making?'}</h2><p>Fields marked * are required. No payment is collected through this form.</p><div className="form-note"><Clock3/><span>Pricing, delivery and turnaround are confirmed after review.</span></div><div className="form-note"><ShieldCheck/><span>Your request is not confirmed until the website reports a successful database submission.</span></div></div>
    <form className="request-form" onSubmit={submit}>
      <div className="form-section-heading"><span>01</span><div><h3>Your details</h3><p>How can the team reach you?</p></div></div>
      <div className="field-grid"><Field label="Full name *" value={form.name} onChange={v=>update('name',v)} required placeholder="Your name"/><Field label="Email address *" value={form.email} onChange={v=>update('email',v)} required type="email" placeholder="you@example.com"/><Field label="Phone / WhatsApp *" value={form.phone} onChange={v=>update('phone',v)} required placeholder="+92..."/><Field label="City" value={form.city} onChange={v=>update('city',v)} placeholder="Your city"/></div>
      <div className="form-section-heading"><span>02</span><div><h3>{quote?'Project overview':'Order specifications'}</h3><p>Include what you already know. You can ask for help with the rest.</p></div></div>
      <div className="field-grid"><Field label={quote?'Service of interest *':'Service category *'} value={form.service} onChange={v=>update('service',v)} required placeholder="e.g. printing, branding, website"/><Field label={quote?'Approximate budget':'Product / service'} value={quote?form.budget:form.product} onChange={v=>update(quote?'budget':'product',v)} placeholder={quote?'e.g. not sure yet':'e.g. business cards'}/>{!quote&&<><SelectField label="Paper size" value={form.size} onChange={v=>update('size',v)} options={['A2','A3','A4','A5','A6','Custom size','Not applicable']}/><SelectField label="Paper type" value={form.paper} onChange={v=>update('paper',v)} options={['Not sure yet','Standard','Glossy','Matte','Photo paper','Custom / discuss']}/><SelectField label="Paper weight / GSM" value={form.gsm} onChange={v=>update('gsm',v)} options={['Not sure yet','80 GSM','100 GSM','150 GSM','200 GSM','250 GSM','300 GSM','Custom / discuss']}/><SelectField label="Print colour" value={form.colour} onChange={v=>update('colour',v)} options={['Full colour','Black & white','Not applicable','Not sure yet']}/><SelectField label="Print sides" value={form.sides} onChange={v=>update('sides',v)} options={['Single-sided','Double-sided','Not applicable','Not sure yet']}/><Field label="Quantity *" value={form.quantity} onChange={v=>update('quantity',v)} required type="number" min="1" placeholder="1"/><SelectField label="Finishing" value={form.finish} onChange={v=>update('finish',v)} options={['Standard / not sure','Matte lamination','Gloss lamination','Binding','Folding','Cutting','Custom / discuss']}/></>}<SelectField label="Design assistance" value={form.design} onChange={v=>update('design',v)} options={['No','Yes','Not sure yet']}/><SelectField label="Timeline" value={form.timeline} onChange={v=>update('timeline',v)} options={['Flexible','As soon as practical','Specific date required']}/><Field label="Required date (if any)" value={form.date} onChange={v=>update('date',v)} type="date"/></div>
      {!quote&&<><div className="form-section-heading"><span>03</span><div><h3>Pickup or delivery</h3><p>Choose a preference; availability will be confirmed.</p></div></div><div className="field-grid"><SelectField label="Fulfilment preference" value={form.fulfilment} onChange={v=>update('fulfilment',v)} options={['Pickup','Delivery','Discuss with me']}/>{form.fulfilment==='Delivery'&&<Field label="Delivery address *" value={form.address} onChange={v=>update('address',v)} required placeholder="Address and area"/>}</div></>}
      <div className="form-section-heading"><span>{quote?'03':'04'}</span><div><h3>Files & brief</h3><p>Attach reference artwork or documents (up to 5 files, 10 MB each).</p></div></div>
      <label className="upload-zone"><UploadCloud size={25}/><b>Choose files to attach</b><span>PDF, PNG, JPG, DOCX, XLSX and other formats may be restricted by setup.</span><input type="file" multiple onChange={e=>uploadFiles(e.target.files)} aria-label="Upload files"/><small>Files are uploaded only when a configured backend accepts the request.</small></label>
      {files.length>0&&<div className="file-list">{files.map((f,i)=><div key={`${f.name}-${i}`}><FileUp size={15}/><span>{f.name}</span><small>{(f.size/1024/1024).toFixed(1)} MB</small><button type="button" onClick={()=>setFiles(prev=>prev.filter((_,n)=>n!==i))} aria-label={`Remove ${f.name}`}><X size={15}/></button></div>)}</div>}
      <label className="field field-full"><span>{quote?'Project description *':'Additional instructions'}</span><textarea value={form.description} onChange={e=>update('description',e.target.value)} required={quote} rows={4} placeholder="What are you trying to achieve? Include dimensions, content, reference links or special requirements." /></label>
      <label className="field field-full"><span>Anything else?</span><textarea value={form.instructions} onChange={e=>update('instructions',e.target.value)} rows={2} placeholder="Optional notes for the team"/></label>
      {message&&<div className={`form-message message-${message.kind}`} role="status">{message.kind==='success'?<CheckCircle2/>:<CircleHelp/>}<span>{message.text}</span></div>}
      <button className="btn btn-primary submit-btn" disabled={busy}>{busy?'Submitting securely…':quote?'Submit quote request':'Submit order request'}{!busy&&<Send size={17}/>}</button>
      <p className="form-disclaimer">Submitting this form does not confirm production, delivery or a final price. Never upload sensitive identity or payment-card documents unless specifically required and handled securely.</p>
    </form></section></>
}

function AuthPage() {
  const [mode,setMode]=useState<'login'|'signup'|'reset'>('login')
  const [emailValue,setEmailValue]=useState('')
  const [password,setPassword]=useState('')
  const [notice,setNotice]=useState('')
  const [busy,setBusy]=useState(false)
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setNotice('');if(!supabase){setNotice('Authentication is not configured. Add your Supabase URL and anon key to .env.local.');return}setBusy(true);try{if(mode==='signup'){const {error}=await supabase.auth.signUp({email:emailValue,password});if(error)throw error;setNotice('Sign-up request accepted. Check your email if confirmation is enabled.')}else if(mode==='reset'){const {error}=await supabase.auth.resetPasswordForEmail(emailValue,{redirectTo:window.location.origin+'/account'});if(error)throw error;setNotice('If the address is registered, password-reset instructions will be sent.')}else{const {error}=await supabase.auth.signInWithPassword({email:emailValue,password});if(error)throw error;setNotice('Signed in successfully. Your account session is active.')} }catch(err:any){setNotice(err.message||'Authentication could not be completed.')}finally{setBusy(false)}}
  return <><PageHero eyebrow="CUSTOMER ACCOUNT" title={<>Your projects,<br /><em>in one place.</em></>} text="Sign in to access your account and, once the database policies are configured, view your order history and status." action="/order" actionText="Continue as a guest"/><section className="section container auth-section"><div className="auth-card"><div className="auth-tabs">{(['login','signup','reset'] as const).map(m=><button key={m} className={mode===m?'auth-tab-active':''} onClick={()=>{setMode(m);setNotice('')}}>{m==='login'?'Sign in':m==='signup'?'Create account':'Reset password'}</button>)}</div><h2>{mode==='login'?'Welcome back.':mode==='signup'?'Create your account.':'Reset your password.'}</h2><p>{mode==='reset'?'We will send a reset link if the email is registered.':'Use your email to securely access your customer account.'}</p><form onSubmit={submit}><Field label="Email address" type="email" value={emailValue} onChange={setEmailValue} required placeholder="you@example.com"/>{mode!=='reset'&&<Field label="Password" type="password" value={password} onChange={setPassword} required min="8" placeholder="At least 8 characters"/>}<button className="btn btn-primary submit-btn" disabled={busy}>{busy?'Please wait…':mode==='login'?'Sign in':mode==='signup'?'Create account':'Send reset link'}<ArrowRight size={17}/></button></form>{notice&&<div className="form-message message-info">{notice}</div>}<p className="auth-security"><ShieldCheck size={16}/> Account security depends on Supabase configuration and policies.</p></div></section></>
}

function Field({label,value,onChange,required=false,type='text',placeholder='',min}: {label:string;value:string;onChange:(v:string)=>void;required?:boolean;type?:string;placeholder?:string;min?:string}) {
  return <label className="field"><span>{label}</span><input type={type} value={value} onChange={e=>onChange(e.target.value)} required={required} placeholder={placeholder} min={min}/></label>
}
function SelectField({label,value,onChange,options}: {label:string;value:string;onChange:(v:string)=>void;options:string[]}) {
  return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select></label>
}

function AccountOrders() {
  const [orders,setOrders]=useState<any[]>([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const load=async()=>{setLoading(true);setError('');if(!supabase){setError('Supabase is not configured.');setLoading(false);return}const {data:{user}}=await supabase.auth.getUser();if(!user){setError('Please sign in to view your private orders.');setLoading(false);return}const {data,error}=await supabase.from('orders').select('id,order_reference,product_name,order_status,created_at').order('created_at',{ascending:false});if(error)setError(error.message);else setOrders(data||[]);setLoading(false)}
  return <><PageHero eyebrow="ORDER TRACKING" title={<>A clear view of<br /><em>what happens next.</em></>} text="Customer orders are private. Sign in to load the orders associated with your account." action="/account" actionText="Sign in"/><section className="section container tracking-section"><button className="btn btn-primary" onClick={load} disabled={loading}>{loading?'Loading…':'Load my orders'}<ArrowRight size={17}/></button>{error&&<div className="form-message message-info">{error}</div>}{orders.length>0&&<div className="order-list">{orders.map(o=><div className="order-row" key={o.id}><div><span>{o.order_reference}</span><h3>{o.product_name}</h3><small>{new Date(o.created_at).toLocaleDateString()}</small></div><b>{o.order_status}</b></div>)}</div>}{!loading&&!error&&orders.length===0&&<p className="muted">Your order list will appear here after you load it.</p>}</section></>
}

function LegalPage({privacy=false}:{privacy?:boolean}) {
  return <><PageHero eyebrow={privacy?'PRIVACY POLICY':'TERMS & CONDITIONS'} title={privacy?<>Your information<br /><em>deserves care.</em></>:<>Clear terms.<br /><em>Better expectations.</em></>} text="This starter policy page needs a business-owner or legal review before publication. Replace these general notes with terms that accurately describe your business and applicable law." action="/contact" actionText="Contact the business"/><section className="section container legal-content"><h2>{privacy?'Privacy overview':'Using this website'}</h2><p>{privacy?'We collect information you choose to submit through order, quotation and account forms. The final production site should document the exact data collected, purpose, retention period, service providers and contact process.':'Service availability, specifications, price, production timelines and delivery arrangements are confirmed individually. A request submitted through this site is not itself a final quotation or production approval.'}</p><h3>{privacy?'Data handling':'Orders and quotations'}</h3><p>{privacy?'If Supabase is enabled, customer data and files should be protected with row-level security, private storage and least-privilege access. Do not upload unnecessary sensitive information. Contact the business to ask about a submitted request.':'Work begins only after scope, price, timing and any relevant terms are agreed. Estimates are not final prices unless explicitly confirmed in writing.'}</p><h3>{privacy?'Contact':'Accuracy and updates'}</h3><p>For questions, contact <a href={`mailto:${email}`}>{email}</a>. This page is a starter template, not legal advice. Have the final version reviewed before launch.</p></section></>
}

function AdminPage() {
  const [orders,setOrders]=useState<any[]>([])
  const [status,setStatus]=useState('')
  const [loading,setLoading]=useState(false)
  const [notice,setNotice]=useState('Admin access is not granted by hiding a page. Configure the user_roles table, RLS policies and a trusted admin workflow before use.')
  const load=async()=>{setLoading(true);setNotice('');if(!supabase){setNotice('Supabase is not configured.');setLoading(false);return}const {data:{user}}=await supabase.auth.getUser();if(!user){setNotice('Sign in with an authorized admin account first.');setLoading(false);return}const {data:role,error:roleErr}=await supabase.from('user_roles').select('role').eq('user_id',user.id).eq('role','admin').maybeSingle();if(roleErr||!role){setNotice('Access denied. Your account does not have the admin role.');setLoading(false);return}const {data,error}=await supabase.from('orders').select('*').order('created_at',{ascending:false}).limit(100);if(error)setNotice(error.message);else setOrders(data||[]);setLoading(false)}
  const updateStatus=async(id:string,newStatus:string)=>{if(!supabase)return;const {error}=await supabase.from('orders').update({order_status:newStatus}).eq('id',id);if(error)setNotice(error.message);else{setOrders(prev=>prev.map(o=>o.id===id?{...o,order_status:newStatus}:o));setNotice('Order status updated.')}} 
  return <><PageHero eyebrow="ADMINISTRATION" title={<>Operations, in<br /><em>one dashboard.</em></>} text="Protected order operations are available only after Supabase authentication, role assignment and server-enforced RLS policies are configured." action="/account" actionText="Customer account"/><section className="section container admin-section"><div className="admin-toolbar"><div><span className="eyebrow">ORDER MANAGEMENT</span><h2>Recent requests</h2></div><button className="btn btn-primary" onClick={load} disabled={loading}>{loading?'Checking access…':'Verify access & load orders'}<ArrowRight size={17}/></button></div>{notice&&<div className="form-message message-info">{notice}</div>}{orders.map(o=><div className="admin-order" key={o.id}><div><b>{o.order_reference}</b><h3>{o.product_name}</h3><p>{o.customer_name} · {o.customer_email}</p><small>{new Date(o.created_at).toLocaleString()}</small></div><div><label className="field"><span>Order status</span><select value={o.order_status} onChange={e=>updateStatus(o.id,e.target.value)}>{['Pending Review','Quotation Sent','Awaiting Customer Approval','Approved','In Production','Ready for Pickup','Out for Delivery','Completed','Cancelled'].map(s=><option key={s}>{s}</option>)}</select></label></div></div>)}</section></>
}

function NotFound() { return <section className="not-found container"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>This page took<br /><em>a wrong turn.</em></h1><p>The link may have changed or the page may not exist.</p><Link className="btn btn-primary" to="/">Back to home <ArrowRight size={17}/></Link></section> }

export default function App() {
  const location=useLocation()
  useMemo(()=>{window.scrollTo({top:0,behavior:'auto'});const titleMap:Record<string,string>={'/':'E DOCUMENTATIONS — From Every Page to Every Pixel','/services':'All Services | E DOCUMENTATIONS','/printing':'Printing & Paper Products | E DOCUMENTATIONS','/about':'About E DOCUMENTATIONS','/portfolio':'Portfolio | E DOCUMENTATIONS','/faqs':'FAQs | E DOCUMENTATIONS','/contact':'Contact | E DOCUMENTATIONS','/order':'Online Printing Order | E DOCUMENTATIONS','/quote':'Get a Quote | E DOCUMENTATIONS','/account':'Customer Account | E DOCUMENTATIONS','/orders':'Order Tracking | E DOCUMENTATIONS','/admin':'Admin Dashboard | E DOCUMENTATIONS'};document.title=titleMap[location.pathname]||'E DOCUMENTATIONS — Print, Design & Digital';return null},[location.pathname])
  return <><Header/><main><Routes>
    <Route path="/" element={<Home/>}/><Route path="/services" element={<ServicesPage/>}/><Route path="/printing" element={<PrintingPage/>}/>
    <Route path="/graphic-design" element={<CategoryPage type="graphic-design"/>}/><Route path="/branding" element={<CategoryPage type="branding"/>}/><Route path="/web-design" element={<CategoryPage type="web-design"/>}/><Route path="/seo" element={<CategoryPage type="seo"/>}/><Route path="/social-media" element={<CategoryPage type="social-media"/>}/>
    <Route path="/order" element={<OrderForm/>}/><Route path="/quote" element={<OrderForm quote/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/portfolio" element={<PortfolioPage/>}/><Route path="/faqs" element={<FAQPage/>}/><Route path="/contact" element={<ContactPage/>}/>
    <Route path="/account" element={<AuthPage/>}/><Route path="/orders" element={<AccountOrders/>}/><Route path="/admin" element={<AdminPage/>}/><Route path="/privacy" element={<LegalPage privacy/>}/><Route path="/terms" element={<LegalPage/>}/><Route path="*" element={<NotFound/>}/>
  </Routes></main><Footer/><a href={`mailto:${email}?subject=${encodeURIComponent('E DOCUMENTATIONS enquiry')}`} className="floating-contact" aria-label="Email E DOCUMENTATIONS"><Mail size={19}/><span>Let's talk</span></a></>
}
