# CV project

Personal CV site for Ioannis Koupidis. Single-page, static. `index.html` is the whole thing: markup, CSS and any script live in that one file.

## Who this is for

Ioannis is moving into junior UX, product design, UX research and junior product management. He is between Athens and Stockholm and will relocate to whichever produces a job. Greek native, English and Swedish fluent.

Career shape: 13 years in visual communication in Athens (1998 to 2011), then 12 years founding and running Konduko AB, a healthcare staffing company (2012 to 2025), plus NiyaCare Stockholm AB (2011 onward). UX qualification at Medieinstitutet Stockholm, 2026.

## Positioning decisions already made

Do not undo these without asking.

- **UX work leads.** The two case studies, Agent X and Radio, come first. Everything else supports them.
- **Graphic design is background, not a selling point.** He has not worked as a graphic designer in over 20 years and does not want to be hired for it. The Background section says so explicitly. Keep that line.
- **No overclaiming.** He has never worked professionally as a UX designer. Agent X was a student project done with teacher guidance. Any sentence implying professional UX experience or independent seniority is wrong and must be fixed. This is the single most important rule in this file.
- **Hyper Island is removed.** He was accepted to the Product Manager programme starting August 2026 and decided not to attend. Any reference to it is stale.
- **Radio is labelled a personal project.** He directed and audited an AI-assisted iOS build in a day without writing code. The point of the piece is specifying, questioning and testing, which is product management work.
- The SEK 1.5B framework-value figure was removed from the Konduko block as a deliberate choice.

## Voice

Plain, direct prose. No flourishes, no marketing language, no em dashes. Short declarative sentences. Where a claim could be challenged in an interview, state the limit rather than hiding it.

## Design system

Keep these. The typefaces in particular are a settled preference.

- **Fraunces** for display: name statement, section heads, metric numerals
- **Inter** for body, 15.5px, line height 1.62
- **IBM Plex Mono** for eyebrows, labels, dates, uppercase with wide tracking

Tokens are CSS variables at the top of `index.html`:
`--paper:#EDEFF1` `--surface:#FFFFFF` `--ink:#141A1F` `--muted:#5C6771`
`--faint:#8C979F` `--rule:#D6DCE0` `--accent:#2E5E4E` `--measure:38rem`

Layout is a two-column grid: a 9rem left spine holding sticky mono section labels, and a content column capped at `--measure`. Collapses to one column under 720px. Print styles exist and should keep working, since the page doubles as the PDF source.

## Open questions

- Whether the header label "UX practitioner" is the right description
- Whether the Greek and English toggle from the previous version gets rebuilt
- Case study links and the LinkedIn and PDF links are placeholders

## Quality floor

Responsive to mobile, visible keyboard focus, reduced motion respected, prints cleanly to A4.
