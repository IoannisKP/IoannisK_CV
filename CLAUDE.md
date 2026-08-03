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
- The SEK 1.5B framework-value figure was removed from the Konduko block as a deliberate choice.
- **Tools are not a strength and must not be listed as one.** Miro was removed because he does not know what it is. Figma is basic and is stated as basic in a sidenote rather than sitting in a skills list. Do not add tool names back without checking he actually uses them.

## Voice

Plain, direct prose. No flourishes, no marketing language, no em dashes. Short declarative sentences. Where a claim could be challenged in an interview, state the limit rather than hiding it.

## Design system

Keep these. The typefaces in particular are a settled preference.

- **Fraunces** for display: name statement, section heads, metric numerals
- **Inter** for body, 15.5px, line height 1.62
- **IBM Plex Mono** for eyebrows, labels, dates, uppercase with wide tracking

Tokens are CSS variables at the top of `index.html`:
`--paper:#EDEFF1` `--surface:#FFFFFF` `--ink:#141A1F` `--muted:#5C6771`
`--faint:#8C979F` `--rule:#D6DCE0` `--accent:#8C2F39` `--measure:38rem`

The accent has been green (`#2E5E4E`) and blue (`#1550B8`), both rejected, and is now maroon. Any replacement should hold about 7:1 on white and 6:1 on paper, since the accent is used for small mono text.

Layout is a three-column editorial grid: `--spine:7rem` for sticky mono section labels, `--measure:38rem` for text, and `--margin-col:13rem` for marginalia, separated by `--gutter:2.5rem`. Sidenotes are floated out of the measure into the margin column with a negative margin. Work cards break the measure to the right and carry their own note rail, which is why `--card-pad` and `--note-pull` exist: they keep card notes and prose notes on one vertical. Collapses to two columns under 1080px, where notes fold inline as blocks, and to one column under 720px.

Motion is entirely native scroll-driven CSS (`animation-timeline: view()` and `scroll()`), gated on `@supports` and `prefers-reduced-motion`. No JavaScript and no libraries. The only script in the file toggles case studies with a view transition and opens them before printing.

Print styles exist and must keep working, since the page doubles as the PDF source. Everything animated is reset there, and links print their full URL.

## Open questions

- Whether the header label "UX practitioner" is the right description
- Whether the Greek and English toggle from the previous version gets rebuilt
- The PDF download link is still a placeholder. LinkedIn and both case studies are live: Agent X at `https://ioanniskp.github.io/-agent-x-case-study/`, Radio at `https://ioanniskp.github.io/radio/`
- The masthead lede still describes research as habitual practice, which the Practice section contradicts by admitting one cycle. Unresolved
- Konduko is described as twelve years in the body but dated 2012 to 2025, which spans thirteen
- The Background section dates the Athens period to 2011, but the graphic design gap is stated as seventeen years. Both can be true if the last years were coordination rather than design, but the arithmetic invites a question

## Quality floor

Responsive to mobile, visible keyboard focus, reduced motion respected, prints cleanly to A4.
