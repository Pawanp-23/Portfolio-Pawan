# Pawan Patil — portfolio

Personal portfolio of **Pawan Patil** — Forward Deployed Engineer intern at Eigi AI (shipped the official **eigi.ai**), AI developer and frontend developer, Nagpur. Use the positioning **"Forward Deployed Engineer · AI Developer · Frontend Developer"** (not "AI Product Engineer").

## Stack & deploy
- Vanilla HTML / CSS / JS (ES modules) in `public/`; Vercel serverless functions in `api/`; `server.js` mirrors them for local dev.
- Push to `main` → Vercel auto-deploys to https://portfolio-pawanpatil.vercel.app.
- Content lives in arrays at the top of `public/js/main.js` (`projects`, `moreProjects`, `experience`, `education`, `stack`, `life`).

## Build scripts
- Résumé: edit `scripts/resume/resume.html`, run `node scripts/resume/build.mjs` → `public/Pawan_Patil_Resume.pdf` (must stay one page; the script warns).
- Link-preview / GitHub banner: `scripts/og/og.html` rendered at 1200×630 with headless Edge → `public/og.jpg`.
- `applications/` (tailored résumés, cover notes) is gitignored — never commit it.

## Design rules
- Minimal, clean, professional, but alive (3D horizontal Work gallery, scroll-linked hero, tilt; all respect `prefers-reduced-motion`).
- No "AI-generated" label styling: no uppercase letter-spaced mono tags, "◦ 01 ◦" section numbers, card numbers/years, or filler hints. Plain sentence-case text. The hero's decrypting mono name line is the one intentional exception.
- Pixel font only for short names/headings. Images are WebP; project screenshots 1200×750.
- Check desktop (1440×900, 1366×625), phone (375×812) and light theme before calling a UI change done.

## Workflow
Make changes locally and show them first; commit and push to `main` only when Pawan approves. Don't commit `.claude/`.
