# CV — Ioannis Koupidis

A single-page CV, static, no framework and no build dependencies beyond Python
and Chrome. Published on GitHub Pages in three languages:

| | Page | PDF |
|---|---|---|
| English | `/` | `Ioannis-Koupidis-CV.pdf` |
| Swedish | `/sv/` | `sv/Ioannis-Koupidis-CV-sv.pdf` |
| Greek | `/el/` | `el/Ioannis-Koupidis-CV-el.pdf` |

## Editing

`index.html` is both the English page and the template for the other two. It
holds the markup, all the CSS and the one small script.

**Edit English in `index.html`, then run:**

```
./make-pdf.command
```

That regenerates `sv/index.html` and `el/index.html` from `i18n.json`, then
prints all three PDFs. Skipping it leaves the translations and every PDF stale.

`sv/` and `el/` are generated. Editing them by hand is pointless — the next
build overwrites your changes.

## Translations

`CV-el.md` and `CV-sv.md` are the human-readable record: every string with its
English source above the translation, plus the translator's notes on wording
choices. `i18n.json` is the machine-readable version the build actually reads.

To change a translation, edit the `.md` file, regenerate the JSON with
`python3 extract-i18n.py`, then run `./make-pdf.command`.

## Notes

Greek uses different typefaces because Fraunces and IBM Plex Mono ship no Greek
glyphs: the build substitutes EB Garamond and Noto Sans Mono for that language
only.

Motion is native scroll-driven CSS with no JavaScript. The language switcher is
three ordinary links, so it works with scripting disabled.
