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

Motion is entirely native scroll-driven CSS (`animation-timeline: view()` and `scroll()`), gated on `@supports` and `prefers-reduced-motion`. No JavaScript and no libraries. The only script in the file toggles case studies with a view transition and opens them before printing.

Print styles exist and must keep working, since the page doubles as the PDF source. Everything animated is reset there, and links print their full URL.

## Portrait

`portrait-web.jpg` is a 432px asset displayed at 144px (9rem) in the masthead margin, right-aligned to the same vertical as every margin note. `portrait.jpg` is the untouched original and should be kept.

Provenance, so nobody has to re-derive it: the original is a street selfie. The background and shirt were replaced with a generative edit, which also straightened the head slightly and removed the wide-angle selfie distortion. The likeness is accurate. Two defects in that output were dealt with here: a generated sparkle watermark on the shirt was inpainted out, and both collar points came back frayed, which is why the display size is capped at 144px, where the fray is not visible. Do not enlarge the portrait past about 150px without regenerating the source, and do not use this asset for anything print-large.

The tone is a soft warm treatment, 78% desaturated with the red channel lifted and blue pulled back, so it sits in the ivory paper rather than on it. A full duotone was tried and reads cold against this palette.

If the CV is ever sent to the UK, US, Canada or Ireland, remove the portrait: a photo is expected in Greece and normal in Sweden, but there it is a screening liability.

## Open questions

- Whether the header label "UX practitioner" is the right description
- Whether the Greek and English toggle from the previous version gets rebuilt
- The PDF download link is still a placeholder. LinkedIn and both case studies are live: Agent X at `https://ioanniskp.github.io/-agent-x-case-study/`, Radio at `https://ioanniskp.github.io/radio/`
- The masthead lede still describes research as habitual practice, which the Practice section contradicts by admitting one cycle. Unresolved
- Konduko is described as twelve years in the body but dated 2012 to 2025, which spans thirteen
- Resolved by the EY folder: the Medieinstitutet programme ran Mar to Jun 2026, so it is complete, not expected. And Apolyto ended in 2009, which is what makes "seventeen years" correct even though the Athens era ran to 2011 through consulting

## Sibling CVs

`../CV-Athens-Greece EY/` is a per-employer adaptation with a different design: single column, 720px, warm cream and terracotta, portrait photo, EN/EL toggle, and a 2-page A4 PDF built from `cv-data.json` through templates. It is the better conventional CV; this one is the better portfolio piece. Two cautions if reusing it: it still says he will begin the Hyper Island programme in August 2026, which is stale and wrong, and its tagline and closing use the marketing register this project's voice guide bans.

## Quality floor

Responsive to mobile, visible keyboard focus, reduced motion respected, prints cleanly to A4.
