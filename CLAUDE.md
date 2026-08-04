# CV project

Personal CV site for Ioannis Koupidis. Single-page, static. `index.html` is the whole thing: markup, CSS and any script live in that one file.

## Who this is for

Ioannis is moving into junior UX, product design, UX research and junior product management. He is between Athens and Stockholm and will relocate to whichever produces a job. Greek native, English and Swedish fluent.

Career shape: 13 years in visual communication in Athens (1998 to 2011), then 12 years founding and running Konduko AB, a healthcare staffing company (2012 to 2025), plus NiyaCare Stockholm AB (2011 onward). UX qualification at Medieinstitutet Stockholm, 2026.

## Positioning decisions already made

Do not undo these without asking.

- **UX work leads.** The two case studies, Agent X and Radio, come first. Everything else supports them.
- **Graphic design is background, not a selling point.** He has not worked as a graphic designer in 17 years and does not want to be hired for it. The Background section says so explicitly. Keep that line.
- **No overclaiming.** He has never worked professionally as a UX designer. Agent X was a student project done with teacher guidance. Any sentence implying professional UX experience or independent seniority is wrong and must be fixed. This is the single most important rule in this file.
- **Hyper Island is removed.** He was accepted to the Product Manager programme starting August 2026 and decided not to attend. Any reference to it is stale.
- **Radio is labelled a personal project.** He directed and audited an AI-assisted iOS build in a day without writing code. The point of the piece is specifying, questioning and testing, which is product management work.
- **The SEK 1.5B+ figure is back, with its limits stated.** It was removed once, then restored on 4 Aug 2026 after comparing against the EY CV, which kept the number and footnoted it. The sidenote saying these were procurement estimates and not guaranteed spend or revenue is the reason the figure is allowed to stand. Never show the number without it.
- **The Athens years carry titles and dates.** Graphic design stays de-emphasised in tone, but the four roles are listed with dates so the CV still works as an employment record. De-emphasising a period is not a reason to leave a thirteen-year hole in the dates.
- **Tools are not a strength and must not be listed as one.** Miro was removed because he does not know what it is. Figma is basic and is stated as basic in a sidenote rather than sitting in a skills list. Do not add tool names back without checking he actually uses them.

## Voice

Plain, direct prose. No flourishes, no marketing language, no em dashes. Short declarative sentences. Where a claim could be challenged in an interview, state the limit rather than hiding it.

## Design system

Keep these. The typefaces in particular are a settled preference.

- **Fraunces** for display: name statement, section heads, metric numerals, and the numbered margin notes in italic at `opsz 14`
- **Inter** for body, 15.5px, line height 1.62
- **IBM Plex Mono** for eyebrows, labels, dates, uppercase with wide tracking

The right-hand margin holds two different kinds of content and they are typeset differently on purpose. Numbered prose notes are Fraunces italic, so the margin reads as a different kind of text rather than body copy tipped over. Mono metadata such as dates and the location is IBM Plex Mono uppercase, because it is labelling, not commentary. The reference numerals stay mono in both places, since they are apparatus and should match the marker in the text.

Tokens are CSS variables at the top of `index.html`:
`--paper:#F5F2EC` `--surface:#FDFBF7` `--ink:#191714` `--muted:#57524A`
`--faint:#6E675C` `--rule:#E0DAD0` `--accent:#23405F` `--accent-2:#9C5324` `--measure:38rem`

**Two accents with separate jobs.** Navy carries anything interactive or structural: links, the italic word in the masthead and the closing statement, outcome borders, the CTA, section rules, the spine progress. Copper carries quantities only: metric numerals and sidenote reference markers. Do not let one take the other's work, since the point of the pair is that a single accent had been doing five jobs.

**The paper is warm deliberately.** It was cool grey (`#EDEFF1`) through three rejected accents: green `#2E5E4E`, blue `#1550B8`, maroon `#8C2F39`. The accent was never the problem. Warm pigment on cold ground reads as unresolved and fights Fraunces. Do not return to a cool paper without rethinking the accents too.

Every colour used for text clears WCAG AA on paper: ink 16.0, muted 6.9, faint 5.0, navy 9.5, copper 5.5. Check any token you change. `--faint` was previously `#8C979F` at 2.59:1, which failed outright and made the spine labels nearly invisible.

Layout is a three-column editorial grid: `--spine:7rem` for sticky mono section labels, `--measure:38rem` for text, and `--margin-col:13rem` for marginalia, separated by `--gutter:2.5rem`. Sidenotes are floated out of the measure into the margin column with a negative margin. Work cards break the measure to the right and carry their own note rail, which is why `--card-pad` and `--note-pull` exist: they keep card notes and prose notes on one vertical. Collapses to two columns under 1080px, where notes fold inline as blocks, and to one column under 720px.

Motion is entirely native scroll-driven CSS (`animation-timeline: view()` and `scroll()`), gated on `@supports` and `prefers-reduced-motion`. No JavaScript and no libraries. The only script in the file toggles the case studies open with a view transition.

Print styles must keep working, since the page is its own PDF source. Everything animated is reset there, and outbound links print their full URL after the link text.

## No portrait

There is deliberately no photograph on this CV. Ioannis decided on 4 Aug 2026 that a headshot invites a first impression based on looks and creates reactions that would not exist without it. Do not add one back without asking. It also means this CV needs no separate variant for the UK, US, Canada or Ireland, where a photo is a screening liability.

`portrait.jpg` (the corrected 512px source) and `portrait-web.jpg` (the 432px treated asset) are still in the folder if the decision is ever reversed. The untouched street selfie they came from lives only in `../CV-Athens-Greece EY/portrait.jpg`.

## PDF

`Ioannis-Koupidis-CV.pdf` is generated from `index.html` itself, not from a separate source file. Run `./make-pdf.command`, or the Chrome headless call inside it. **Regenerate after any content change**, or the download link serves a stale CV.

The `@media print` block is a real layout, not a set of tweaks. On screen the page is a three-track editorial grid; that grid does not paginate, and printing it directly produced a nine-page PDF where each section was pushed onto a fresh page. In print the grid collapses to a single column, section labels become ruled headers, margin notes fold inline as small footnotes, and the case studies are hidden entirely so their printed URLs carry the reader instead.

It runs to three pages at roughly 93% / 91% / 28% fill. Two pages is not reachable without either splitting a work card across a page break or compressing the type past comfort: pages one and two cap out around 90% because `break-inside: avoid` on `.work` and `.item` pushes whole blocks. Do not chase two pages by removing those rules.

## Open questions

- ~~Whether the header label is right~~ **Settled 4 Aug 2026: "UX research & product".** It was "UX practitioner", which both the Greek and Swedish translators independently flagged as their hardest string, and which the Greek rendering turned into "UX professional" — implying professional UX experience. The new label is chosen to match the evidence rather than the ambition: eight interviews, two personas, a journey map and three think-aloud sessions are research; Radio is product direction. There is comparatively little design evidence, which is why "designer" is not in it. "Junior" was considered and rejected: it anchors readers to expect someone in their twenties and invites them to discount twelve years of running a company.
## Languages

The CV ships in three languages as three separate documents, laid out for GitHub Pages:

```
/index.html      →  <site>/        English  (source of truth AND the template)
/sv/index.html   →  <site>/sv/     Swedish
/el/index.html   →  <site>/el/     Greek
```

Each language has its own URL you can send to an employer, its own `<html lang>`, and its own PDF sitting beside it. The switcher is three ordinary links with relative hrefs, so it works at any base path and needs no JavaScript.

**Never edit `sv/` or `el/` by hand — they are generated and will be overwritten.** Edit English in `index.html`, then run `./make-pdf.command`, which runs `build.py` first and then prints all three PDFs. Editing English without rebuilding leaves the other two languages and all three PDFs stale.

`build.py` replaces whole text nodes matching `i18n.json`. Three things it cannot reach by substitution are declared as constants at the top of the script: the masthead statement and the closing statement each carry an `<em>` accent word whose placement is an editorial choice per language, and the Greek colophon has to name the fonts Greek actually uses. If you add a string with inline markup inside it, it needs the same treatment.

`i18n.json` is generated from `CV-el.md` and `CV-sv.md`, which hold the English source above every translation. Those two files are the human-reviewable record; the JSON is the machine-readable one.

**Greek needs two font substitutions, not one.** Verified against Google Fonts: Fraunces has no Greek subset, and neither does IBM Plex Mono. Inter and EB Garamond both do. So the Greek build swaps the display serif to EB Garamond at weights 575/620 and the mono to Noto Sans Mono, via an override block appended at build time. Inter is unchanged. Swedish needs nothing.

**A recurring trap worth knowing.** Anything positioned into the margin column uses `margin-right: var(--note-pull)`, a large negative margin. Every such element also needs a reset inside the `max-width:1080px` block, or it flies off-screen once the margin column collapses. This has now bitten the portrait and the language switcher. If you add margin furniture, add the reset at the same time.
- Every link now resolves. LinkedIn, the PDF download, and both case studies: Agent X at `https://ioanniskp.github.io/-agent-x-case-study/`, Radio at `https://ioanniskp.github.io/radio/`
- The masthead lede still describes research as habitual practice, which the Practice section contradicts by admitting one cycle. Unresolved
- Konduko is described as twelve years in the body but dated 2012 to 2025, which spans thirteen
- Resolved by the EY folder: the Medieinstitutet programme ran Mar to Jun 2026, so it is complete, not expected. And Apolyto ended in 2009, which is what makes "seventeen years" correct even though the Athens era ran to 2011 through consulting

## Sibling CVs

`../CV-Athens-Greece EY/` is a per-employer adaptation with a different design: single column, 720px, warm cream and terracotta, portrait photo, EN/EL toggle, and a 2-page A4 PDF built from `cv-data.json` through templates. It is the better conventional CV; this one is the better portfolio piece. Two cautions if reusing it: it still says he will begin the Hyper Island programme in August 2026, which is stale and wrong, and its tagline and closing use the marketing register this project's voice guide bans.

## Quality floor

Responsive to mobile, visible keyboard focus, reduced motion respected, prints cleanly to A4.
