// Renders scripts/resume/resume.html to public/Pawan_Patil_Resume.pdf with headless Edge/Chrome.
// Usage: node scripts/resume/build.mjs [input.html] [output.pdf]
//   defaults: resume.html -> public/Pawan_Patil_Resume.pdf   (set BROWSER=path/to/chrome to override the browser)
import { spawn } from 'node:child_process';
import { writeFileSync, existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const [, , inArg, outArg] = process.argv;
const src = pathToFileURL(path.resolve(inArg || path.join(here, 'resume.html'))).href;
const out = path.resolve(outArg || path.join(here, '..', '..', 'public', 'Pawan_Patil_Resume.pdf'));

const candidates = [
  process.env.BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean);
const browser = candidates.find(p => existsSync(p));
if (!browser) { console.error('No Chrome/Edge found — set BROWSER=/path/to/chrome'); process.exit(1); }

const port = 9400 + Math.floor(Math.random() * 300);
const proc = spawn(browser, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(path.join(tmpdir(), 'resume-'))}`, 'about:blank']);
const sleep = ms => new Promise(r => setTimeout(r, ms));

try {
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page'); } catch {}
    if (!target) await sleep(250);
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let id = 0; const pending = {};
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });

  await send('Page.enable');
  await send('Page.navigate', { url: src });
  await sleep(1500);
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
  const pdf = await send('Page.printToPDF', { preferCSSPageSize: true, printBackground: true });
  const bytes = Buffer.from(pdf.result.data, 'base64');
  writeFileSync(out, bytes);
  const pages = (bytes.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`Wrote ${path.relative(process.cwd(), out)} — ${pages} page(s)${pages > 1 ? '  ⚠ résumé spilled onto a second page' : ''}`);
  ws.close();
} finally {
  proc.kill();
}
