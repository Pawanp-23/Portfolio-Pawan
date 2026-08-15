import Lenis from 'lenis';

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────
const ICONS = {
  logo:`<svg class="icon" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"/></svg>`,
  'arrow-right':`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  'arrow-up-right':`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`,
  star:`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z"/></svg>`,
  globe:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.25"/><path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5"/></svg>`,
  x:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 4l16 16M20 4 4 20"/></svg>`,
  'circle-dot':`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/></svg>`,
  grid:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  'x-brand':`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  linkedin:`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  github:`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`
};
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=ICONS[el.dataset.icon]||'');

// ─────────────────────────────────────────────────────────────────────────────
// Smooth scroll (Lenis)
// ─────────────────────────────────────────────────────────────────────────────
window.scrollTo(0,0);
const lenis = new Lenis({ smoothWheel:true });
let scrollEnabled = true, lockDepth = 0, introReady = false;
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf);
function stopScroll(){ lockDepth++; scrollEnabled=false; lenis.stop(); const h=document.documentElement; h.style.position='relative';h.style.overflow='hidden';h.style.height='100%';}
function startScroll(){ lockDepth=Math.max(0,lockDepth-1); if(lockDepth>0)return; scrollEnabled=true;lenis.start();const h=document.documentElement;h.style.removeProperty('position');h.style.removeProperty('overflow');h.style.removeProperty('height');}
function scrollToId(id){ const el=document.getElementById(id); if(!el)return; if(scrollEnabled)stopScroll(); setTimeout(()=>window.scrollTo({top:el.getBoundingClientRect().top+pageYOffset,behavior:'smooth'}),50); setTimeout(()=>startScroll(),100); }
function applyAdaptiveGrid(){const FONT_BASE=16,baseWidth=1920,coef=.6666,w=innerWidth,widthReduction=((baseWidth-w)/baseWidth)*100,size=FONT_BASE-(FONT_BASE*(widthReduction*coef))/100;if(size>FONT_BASE)document.documentElement.style.fontSize=size+'px';else document.documentElement.style.removeProperty('font-size')}
applyAdaptiveGrid(); addEventListener('resize',applyAdaptiveGrid);

// ─────────────────────────────────────────────────────────────────────────────
// Live clock
// ─────────────────────────────────────────────────────────────────────────────
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
function tickClock(){const d=new Date(),h=d.getHours(),m=String(d.getMinutes()).padStart(2,'0'),t=(h%12||12)+':'+m+(h>=12?'pm':'am'),date=d.getDate()+' '+months[d.getMonth()]+', '+d.getFullYear();document.querySelectorAll('.live-time').forEach(e=>e.textContent=t);document.querySelectorAll('.live-date').forEach(e=>e.textContent=date)}
tickClock(); setInterval(tickClock,1000);

// ─────────────────────────────────────────────────────────────────────────────
// Stars & Partners
// ─────────────────────────────────────────────────────────────────────────────
const starWrap=document.getElementById('stars'); starWrap.innerHTML=Array(5).fill(ICONS.star).join('');


// ─────────────────────────────────────────────────────────────────────────────
// Portfolio grid
// ─────────────────────────────────────────────────────────────────────────────
const portfolio=[
  ['Clinic Voice AI','Generative AI','2026','A real-time healthcare voice assistant pipeline combining speech-to-text, an LLM, text-to-speech, and WebRTC-style conversational transport.',['Python','Pipecat','Deepgram','LLM','TTS']],
  ['ClinicCare RAG','RAG / AI','2026','A retrieval-augmented generation system for clinical documents using embeddings, vector search, and MongoDB Atlas.',['RAG','Embeddings','MongoDB','Python']],
  ['EV Smart Platform','Research / AI-IoT','2026','An intelligent EV infrastructure concept combining battery monitoring, charging discovery, GIS routing, predictive alerts, booking, diagnostics, and cloud IoT.',['AI','IoT','GIS','Cloud','ITS']],
  ['JARVIS X','AI Automation','2026','A personal AI operating-system concept centered on voice intelligence, memory, workflow automation, tool integrations, and agentic assistance.',['AI Agents','Automation','FastAPI','React','LLM']]
];
document.getElementById('portfolioGrid').innerHTML=portfolio.map((p,i)=>`<li class="reveal-up" style="transition-delay:${i*90}ms"><a href="#${p[0].toLowerCase().replace(/\s/g,'-')}"><article class="portfolio-card"><div class="portfolio-meta"><span>${p[1]} — ${p[2]}</span><span class="portfolio-badge">${ICONS['arrow-up-right']}</span></div><div class="portfolio-watermark"><div class="portfolio-watermark-wrap"><span class="mark">${ICONS.logo}</span><span class="reg">®</span></div></div><div class="portfolio-bottom"><h3>${p[0]}</h3><p>${p[3]}</p><div class="tags">${p[4].map(t=>`<span class="tag">${t}</span>`).join('')}</div></div></article></a></li>`).join('');

// ─────────────────────────────────────────────────────────────────────────────
// Services list
// ─────────────────────────────────────────────────────────────────────────────
const services=[
  ['01','AI & Generative AI','LLM-powered applications, RAG systems, voice AI, and intelligent automation.','development'],
  ['02','Product & Frontend Development','Modern interfaces and AI-powered web experiences built around real user workflows.','design'],
  ['03','Research & Prototyping','Turning emerging technologies into testable concepts, research systems, and working prototypes.','qa'],
  ['04','IoT & Connected Systems','Applying an ENTC foundation to sensors, embedded systems, GIS, IoT, and intelligent hardware.','consulting']
];
document.getElementById('servicesList').innerHTML=services.map((s,i)=>`<li class="service-li reveal-up" style="transition-delay:${i*80}ms"><a id="${s[3]}" href="#${s[3]}" class="service-row"><span class="service-index">${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p><span class="service-arrow">${ICONS['arrow-up-right']}</span></a></li>`).join('');

// ─────────────────────────────────────────────────────────────────────────────
// Stats
// ─────────────────────────────────────────────────────────────────────────────
const stats=[
  {v:4,s:'',l:'Featured projects'},
  {v:3,s:'',l:'Industry experiences'},
  {v:2,s:'',l:'Technical disciplines'},
  {v:1,s:'',l:'Research platform'}
];
document.getElementById('statsGrid').innerHTML=stats.map((s,i)=>`<li class="reveal-up" style="transition-delay:${i*90}ms"><div class="stat-number"><span data-stat="${s.v}">0</span>${s.s}</div><div class="stat-label">${s.l}</div></li>`).join('');

// ─────────────────────────────────────────────────────────────────────────────
// About word reveal
// ─────────────────────────────────────────────────────────────────────────────
const aboutText=[['I',false],['build',false],['and',false],['explore',false],['AI-powered',true],['products,',true],['intelligent',true],['automation,',true],['software',true],['systems,',true],['and',true],['connected',true],['hardware',true],['for',true],['practical',true],['real-world',true],['problems.',true]];
document.getElementById('aboutWords').innerHTML=aboutText.map((w,i)=>`<span class="word-reveal ${w[1]?'about-muted':''}" style="transition-delay:${i*35}ms">${w[0]}&nbsp;</span>`).join('');

// ─────────────────────────────────────────────────────────────────────────────
// Navigation overlay
// ─────────────────────────────────────────────────────────────────────────────
const menuItems=[['Home','home'],['Projects','works'],['Services','services'],['About','about'],['Experience','careers'],['Contact','contact']];
const overlayList=document.getElementById('overlayList');
overlayList.innerHTML=menuItems.map((m,i)=>`<li><button class="overlay-item" data-menu-target="${m[1]}" style="transition-delay:${i*45+80}ms"><span class="idx">0${i+1}</span><span>${m[0]}</span></button></li>`).join('');

document.addEventListener('click',e=>{const s=e.target.closest('[data-scroll]');if(s)scrollToId(s.dataset.scroll);const c=e.target.closest('[data-contact]');if(c){e.preventDefault();openModal();}});

const nav=document.getElementById('navMenu');
function openMenu(){nav.classList.add('open');nav.setAttribute('aria-hidden','false');stopScroll();requestAnimationFrame(()=>{nav.classList.add('visible');nav.querySelectorAll('.overlay-item').forEach(el=>{el.style.opacity='1';el.style.transform='none'})})}
function closeMenu(cb){nav.classList.remove('visible');nav.querySelectorAll('.overlay-item').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(1rem)'});setTimeout(()=>{nav.classList.remove('open');nav.setAttribute('aria-hidden','true');startScroll();cb&&cb()},420)}
document.getElementById('menuOpen').onclick=openMenu; document.getElementById('menuClose').onclick=()=>closeMenu();
overlayList.addEventListener('click',e=>{const b=e.target.closest('[data-menu-target]');if(!b)return;const target=b.dataset.menuTarget;closeMenu(()=>target==='contact'?openModal():scrollToId(target))});
document.getElementById('overlayProject').onclick=()=>closeMenu(openModal);

// ─────────────────────────────────────────────────────────────────────────────
// Contact modal + REAL API integration
// ─────────────────────────────────────────────────────────────────────────────
const modal      = document.getElementById('requestModal');
const form       = document.getElementById('projectForm');
const formState  = document.getElementById('formState');
const success    = document.getElementById('successState');
const submitBtn  = document.getElementById('submitBtn');
const errorBanner = document.getElementById('formError');

function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');stopScroll();requestAnimationFrame(()=>modal.classList.add('visible'))}
function closeModal(){
  modal.classList.remove('visible');
  setTimeout(()=>{
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    startScroll();
    setTimeout(()=>{
      form.reset();
      success.classList.remove('show');
      formState.style.display='block';
      if(errorBanner){ errorBanner.style.display='none'; errorBanner.textContent=''; }
      resetSubmitBtn();
    },300);
  },360);
}

document.getElementById('modalClose').onclick = closeModal;
document.getElementById('successClose').onclick = closeModal;
modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });

function setSubmitLoading(){
  submitBtn.disabled = true;
  submitBtn.childNodes[0].nodeValue = 'Sending… ';
}
function resetSubmitBtn(){
  submitBtn.disabled = false;
  submitBtn.childNodes[0].nodeValue = 'Send message ';
}
function showFormError(msg){
  if(!errorBanner) return;
  errorBanner.textContent = msg;
  errorBanner.style.display = 'block';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous error
  if(errorBanner){ errorBanner.style.display='none'; errorBanner.textContent=''; }

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const project = form.project.value.trim();

  // Client-side quick validation
  if(!name || !email || !project){
    showFormError('Please fill in all fields before sending.');
    return;
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRe.test(email)){
    showFormError('Please enter a valid email address.');
    return;
  }

  setSubmitLoading();

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, project }),
    });

    const data = await res.json();

    if(res.ok && data.success){
      // Show success state
      formState.style.display = 'none';
      success.classList.add('show');
    } else if(res.status === 429){
      resetSubmitBtn();
      showFormError('Too many submissions. Please wait a while and try again.');
    } else {
      resetSubmitBtn();
      const msg = data.errors?.join(' ') || data.message || 'Something went wrong. Please try again.';
      showFormError(msg);
    }
  } catch (err) {
    console.error('Contact form error:', err);
    resetSubmitBtn();
    showFormError('Network error. Please check your connection and try again.');
  }
});

addEventListener('keydown',e=>{if(e.key==='Escape'){if(nav.classList.contains('open'))closeMenu();else if(modal.classList.contains('open'))closeModal()}});

// ─────────────────────────────────────────────────────────────────────────────
// Scroll reveal (IntersectionObserver)
// ─────────────────────────────────────────────────────────────────────────────
const revealObserver=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');en.target.querySelectorAll?.('.line-reveal').forEach(x=>x.classList.add('is-visible'));if(en.target.classList.contains('line-reveal'))en.target.classList.add('is-visible');revealObserver.unobserve(en.target)}}),{threshold:.14});
document.querySelectorAll('.reveal-up,.create-item,.stats-panel,.line-reveal:not(.hero-line),.word-reveal').forEach(el=>revealObserver.observe(el));

// ─────────────────────────────────────────────────────────────────────────────
// Stat number counter animation
// ─────────────────────────────────────────────────────────────────────────────
const statsEls=[...document.querySelectorAll('[data-stat]')];
let lastStat=0;
function updateStats(t){if(t-lastStat<30)return;lastStat=t;statsEls.forEach(el=>{const rect=el.parentElement.getBoundingClientRect();const start=innerHeight,end=innerHeight/2-rect.height/2;let p=(start-rect.top)/(start-end);p=Math.max(0,Math.min(1,p));el.textContent=Math.round(p*Number(el.dataset.stat));});}
addEventListener('scroll',()=>updateStats(performance.now()),{passive:true}); updateStats(performance.now());

// ─────────────────────────────────────────────────────────────────────────────
// Hero card carousel
// ─────────────────────────────────────────────────────────────────────────────
const carousel=[{caption:'Conversion design',title:'Crafted to convert.'},{caption:'Engineering',title:'Built to scale.'},{caption:'Brand systems',title:'Designed to last.'}];let ci=0;const copy=document.getElementById('heroCopy'),dots=document.getElementById('heroDots');
function renderCarousel(){copy.querySelector('.hero-caption').textContent=carousel[ci].caption;copy.querySelector('.hero-card-title').textContent=carousel[ci].title;dots.innerHTML=carousel.map((_,i)=>`<span class="dash ${i===ci?'active':''}"></span>`).join('')}
function stepCarousel(step){copy.classList.add('out');setTimeout(()=>{ci=(ci+step+carousel.length)%carousel.length;copy.classList.remove('out');copy.classList.add('in-from');renderCarousel();requestAnimationFrame(()=>requestAnimationFrame(()=>copy.classList.remove('in-from')))},260)}
renderCarousel();document.getElementById('heroNext').onclick=e=>{e.stopPropagation();stepCarousel(1)};document.getElementById('heroPrev').onclick=e=>{e.stopPropagation();stepCarousel(-1)};document.getElementById('heroCardClick').onclick=()=>stepCarousel(1);

// ─────────────────────────────────────────────────────────────────────────────
// Liquid image reveal (original canvas brush effect — follows pointer)
// ─────────────────────────────────────────────────────────────────────────────
function initLiquidReveal(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    const c=document.getElementById('liquidCanvas'); if(c)c.remove(); return;
  }
  const wrap=document.getElementById('liquidReveal');
  const canvas=document.getElementById('liquidCanvas');
  if(!canvas){return;}
  const ctx=canvas.getContext('2d');
  const cover=document.createElement('canvas'), cctx=cover.getContext('2d');
  const brush=document.createElement('canvas'), bctx=brush.getContext('2d');
  const after=new Image();
  after.crossOrigin='anonymous';
  // Load the reveal "after" image from the existing DOM hero img
  const heroImg = wrap.querySelector('img');
  if(heroImg && heroImg.src) { after.src = heroImg.src; }

  const brushRadius=143, decay=.016, dpr=Math.min(devicePixelRatio||1,2);
  const points=[]; let last=null, idle=121, radius=brushRadius*dpr, diam=Math.ceil(radius*2), rect;

  function resize(){
    rect=wrap.getBoundingClientRect();
    canvas.width=Math.round(rect.width*dpr); canvas.height=Math.round(rect.height*dpr);
    canvas.style.width=rect.width+'px'; canvas.style.height=rect.height+'px';
    cover.width=canvas.width; cover.height=canvas.height;
    brush.width=brush.height=diam;
    drawCover();
  }

  function drawCover(){
    if(!after.complete||!after.naturalWidth)return;
    const s=Math.max(cover.width/after.naturalWidth,cover.height/after.naturalHeight);
    const w=after.naturalWidth*s, h=after.naturalHeight*s;
    const x=(cover.width-w)/2, y=(cover.height-h)/2;
    cctx.clearRect(0,0,cover.width,cover.height);
    cctx.drawImage(after,x,y,w,h);
  }

  after.onload=drawCover;
  new ResizeObserver(resize).observe(wrap);
  resize();

  addEventListener('pointermove',e=>{
    rect=wrap.getBoundingClientRect();
    const x=(e.clientX-rect.left)*dpr, y=(e.clientY-rect.top)*dpr;
    if(x<-radius||y<-radius||x>canvas.width+radius||y>canvas.height+radius){last=null;return;}
    if(!last){points.push([x,y]);last={x,y};return;}
    const dx=x-last.x, dy=y-last.y, dist=Math.hypot(dx,dy);
    const step=Math.max(radius*.3,1), n=Math.min(Math.ceil(dist/step),60);
    for(let i=1;i<=n;i++) points.push([last.x+dx*i/n, last.y+dy*i/n]);
    last={x,y};
  },{passive:true});

  function stamp(x,y){
    bctx.clearRect(0,0,diam,diam);
    bctx.globalCompositeOperation='source-over';
    const g=bctx.createRadialGradient(radius,radius,0,radius,radius,radius);
    g.addColorStop(0,'rgba(255,255,255,1)');
    g.addColorStop(.55,'rgba(255,255,255,.82)');
    g.addColorStop(1,'rgba(255,255,255,0)');
    bctx.fillStyle=g; bctx.fillRect(0,0,diam,diam);
    bctx.globalCompositeOperation='source-in';
    bctx.drawImage(cover,x-radius,y-radius,diam,diam,0,0,diam,diam);
    ctx.globalCompositeOperation='source-over';
    ctx.drawImage(brush,x-radius,y-radius);
  }

  function tick(){
    const drawing=points.length>0;
    if(drawing)idle=0; else idle++;
    if(idle<=120){
      const fade=drawing?decay:Math.min(decay+idle*.004,.5);
      ctx.globalCompositeOperation='destination-out';
      ctx.fillStyle=`rgba(0,0,0,${fade})`;
      ctx.fillRect(0,0,canvas.width,canvas.height);
      if(drawing){ points.splice(0).forEach(p=>stamp(p[0],p[1])); }
      if(idle===120) ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    requestAnimationFrame(tick);
  }
  tick();
}

initLiquidReveal();

// ─────────────────────────────────────────────────────────────────────────────
// Hero intro animation & page loader
// ─────────────────────────────────────────────────────────────────────────────
function startHero(){
  introReady=true;
  const header=document.getElementById('siteHeader');setTimeout(()=>header.classList.add('ready'),150);
  document.querySelectorAll('.hero-ready').forEach(el=>setTimeout(()=>el.classList.add('is-visible'),Number(el.dataset.delay||0)));
  document.querySelectorAll('.hero-line').forEach(el=>setTimeout(()=>el.classList.add('is-visible'),Number(el.dataset.delay||0)));
  setTimeout(()=>document.querySelector('.hero-watermark').classList.add('ready'),300);
  setTimeout(()=>document.getElementById('heroCard').classList.add('ready'),400);
  setTimeout(()=>document.getElementById('heroStatus').classList.add('ready'),900);
}

stopScroll();
const loader=document.getElementById('pageLoader'),fill=document.getElementById('loaderFill'),counter=document.getElementById('loaderCounter'),FILL_MS=1300,start=performance.now();
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function loadTick(now){const p=Math.min(1,(now-start)/FILL_MS),v=Math.round(ease(p)*100);fill.style.width=v+'%';counter.textContent=String(v).padStart(3,'0');if(p<1)requestAnimationFrame(loadTick);else{setTimeout(()=>{loader.classList.add('exit');setTimeout(()=>{loader.remove();startScroll();startHero()},700)},80)}}requestAnimationFrame(loadTick);
