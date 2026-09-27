import Lenis from 'lenis';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─────────────────────────────────────────────────────────────────────────────
// Content — edit these arrays to update the site
// ─────────────────────────────────────────────────────────────────────────────
// live: public URL (omit if none) · repo: GitHub repo name · shot: face-card screenshot in /img (omit → themed card)
// api: optional API docs URL · sleeps: true for free Render services (shows a wake-up note)
const GITHUB = 'https://github.com/Pawanp-23/';
const projects = [
  { name:'LRN', cat:'EdTech · Finance prep', year:'2026',
    live:'https://lrn-client.vercel.app', repo:'LRN', shot:'/img/project-lrn.jpg',
    headline:'A 30-question diagnostic that shows finance candidates where they actually stand.',
    desc:'Accounting, valuation, M&A and LBO questions with instant grading, a report and a focused practice plan — shipped as a React SPA with CI for lint, tests and build.',
    tags:['React','TypeScript','Vite','CI'] },
  { name:'CityCare Clinic', cat:'Healthcare · AI', year:'2026',
    live:'https://citycare-frontend-wlw8.onrender.com', repo:'City_Care', shot:'/img/project-citycare.jpg', sleeps:true,
    headline:'A clinic where doctors can ask the AI about their day — but it can’t touch bookings.',
    desc:'Four-role appointment system for a Nagpur hospital with race-safe slot booking and a Gemini function-calling assistant that is read-only by design.',
    tags:['React','FastAPI','MongoDB','Gemini','JWT'] },
  { name:'Whitfield WMS', cat:'Logistics · SaaS', year:'2026',
    live:'https://whitfield-frontend.onrender.com', repo:'Warehouse-Management-System', shot:'/img/project-whitfield.jpg', sleeps:true,
    api:'https://whitfield-api.onrender.com/docs',
    headline:'Warehouse software that won’t let two orders grab the same last box.',
    desc:'Multi-tenant 3PL platform: receiving, atomic inventory reservations, shipments and tracking, invoicing, realtime WebSocket updates and grounded RAG chat.',
    tags:['Next.js','FastAPI','MongoDB','WebSocket','Stripe'] },
  { name:'SAHARA', cat:'Smart India Hackathon · Team Lead', year:'2026',
    repo:'SIH',
    headline:'Spotting burnout before it happens — and explaining why.',
    desc:'SIH26186: privacy-preserving welfare intelligence that flags occupational stress and fatigue risk, explains causes with SHAP and simulates interventions.',
    tags:['React','Express','Gemini','SHAP','Recharts'] },
];

// Newest first. Source: résumé (Sep 2026)
const education = [
  { when:'2024 — Present', what:'B.Tech, Information Technology', where:'St. Vincent Pallotti College of Engg. & Technology, Nagpur', detail:'SGPA 7.0 · in progress', now:true },
  { when:'2024', what:'Diploma, Electronics & Telecommunication', where:'Government Polytechnic, Nagpur', detail:'82%' },
  { when:'2021', what:'Class X', where:'Somalwar High School, Nagpur', detail:'78%' },
];

const experience = [
  { when:'2026 — Now', what:'AI Product / Frontend Contributor', where:'EIGI AI · fde.eigi.ai', now:true,
    detail:'Turn ambiguous product requirements into structured UI flows and API-integrated React interfaces; ship iterative FDE releases with backend and leadership.' },
  { when:'Jun — Jul 2026', what:'Project Lead / App Lead', where:'MRSAC — Maharashtra Remote Sensing Application Centre, Nagpur',
    detail:'Led React architecture for a GIS-based EV Smart Platform; integrated field-verified data for 8 charging stations, 34 charging points and 5 battery service centres.' },
  { when:'May — Jun 2025', what:'Industrial Intern', where:'BSNL — Bharat Sanchar Nigam Limited',
    detail:'Rotated across NIB, FTTH, Routing & Networking and Sales — optical-fibre, broadband infrastructure and network architecture.' },
  { when:'Jan — Jun 2024', what:'Diploma Engineer Trainee', where:'Subros Limited, Pune',
    detail:'Quality control, water-leak testing, HVAC assembly and production checks under 5S and safety standards.' },
];

// The stack ribbons (from the résumé). A: AI + backend, B: frontend + tools + hardware
const stack = {
  a:['LLM APIs','RAG','Vector Search','AI Agents','Voice AI','Python','FastAPI','Node.js','MongoDB','Atlas Vector Search','WebRTC','WebSockets','Deepgram','Gemini Live','SHAP'],
  b:['React','TypeScript','JavaScript','Vite','Tailwind CSS','Framer Motion','Express','REST APIs','Git','Vercel','Render','QGIS','GeoJSON','Arduino','C / C++','MATLAB'],
};

const method = [
  ['01 · Mindset','Problems before models','I start with the workflow that hurts, then choose the model — never the other way round.'],
  ['02 · Lens','Hardware-aware software','An ENTC background means I think about sensors, latency and power — not just APIs.'],
  ['03 · Process','Prototype, then polish','A working demo in days beats a perfect deck in weeks. Iterate from something real.'],
  ['04 · Scope','Systems, end to end','Voice in, data through, action out — I like owning the whole pipeline.'],
];

// "When the laptop's closed" — order fills a 3×2 grid; the feature card spans two rows in the middle.
const life = [
  { type:'card', img:'/img/hobby-cooking.jpg', alt:'Pan-seared pepper chilli chicken', kicker:'Kitchen',
    title:'Cooking without a recipe', text:'Pepper, chilli flakes, oregano and a hot pan. Basically debugging, but tastier.',
    stat:{ label:'Spice level', val:'High', em:'always' } },
  { type:'feature', imgs:[
      { src:'/img/hobby-trek-clouds.jpg', alt:'Pawan standing at a viewpoint over a misty forest', pos:'36% 50%' },
    ],
    overlay:[['Signal','0 bars'],['View','Worth it'],['Status','Offline']],
    kicker:'Outdoors', title:'Chasing viewpoints', text:'Cliff edges and forest horizons — the only places my phone stays in my pocket.' },
  { type:'card', img:'/img/hobby-gym.jpg', alt:'Back progress photo in the mirror', pos:'70% 40%', kicker:'Strength',
    title:'Building the back', text:'Best thinking happens between sets.',
    stat:{ label:'Rest days', val:'Few', em:'for now' } },
  { type:'card', img:'/img/hobby-heritage.jpg', alt:'Ancient stone temple ruins beside a pond', kicker:'Heritage',
    title:'Old stones, long stories', text:'Exploring ancient temples — engineering that has outlasted every framework I’ll ever use.',
    stat:{ label:'Uptime', val:'Centuries', em:'zero downtime' } },
  { type:'now' },
];

// "On repeat" — always shown in the Spotify card, even when nothing is live.
// id = the part after open.spotify.com/track/
const S = 'https://i.scdn.co/image/';
const favourites = [
  { id:'68EMU2RD1ECNeOeJ5qAXCV', title:'We Don’t Talk Anymore', artist:'Charlie Puth, Selena Gomez', albumArt:S+'ab67616d00001e02c0e28105f0533c52717c46c2', durationMs:217706 },
  { id:'0cYohCh24y1aMjJmcS9RBl', title:'For A Reason',          artist:'Karan Aujla, Ikky',          albumArt:S+'ab67616d00001e0289e8f71cb6f3b6cc60944858', durationMs:180000 },
  { id:'2a1o6ZejUi8U3wzzOtCOYw', title:'Danza Kuduro',          artist:'Don Omar, Lucenzo',          albumArt:S+'ab67616d00001e024640a26eb27649006be29a94', durationMs:198773 },
  { id:'6wkHR8cU4INbp145hngbQO', title:'8 ASLE',                artist:'Sukha, Chani Nattan, Gurlez Akhtar', albumArt:S+'ab67616d00001e02667bb62da094ab292e632868', durationMs:161000 },
  { id:'7BKLCZ1jbUBVqRi2FVlTVw', title:'Closer',                artist:'The Chainsmokers, Halsey',   albumArt:S+'ab67616d00001e02495ce6da9aeb159e94eaa453', durationMs:244960 },
  { id:'5vTJrmnmJMAvFjrUpUWxyy', title:'Ashke',                 artist:'Karan Aujla, Mxrci',         albumArt:S+'ab67616d00001e02853b24d260cd34f67071f00a', durationMs:217625 },
  { id:'4Q0qVhFQa7j6jRKzo3HDmP', title:'Sapphire',              artist:'Ed Sheeran',                 albumArt:S+'ab67616d00001e021cae05aed449b051fceb7a2d', durationMs:179082 },
  { id:'4sgYmcu4FKb1ZC6qBlxMiw', title:'Vaaroon',               artist:'Anand Bhaskar, Romy, Ginny Diwan · Mirzapur', albumArt:S+'ab67616d00001e02c33c23574fba0d4f630ca8c5', durationMs:350739 },
  { id:'7BhmwvCdQZNwuQXSHw5TzP', title:'Headlights',            artist:'Alok, Alan Walker, KIDDO',   albumArt:S+'ab67616d00001e02e4855f57cf9ffcf827fdd6e2', durationMs:158400 },
  { id:'0P45YtqtAT6AkNDDX1lySE', title:'COOOK PARDON',          artist:'Lvbel C5, AKDO',             albumArt:S+'ab67616d00001e028e675f63b19c17334f7d62d9', durationMs:92109 },
].map(t => ({ ...t, fav:true, url:`https://open.spotify.com/track/${t.id}` }));

// ─────────────────────────────────────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────────────────────────────────────
const $ = (s, r=document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const GH_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/></svg>';

const face = p => p.shot ? `
  <a class="face face-shot" href="${p.live}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
    <span class="face-bar"><i></i><i></i><i></i><span class="face-url mono">${esc(p.live.replace(/^https?:\/\//,''))}</span></span>
    <img src="${p.shot}" alt="" loading="lazy" />
  </a>` : `
  <a class="face face-title" href="${GITHUB}${p.repo}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
    <span class="face-bar"><i></i><i></i><i></i><span class="face-url mono">github.com/Pawanp-23/${esc(p.repo)}</span></span>
    <span class="face-body"><span class="face-name">${esc(p.name)}</span><span class="face-stack mono">${p.tags.slice(0,3).map(esc).join(' · ')}</span></span>
  </a>`;

$('#workGrid').innerHTML = projects.map((p,i) => `
  <li class="reveal" style="--d:${(i%2)*.1}s">
    <article class="glass work-card">
      ${face(p)}
      <div class="work-meta mono"><span>0${i+1} · ${esc(p.cat)}</span><span>${esc(p.year)}</span></div>
      <h3>${esc(p.headline)}</h3>
      <p><span class="work-name">${esc(p.name)}</span> — ${esc(p.desc)}</p>
      <div class="tags">${p.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="work-links">
        ${p.live ? `<a class="btn btn-accent btn-sm" href="${p.live}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.name)} live site">Live site ↗</a>` : ''}
        <a class="btn btn-glass btn-sm" href="${GITHUB}${p.repo}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.name)} source on GitHub">${GH_ICON} GitHub</a>
        ${p.api ? `<a class="btn btn-ghost btn-sm" href="${p.api}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.name)} API documentation">API docs ↗</a>` : ''}
        ${!p.live ? '<span class="work-note mono">Source only</span>' : p.sleeps ? '<span class="work-note mono" title="Hosted on Render’s free tier — the first visit can take up to a minute">⏾ may take ~30s to wake</span>' : ''}
      </div>
    </article>
  </li>`).join('');

const timeline = items => items.map(t => `
  <li class="${t.now?'now':''}">
    <span class="tl-when mono">${esc(t.when)}</span>
    <div class="tl-what">${esc(t.what)}</div>
    <div class="tl-where">${esc(t.where)}</div>
    ${t.detail ? `<p class="tl-detail">${esc(t.detail)}</p>` : ''}
  </li>`).join('');
// Each track holds the list twice, so sliding by -50% loops seamlessly
const ribbon = items => {
  const run = items.map(t => `<span class="rb-item">${esc(t)}</span><span class="rb-sep" aria-hidden="true">✦</span>`).join('');
  return `<div class="rb-run">${run}</div><div class="rb-run" aria-hidden="true">${run}</div>`;
};
$('#ribbonA').innerHTML = ribbon(stack.a);
$('#ribbonB').innerHTML = ribbon(stack.b);
$('#stackList').innerHTML = [...stack.a, ...stack.b].map(t => `<li>${esc(t)}</li>`).join('');
document.querySelectorAll('.ribbon').forEach(r => r.setAttribute('aria-hidden', 'true'));

$('#eduTimeline').innerHTML = timeline(education);
$('#expTimeline').innerHTML = timeline(experience);

$('#methodGrid').innerHTML = method.map((m,i) => `
  <li class="reveal" style="--d:${i*.08}s"><article class="glass method-card">
    <span class="mono">${esc(m[0])}</span><h3>${esc(m[1])}</h3><p>${esc(m[2])}</p>
  </article></li>`).join('');

const statHtml = s => s ? `<div class="stat"><span class="mono">${esc(s.label)}</span><span class="stat-val">${esc(s.val)}<em>${esc(s.em)}</em></span></div>` : '';
$('#lifeGrid').innerHTML = life.map((c,i) => {
  const d = `style="--d:${(i%3)*.08}s"`;
  if (c.type === 'feature') return `
    <article class="glass life-card feature reveal" ${d}>
      <div class="ph">${c.imgs.map((im,j)=>`<img src="${im.src}" alt="${esc(im.alt)}" loading="lazy" style="object-position:${im.pos};${j?'opacity:0':''}" />`).join('')}</div>
      <dl class="overlay-stats">${c.overlay.map(o=>`<div><dt class="mono">${esc(o[0])}</dt><dd style="margin:0"><b>${esc(o[1])}</b></dd></div>`).join('')}</dl>
      <div class="life-body"><span class="mono">${esc(c.kicker)}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>
    </article>`;
  if (c.type === 'now') return `
    <article class="glass now-card reveal" ${d}>
      <span class="mono">◦ Right now ◦</span>
      <ul class="now-list">
        <li><span>Building</span><span>JARVIS X</span></li>
        <li><span>Exploring</span><span>Voice AI &amp; agents</span></li>
        <li><span>Nagpur time</span><span class="live-time">--:--</span></li>
        <li><span>Probably</span><span class="now-guess">—</span></li>
      </ul>
    </article>`;
  return `
    <article class="glass life-card reveal" ${d}>
      <div class="ph"><img src="${c.img}" alt="${esc(c.alt)}" loading="lazy" ${c.pos?`style="object-position:${c.pos}"`:''} /></div>
      <div class="life-body"><span class="mono">${esc(c.kicker)}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>${statHtml(c.stat)}</div>
    </article>`;
}).join('');

// Feature card: crossfade between trek photos
(() => {
  const imgs = [...document.querySelectorAll('.life-card.feature .ph img')];
  if (imgs.length < 2 || reduceMotion) return;
  imgs.forEach(im => im.style.transition = 'opacity 1.4s cubic-bezier(.22,1,.36,1), transform 1.4s cubic-bezier(.22,1,.36,1)');
  let k = 0;
  setInterval(() => { imgs[k].style.opacity = 0; k = (k+1) % imgs.length; imgs[k].style.opacity = 1; }, 4500);
})();

// ─────────────────────────────────────────────────────────────────────────────
// Commit log — live GitHub contribution calendar
// ─────────────────────────────────────────────────────────────────────────────
const GITHUB_USER = 'Pawanp-23';

async function initContributions(){
  const grid = $('#ghGrid');
  const utc = d => new Date(d + 'T00:00:00Z');
  const fmtDay = new Intl.DateTimeFormat('en-US', { timeZone:'UTC', weekday:'short', day:'numeric', month:'short', year:'numeric' });
  const fmtMon = new Intl.DateTimeFormat('en-US', { timeZone:'UTC', month:'short' });
  const plural = n => `${n} contribution${n === 1 ? '' : 's'}`;

  let days;
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    days = data.contributions;
    $('#ghTotal').textContent = data.total.lastYear;
  } catch (err) {
    console.warn('Contributions unavailable:', err);
    $('.gh-scroll').innerHTML = `<p class="gh-error">Couldn't reach GitHub right now — <a class="link-arrow" href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer">see the live graph ↗</a></p>`;
    $('.gh-foot').remove(); $('#ghStats').remove();
    return;
  }

  // Pad the first week so rows line up Sun → Sat
  const pad = utc(days[0].date).getUTCDay();
  const cols = Math.ceil((pad + days.length) / 7);
  $('.gh-graph').style.setProperty('--cols', cols);

  grid.innerHTML =
    '<span class="gh-cell pad"></span>'.repeat(pad) +
    days.map((d, i) => `<span class="gh-cell l${d.level}" style="--c:${Math.floor((i + pad) / 7)}" data-i="${i}"></span>`).join('');

  // Month labels on the column where each month starts
  let lastCol = -9;
  $('#ghMonths').innerHTML = days.map((d, i) => {
    if (!d.date.endsWith('-01') && i !== 0) return '';
    const col = Math.floor((i + pad) / 7);
    if (col - lastCol < 3) return '';
    lastCol = col;
    return `<span style="grid-column:${col + 1}">${fmtMon.format(utc(d.date))}</span>`;
  }).join('');

  // Hover / tap readout
  const tip = $('#ghTip');
  const show = e => {
    const c = e.target.closest('.gh-cell[data-i]');
    if (!c) return;
    const d = days[c.dataset.i];
    tip.textContent = `${plural(d.count)} · ${fmtDay.format(utc(d.date))}`;
  };
  grid.addEventListener('pointerover', show);
  grid.addEventListener('click', show);

  // Stats
  let longest = 0, run = 0, best = days[0];
  days.forEach(d => { run = d.count ? run + 1 : 0; longest = Math.max(longest, run); if (d.count > best.count) best = d; });
  let current = 0, k = days.length - 1;
  if (!days[k].count) k--;                                  // today may not have commits yet
  for (; k >= 0 && days[k].count; k--) current++;
  const active = days.filter(d => d.count).length;
  $('#ghStats').innerHTML = [
    ['Active days', active, `of ${days.length}`],
    ['Longest streak', longest, longest === 1 ? 'day' : 'days'],
    ['Current streak', current, current === 1 ? 'day' : 'days'],
    ['Best day', best.count, fmtDay.format(utc(best.date)).replace(/^\w+,?\s/, '')],
  ].map(s => `<li><span class="mono">${s[0]}</span><b>${s[1]}</b><em>${esc(s[2])}</em></li>`).join('');

  // Show the most recent weeks first on narrow screens
  const sc = $('#ghScroll'); sc.scrollLeft = sc.scrollWidth;
}
initContributions();

// ─────────────────────────────────────────────────────────────────────────────
// Spotify — now playing + recent plays (served by /api/spotify)
// Visitors play tracks in *their* browser through Spotify's embed; nothing here
// can control Pawan's own playback.
// ─────────────────────────────────────────────────────────────────────────────
function initSpotify(){
  const card = $('#spotify');
  const el = { art:$('#spArt'), glow:$('#spGlow'), status:$('#spStatus'), title:$('#spTitle'), artist:$('#spArtist'),
               bar:$('#spBar'), elapsed:$('#spElapsed'), dur:$('#spDur'), link:$('#spLink'),
               prev:$('#spPrev'), play:$('#spPlay'), next:$('#spNext'), count:$('#spCount') };
  const mmss = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const ago = iso => {
    const m = Math.round((Date.now() - new Date(iso)) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m} min ago`;
    const h = Math.round(m / 60);
    return h < 24 ? `${h} hr${h > 1 ? 's' : ''} ago` : `${Math.round(h / 24)} day${h >= 48 ? 's' : ''} ago`;
  };
  const uriOf = t => `spotify:track:${t.id}`;

  // Live/last-played track first, then the fixed favourites, then other recent plays
  const merge = api => {
    const seen = new Set();
    return [...api.slice(0, 1), ...favourites, ...api.slice(1)].filter(t => t?.id && !seen.has(t.id) && seen.add(t.id));
  };
  let tracks = merge([]), idx = 0, lastArt = '';
  const live    = { isPlaying:false, progressMs:0, at:0 };                  // Pawan's own playback
  const visitor = { uri:null, playing:false, pos:0, dur:0, at:0 };          // this visitor's embed playback
  let controllerP = null, loadedUri = null;

  const current = () => tracks[idx];
  const listeningHere = () => visitor.playing && current() && visitor.uri === uriOf(current());

  function render(){
    const t = current();
    card.classList.remove('is-idle', 'is-playing', 'is-paused', 'is-recent');
    card.classList.toggle('is-listening', !!listeningHere());
    if (!t){
      card.classList.add('is-idle');
      el.status.textContent = 'On my headphones';
      el.title.textContent = 'Silence.';
      el.artist.textContent = 'Nothing on the speakers right now — probably deep in code.';
      return;
    }
    const mode = t.live ? (live.isPlaying ? 'playing' : 'paused') : 'recent';
    const favNo = favourites.findIndex(f => f.id === t.id) + 1;
    card.classList.add(`is-${mode}`);
    el.status.textContent =
      listeningHere()    ? 'Playing in your browser' :
      mode === 'playing' ? 'Listening now' :
      mode === 'paused'  ? 'Paused' :
      t.playedAt         ? `${idx === 0 ? 'Last played' : 'Recently played'} · ${ago(t.playedAt)}` :
      `On repeat · favourite ${favNo} of ${favourites.length}`;
    el.title.textContent = t.title;
    el.artist.textContent = t.album ? `${t.artist} — ${t.album}` : t.artist;
    if (t.albumArt && t.albumArt !== lastArt){
      lastArt = t.albumArt;
      el.art.src = t.albumArt; el.art.alt = `${t.album || t.title} cover`;
      el.glow.style.backgroundImage = `url("${t.albumArt}")`;
    }
    if (t.url){ el.link.href = t.url; el.link.textContent = 'Open in Spotify ↗'; }
    el.count.textContent = tracks.length > 1 ? `${idx + 1} / ${tracks.length}` : '';
    el.prev.disabled = idx === 0;
    el.next.disabled = idx >= tracks.length - 1;
    el.play.setAttribute('aria-label', listeningHere() ? 'Pause preview' : 'Play preview');
    progress();
  }

  function progress(){
    const t = current();
    if (!t) return;
    let pos, dur;
    if (visitor.uri === uriOf(t) && visitor.dur){                 // visitor's own playback wins
      dur = visitor.dur;
      pos = visitor.pos + (visitor.playing ? performance.now() - visitor.at : 0);
    } else if (t.live){                                           // mirror Pawan's live position
      dur = t.durationMs;
      pos = live.progressMs + (live.isPlaying ? performance.now() - live.at : 0);
      if (live.isPlaying && pos >= dur && !t.ended){ t.ended = true; setTimeout(load, 2000); }  // song ended → ask what's next
    } else {
      dur = t.durationMs; pos = 0;
    }
    pos = Math.min(pos, dur);
    el.bar.style.width = `${dur ? (pos / dur) * 100 : 0}%`;
    el.elapsed.textContent = mmss(pos);
    el.dur.textContent = mmss(dur);
  }

  async function load(){
    try {
      const res = await fetch('/api/spotify', { headers:{ Accept:'application/json' } });
      const data = res.ok ? await res.json() : null;
      if (!data?.success) throw new Error('unavailable');
      live.isPlaying = data.isPlaying; live.progressMs = data.progressMs || 0; live.at = performance.now();
      // Don't yank the list away while a visitor is browsing or listening
      if (idx === 0 && !visitor.playing) tracks = merge(data.tracks || []);
      else if (tracks[0]?.live && data.tracks?.[0]?.id === tracks[0].id) tracks[0] = data.tracks[0];
    } catch {
      if (idx === 0 && !visitor.playing) tracks = merge([]);   // Spotify not connected → favourites only
    }
    render();
  }

  // ── Spotify iFrame API — loaded only when someone presses play ─────────────
  let spApi = null;                                               // Spotify's IFrameAPI, once its script has loaded
  const loadApi = () => spApi ? Promise.resolve(spApi) : new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = api => { spApi = api; resolve(api); };
    const s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1';
    s.async = true;
    s.onerror = () => { s.remove(); reject(new Error('Spotify player blocked')); };
    document.head.appendChild(s);
  });

  function controller(uri){
    if (controllerP) return controllerP;
    card.classList.add('has-embed');                              // Spotify's own player, shown inside the card
    controllerP = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Spotify player timed out')), 12000);
      loadApi().then(api => {
        const host = document.createElement('div');
        $('#spEmbed').appendChild(host);
        api.createController(host, { uri, width:'100%', height:80, theme:'dark' }, c => {
          loadedUri = uri;
          c.addListener('playback_update', e => {
            const d = e.data;
            visitor.playing = !d.isPaused && !d.isBuffering;
            visitor.pos = d.position; visitor.dur = d.duration; visitor.at = performance.now();
            el.play.classList.remove('loading');
            render();
          });
          c.addListener('ready', () => { clearTimeout(timer); resolve(c); });
        });
      }, err => { clearTimeout(timer); reject(err); });
    });
    controllerP.catch(() => {
      controllerP = null; loadedUri = null;
      $('#spEmbed').innerHTML = '';                               // start clean on the next attempt
      card.classList.remove('has-embed');
    });
    return controllerP;
  }

  async function playCurrent(){
    const t = current();
    if (!t) return;
    const uri = uriOf(t);
    el.play.classList.add('loading');
    try {
      const c = await controller(uri);
      if (loadedUri !== uri){ c.loadUri(uri); loadedUri = uri; }
      visitor.uri = uri; visitor.pos = 0; visitor.dur = 0;
      c.play();
      setTimeout(() => {                                          // browser blocked autoplay → point at Spotify's own button
        if (visitor.playing || visitor.uri !== uri) return;
        el.play.classList.remove('loading');
        el.status.textContent = 'Tap play on the Spotify player below';
      }, 4000);
    } catch (err) {
      console.warn(err);
      el.play.classList.remove('loading');
      el.status.textContent = 'Player unavailable — open in Spotify';
    }
  }

  el.play.addEventListener('click', async () => {
    if (listeningHere()){ (await controllerP)?.pause(); return; }
    const t = current();
    if (t && visitor.uri === uriOf(t) && controllerP){ (await controllerP).resume(); return; }
    playCurrent();
  });
  const step = d => {
    const n = idx + d;
    if (n < 0 || n >= tracks.length) return;
    const wasPlaying = visitor.playing;
    idx = n; render();
    if (wasPlaying) playCurrent();
  };
  el.prev.addEventListener('click', () => step(-1));
  el.next.addEventListener('click', () => step(1));

  // ── Vinyl scratch: drag the record in a circle to scrub (1 turn = 8 s) ──────
  const disc = $('.sp-disc');
  let spin = 0, scratch = null;
  const angle = e => { const r = disc.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
  disc.addEventListener('pointerdown', e => {
    if (!current()) return;
    disc.setPointerCapture(e.pointerId);
    const cs = getComputedStyle(disc).transform;                  // continue from the current spin angle
    if (cs && cs !== 'none'){ const [a, b] = cs.slice(7, -1).split(',').map(Number); spin = Math.atan2(b, a) * 180 / Math.PI; }
    scratch = { last: angle(e), turned: 0 };
    card.classList.add('is-scratching');
  });
  disc.addEventListener('pointermove', e => {
    if (!scratch) return;
    let d = angle(e) - scratch.last; scratch.last += d;
    if (d > 180) d -= 360; else if (d < -180) d += 360;
    scratch.turned += d; spin += d;
    disc.style.transform = `rotate(${spin}deg)`;
    el.status.textContent = `Scratching ${scratch.turned >= 0 ? '⏩' : '⏪'} ${(Math.abs(scratch.turned) / 45).toFixed(1)} s`;
  });
  const release = async () => {
    if (!scratch) return;
    const shiftMs = scratch.turned / 360 * 8000; scratch = null;
    card.classList.remove('is-scratching'); disc.style.transform = '';
    const t = current();
    if (t && controllerP && visitor.uri === uriOf(t) && visitor.dur){      // visitor's own playback: really seek
      const pos = Math.max(0, Math.min(visitor.dur - 500, visitor.pos + (visitor.playing ? performance.now() - visitor.at : 0) + shiftMs));
      (await controllerP).seek(pos / 1000);
    }
    render();
  };
  disc.addEventListener('pointerup', release);
  disc.addEventListener('pointercancel', release);

  render();   // favourites straight away; live data replaces the first slot when it arrives
  load();
  setInterval(progress, 1000);
  setInterval(() => { if (document.visibilityState === 'visible') load(); }, 30000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') load(); });
}
initSpotify();

// ─────────────────────────────────────────────────────────────────────────────
// Live Nagpur (IST) clock
// ─────────────────────────────────────────────────────────────────────────────
const tz = 'Asia/Kolkata';
const fmtTime  = new Intl.DateTimeFormat('en-IN', { timeZone:tz, hour:'numeric', minute:'2-digit', hour12:true });
const fmtStamp = new Intl.DateTimeFormat('en-GB', { timeZone:tz, weekday:'long', day:'numeric', month:'long', year:'numeric' });
function guess(h){
  if (h < 6)  return 'Asleep (or debugging)';
  if (h < 9)  return 'Morning workout';
  if (h < 13) return 'Deep in code';
  if (h < 15) return 'Cooking lunch';
  if (h < 19) return 'Shipping features';
  if (h < 22) return 'In the kitchen';
  return 'One more commit';
}
function tick(){
  const d = new Date(), t = fmtTime.format(d).toUpperCase();
  const h = Number(new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'numeric',hour12:false}).format(d)) % 24;
  document.querySelectorAll('.live-time').forEach(e => e.textContent = t);
  document.querySelectorAll('.live-stamp').forEach(e => e.textContent = `${fmtStamp.format(d)} at ${t}`);
  document.querySelectorAll('.now-guess').forEach(e => e.textContent = guess(h));
}
tick(); setInterval(tick, 15000);

// ─────────────────────────────────────────────────────────────────────────────
// Halftone avatar — the photo redrawn as a dot matrix; hover/tap reveals it
// ─────────────────────────────────────────────────────────────────────────────
function initHalftone(){
  const canvas = $('#halftone'), btn = $('#avatar'), src = $('#avatar img');
  const ctx = canvas.getContext('2d');
  const img = new Image(); img.src = src.currentSrc || src.src;
  function draw(){
    const size = btn.clientWidth, dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = canvas.height = Math.round(size * dpr);
    const cell = Math.max(4, Math.round(size / 46)) * dpr, n = Math.ceil(canvas.width / cell);
    const off = document.createElement('canvas'); off.width = off.height = n;
    const o = off.getContext('2d', { willReadFrequently:true });
    o.drawImage(img, 0, 0, n, n);
    const px = o.getImageData(0, 0, n, n).data;
    ctx.fillStyle = '#e5192c'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
      const i = (y*n + x) * 4, r = px[i], g = px[i+1], b = px[i+2];
      if (r > 140 && g < 70 && b < 70) continue;           // skip the red backdrop
      const lum = (0.299*r + 0.587*g + 0.114*b) / 255;
      const s = cell * Math.min(.92, Math.pow(lum, .75) * 1.05);
      if (s < cell * .12) continue;
      ctx.globalAlpha = .55 + lum * .45;
      ctx.fillRect(x*cell + (cell - s)/2, y*cell + (cell - s)/2, s, s);
    }
    ctx.globalAlpha = 1;
  }
  img.onload = draw;
  if (img.complete && img.naturalWidth) draw();
  new ResizeObserver(() => img.naturalWidth && draw()).observe(btn);
  btn.addEventListener('click', () => btn.classList.toggle('revealed'));
}
initHalftone();

// ─────────────────────────────────────────────────────────────────────────────
// Smooth scroll + anchor links
// ─────────────────────────────────────────────────────────────────────────────
const lenis = reduceMotion ? null : new Lenis({ smoothWheel:true, lerp:.09 });
if (lenis) { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.hasAttribute('data-contact')) return;
  const el = document.querySelector(a.getAttribute('href'));
  if (!el) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(el, { offset:-80, duration:1.4 });
  else el.scrollIntoView();
});

// ─────────────────────────────────────────────────────────────────────────────
// Reveal on scroll
// ─────────────────────────────────────────────────────────────────────────────
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold:.12, rootMargin:'0px 0px -5% 0px' });
const observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach(el => {
  if (!el.closest('.hero')) io.observe(el);
});

// ─────────────────────────────────────────────────────────────────────────────
// Glass spotlight + cursor dot
// ─────────────────────────────────────────────────────────────────────────────
document.addEventListener('pointermove', e => {
  const g = e.target.closest?.('.glass');
  if (!g) return;
  const r = g.getBoundingClientRect();
  g.style.setProperty('--mx', `${e.clientX - r.left}px`);
  g.style.setProperty('--my', `${e.clientY - r.top}px`);
}, { passive:true });

(() => {
  const dot = $('.cursor-dot');
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches || reduceMotion) return;
  let x = -100, y = -100, cx = x, cy = y;
  addEventListener('pointermove', e => {
    x = e.clientX; y = e.clientY; dot.classList.add('on');
    dot.classList.toggle('big', !!e.target.closest?.('a,button,.avatar'));
  }, { passive:true });
  document.addEventListener('pointerleave', () => dot.classList.remove('on'));
  const loop = () => { cx += (x-cx)*.22; cy += (y-cy)*.22; dot.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop); };
  loop();
})();

// ─────────────────────────────────────────────────────────────────────────────
// Intro
// ─────────────────────────────────────────────────────────────────────────────
function startSite(){
  const loader = $('#loader');
  loader.classList.add('done');
  setTimeout(() => loader.remove(), 800);
  document.body.classList.add('ready');
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
  observeReveals();
}
const minIntro = reduceMotion ? 0 : 1400, t0 = performance.now();
let started = false;
const go = () => { if (started) return; started = true; setTimeout(startSite, Math.max(0, minIntro - (performance.now() - t0))); };
if (document.readyState === 'complete') go(); else addEventListener('load', go);
setTimeout(go, 3500); // never block on slow assets

// ─────────────────────────────────────────────────────────────────────────────
// Contact modal + API integration
// ─────────────────────────────────────────────────────────────────────────────
const modal       = $('#requestModal');
const form        = $('#projectForm');
const formState   = $('#formState');
const success     = $('#successState');
const submitBtn   = $('#submitBtn');
const errorBanner = $('#formError');
let lastFocus = null;

function openModal(){
  lastFocus = document.activeElement;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  lenis?.stop(); document.documentElement.style.overflow = 'hidden';
  requestAnimationFrame(() => { modal.classList.add('visible'); $('#name').focus(); });
}
function closeModal(){
  modal.classList.remove('visible');
  setTimeout(() => {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
    lenis?.start(); document.documentElement.style.removeProperty('overflow');
    lastFocus?.focus?.();
    form.reset(); success.classList.remove('show'); formState.style.display = 'block';
    errorBanner.style.display = 'none'; errorBanner.textContent = '';
    resetSubmitBtn();
  }, 360);
}
document.addEventListener('click', e => { if (e.target.closest('[data-contact]')) { e.preventDefault(); openModal(); } });
$('#modalClose').onclick = closeModal;
$('#successClose').onclick = closeModal;
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

function setSubmitLoading(){ submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
function resetSubmitBtn(){ submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
function showFormError(msg){ errorBanner.textContent = msg; errorBanner.style.display = 'block'; }

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorBanner.style.display = 'none'; errorBanner.textContent = '';

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const project = form.project.value.trim();

  if (!name || !email || !project) return showFormError('Please fill in all fields before sending.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showFormError('Please enter a valid email address.');

  setSubmitLoading();
  try {
    const res = await fetch('/api/contact', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify({ name, email, project }),
    });
    const data = await res.json();
    if (res.ok && data.success){
      formState.style.display = 'none';
      success.classList.add('show');
    } else if (res.status === 429){
      resetSubmitBtn();
      showFormError('Too many submissions. Please wait a while and try again.');
    } else {
      resetSubmitBtn();
      showFormError(data.errors?.join(' ') || data.message || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    console.error('Contact form error:', err);
    resetSubmitBtn();
    showFormError('Network error. Please check your connection and try again.');
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Break my warehouse — simulated race for the last box
// Naive: read → (network delay) → write, so both orders see "1 in stock".
// Atomic: check-and-decrement is one step, so only one order can win.
// ─────────────────────────────────────────────────────────────────────────────
(() => {
  const count = $('#stockCount'), log = $('#raceLog'), verdict = $('#raceVerdict'), shelf = $('#shelf'), race = $('#race');
  let stock = 1, mode = 'atomic', sold = 0, busy = false;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const line = (who, text, cls = '') => { log.insertAdjacentHTML('beforeend', `<li class="${cls}"><b>${who}</b> ${text}</li>`); };
  const show = () => { count.textContent = stock < 0 ? `−${-stock}` : stock; shelf.dataset.state = stock < 0 ? 'bad' : stock === 0 ? 'empty' : ''; };

  async function order(who){
    if (mode === 'atomic'){
      await wait(120 + Math.random() * 80);
      if (stock > 0){ stock--; sold++; line(who, 'reserve(1) → ✓ reserved atomically', 'ok'); }
      else line(who, 'reserve(1) → ✗ out of stock — refused', 'no');
    } else {
      const seen = stock;
      line(who, `read stock → ${seen}`);
      await wait(260);                                            // the gap where the race happens
      if (seen > 0){ stock--; sold++; line(who, `${seen} > 0, so write stock − 1 → ${stock}`, stock < 0 ? 'bad' : 'ok'); }
      else line(who, 'saw 0 → refused', 'no');
    }
    show();
  }
  function judge(){
    const bad = stock < 0;
    if (bad) verdict.textContent = `Oversold! Sold ${sold} boxes but only had 1. Someone gets an apology email.`;
    else if (sold) verdict.textContent = `Consistent. ${sold} sold, stock ${stock}. ${mode === 'atomic' ? 'The other order was politely refused.' : 'Lucky timing — try ⚡ Race both.'}`;
    race.dataset.result = bad ? 'bad' : 'ok';
  }
  const reset = () => { stock = 1; sold = 0; log.innerHTML = ''; verdict.textContent = 'Press ⚡ Race both.'; delete race.dataset.result; show(); };
  async function run(orders){
    if (busy) return; busy = true;
    if (stock < 1) reset();
    await Promise.all(orders.map(order)); judge(); busy = false;
  }
  $('#raceBoth').onclick = () => run(['A', 'B']);
  race.querySelectorAll('[data-order]').forEach(b => b.onclick = () => run([b.dataset.order]));
  $('#raceReset').onclick = reset;
  race.querySelectorAll('.race-mode').forEach(b => b.onclick = () => {
    mode = b.dataset.mode;
    race.querySelectorAll('.race-mode').forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-checked', x === b); });
    reset();
  });
  show();
})();

// ─────────────────────────────────────────────────────────────────────────────
// Dark / light switch — CRT "switch-off" then flip
// ─────────────────────────────────────────────────────────────────────────────
(() => {
  const btn = $('#themeBtn'), root = document.documentElement;
  const label = () => btn.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'light' ? 'dark' : 'light'} theme`);
  label();
  btn.onclick = () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    const flip = () => { root.dataset.theme = next; try { localStorage.setItem('theme', next); } catch {} label(); };
    if (reduceMotion) return flip();
    root.classList.add('crt');
    setTimeout(flip, 280);
    setTimeout(() => root.classList.remove('crt'), 620);
  };
})();

// ─────────────────────────────────────────────────────────────────────────────
// Pixel guestbook — 16×16 doodles stored via /api/guestbook
// ─────────────────────────────────────────────────────────────────────────────
(() => {
  const N = 16, PALETTE = [null, '#e5192c', '#f3f1ee', '#9b9895', '#3a3a3a', '#ffb000'];   // 0 = eraser
  const cv = $('#gbCanvas'), ctx = cv.getContext('2d'), wall = $('#gbWall'), msg = $('#gbMsg');
  const px = new Array(N * N).fill(0);
  let colour = 1, drawing = false;

  $('#gbPalette').innerHTML = PALETTE.map((c, i) => `<button type="button" class="gb-swatch${i === 1 ? ' is-on' : ''}" data-c="${i}" role="radio" aria-checked="${i === 1}" aria-label="${i ? 'Colour ' + c : 'Eraser'}" style="${c ? `--sw:${c}` : ''}">${i ? '' : '⌫'}</button>`).join('');
  $('#gbPalette').onclick = e => {
    const b = e.target.closest('.gb-swatch'); if (!b) return;
    colour = +b.dataset.c;
    document.querySelectorAll('.gb-swatch').forEach(s => { s.classList.toggle('is-on', s === b); s.setAttribute('aria-checked', s === b); });
  };

  const paintGrid = (c, pixels, size) => {
    const g = c.getContext('2d'), cell = size / N;
    g.clearRect(0, 0, size, size);
    for (let i = 0; i < N * N; i++){ const col = PALETTE[+pixels[i]]; if (col){ g.fillStyle = col; g.fillRect((i % N) * cell, Math.floor(i / N) * cell, cell, cell); } }
  };
  const draw = () => {
    paintGrid(cv, px.join(''), cv.width);
    ctx.strokeStyle = 'rgba(128,128,128,.18)'; ctx.lineWidth = 1;
    for (let k = 1; k < N; k++){ const p = k * cv.width / N + .5; ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, cv.height); ctx.moveTo(0, p); ctx.lineTo(cv.width, p); ctx.stroke(); }
  };
  const at = e => { const r = cv.getBoundingClientRect(); const x = Math.floor((e.clientX - r.left) / r.width * N), y = Math.floor((e.clientY - r.top) / r.height * N); return x >= 0 && y >= 0 && x < N && y < N ? y * N + x : -1; };
  const stroke = e => { const i = at(e); if (i >= 0 && px[i] !== colour){ px[i] = colour; draw(); } };
  cv.addEventListener('pointerdown', e => { drawing = true; cv.setPointerCapture(e.pointerId); stroke(e); });
  cv.addEventListener('pointermove', e => drawing && stroke(e));
  cv.addEventListener('pointerup', () => drawing = false);
  $('#gbClear').onclick = () => { px.fill(0); draw(); };
  draw();

  const ago = iso => { const m = Math.round((Date.now() - new Date(iso)) / 60000); return m < 60 ? `${Math.max(1, m)}m` : m < 1440 ? `${Math.round(m / 60)}h` : `${Math.round(m / 1440)}d`; };
  const addTile = (it, first) => {
    const li = document.createElement('li'); li.className = 'gb-tile';
    const c = document.createElement('canvas'); c.width = c.height = 96; paintGrid(c, it.pixels, 96);
    li.append(c); li.insertAdjacentHTML('beforeend', `<span class="gb-name">${esc(it.name)}</span><span class="gb-when mono">${ago(it.createdAt)}</span>`);
    first ? wall.prepend(li) : wall.append(li);
  };
  fetch('/api/guestbook').then(r => r.ok ? r.json() : Promise.reject()).then(d => {
    wall.innerHTML = ''; d.items.forEach(it => addTile(it));
    if (!d.items.length) wall.innerHTML = '<li class="gb-empty mono">Be the first to sign ✦</li>';
  }).catch(() => { wall.innerHTML = '<li class="gb-empty mono">The wall is offline right now.</li>'; });

  $('#gbForm').addEventListener('submit', async e => {
    e.preventDefault();
    const name = $('#gbName').value.trim(), btn = $('#gbSubmit');
    if (name.length < 2) return msg.textContent = 'Add your name ✎';
    if (!px.some(Boolean)) return msg.textContent = 'Draw something first ✎';
    btn.disabled = true; msg.textContent = 'Signing…';
    try {
      const res = await fetch('/api/guestbook', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ name, pixels:px.join('') }) });
      const d = await res.json().catch(() => null);               // non-JSON = no API here (e.g. static preview)
      if (!d) throw new Error('The wall is offline right now — try again on the live site.');
      if (!d.success) throw new Error(d.message);
      wall.querySelector('.gb-empty')?.remove(); addTile(d.item, true);
      px.fill(0); draw(); $('#gbName').value = ''; msg.textContent = 'Signed — thanks! ✦';
    } catch (err) { msg.textContent = err.message || 'Could not sign right now.'; }
    btn.disabled = false;
  });
})();
