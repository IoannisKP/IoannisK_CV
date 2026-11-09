# CV Port IK

Ioannis Koupidis’s product-management portfolio. Static HTML entry points, shared JavaScript and one stylesheet; no production build step.

## Editorial layout

- Warm monochrome interface, Manrope typography and automatic dark mode.
- Introduction, compact experience band, three featured projects (HIRoom, Scribe, PM Compass), three further projects, background and contact.
- A genuine HIRoom screen accompanies the introduction. The owner requested a portfolio without a portrait.
- Case studies open with problem, contribution, decision and evidence. Full and TL;DR modes retain shareable `?view=tldr` URLs. Screens appear beside the relevant chapters in the full version.
- Mobile navigation supports Escape, focus wrapping and synchronized expanded state. Content does not depend on scroll reveals. A shared motion layer supplies the brief entrance and hover/press feedback, respecting reduced motion.

## Content and assets

`data.js` contains the biography, experience and original project narratives. `app.js` composes pages and handles navigation and reading modes. `styles.css` is the single design system; the earlier override stylesheet has been removed. The unchanged micro-interaction files in `assets/taste-motion/` come from the requested design-taste-frontend toolkit.

HIRoom and Scribe use existing authentic screenshots. Radio’s existing screenshot is now stored locally. PM Compass is represented by its documented information architecture, not a fabricated app screenshot. All six project pages remain at their existing URLs.

Project status and evidence limitations remain explicit. Konduko’s estimated aggregate SEK 1.5B+ procurement-framework value is not company revenue. The CV download is stored locally in this repository.

## Run and check

Serve with `python3 -m http.server 8000`, then visit `http://localhost:8000/`.

For DOM-level regression checks: `npm ci && npm test`. These cover page rendering, local links/assets, headings, menu states and Full/TL;DR transitions. They do not replace real-browser layout or accessibility testing.

Before publication, visually review 1440, 1024, 768, 390 and 320px layouts, light/dark mode, keyboard navigation and reduced motion. The automated visual gate could not run in the authoring environment because Chrome did not start; no visual pass is claimed.

## Hosting

Existing GitHub Pages address: https://ioanniskp.github.io/IoannisK_CV/

Deploy from `main` and `/(root)`. The prior multilingual site is retained under `legacy/`; older case-study links and language-specific URLs continue to work.
