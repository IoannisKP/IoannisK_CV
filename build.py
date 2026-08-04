#!/usr/bin/env python3
"""Generate sv/index.html and el/index.html from index.html + i18n.json.

index.html is both the published English page and the template. Edit English
there, then run this. Nothing writes back to index.html.

Translation strings come from i18n.json, which is extracted from CV-el.md and
CV-sv.md by extract-i18n.py. Three things cannot be handled by plain string
substitution and are declared below instead: the masthead statement and the
closing statement both carry an <em> accent word, and the Greek colophon has
to name the fonts Greek actually uses.
"""

import html
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
LANGS = ('sv', 'el')

# --- the parts substitution cannot reach -------------------------------------

# Masthead. Each word is its own span for the load animation; one carries the
# accent. Which word takes the emphasis is an editorial choice, not derivable.
STATEMENT = {
    'en': '<span class="w">I</span> <span class="w">don\'t</span> '
          '<span class="w"><em>guess</em>.</span>',
    'sv': '<span class="w">Jag</span> <span class="w"><em>gissar</em></span> '
          '<span class="w">inte.</span>',
    'el': '<span class="w">Δεν</span> <span class="w"><em>μαντεύω</em>.</span>',
}

# Closing statement, with the accent word emphasised.
CLOSING = {
    'sv': 'Det produktarbete jag gillar finns i <em>detaljerna</em>: tydliga '
          'flöden, konsekventa mönster och lösningar som team faktiskt kan bygga.',
    'el': 'Μου αρέσει η δουλειά στο product που κρίνεται στις '
          '<em>λεπτομέρειες</em>: ξεκάθαρα flows, συνεπή patterns και λύσεις '
          'που οι ομάδες μπορούν πράγματι να υλοποιήσουν.',
}

# Greek renders in different typefaces, so the credit line must say so.
COLOPHON_EL = 'Με γραμματοσειρές EB Garamond, Inter &amp; Noto Sans Mono'

PDF = {'en': 'Ioannis-Koupidis-CV.pdf',
       'sv': 'Ioannis-Koupidis-CV-sv.pdf',
       'el': 'Ioannis-Koupidis-CV-el.pdf'}

# Relative hrefs differ per language because each page sits at a different depth.
HREFS = {'en': ('./', 'sv/', 'el/'),
         'sv': ('../', './', '../el/'),
         'el': ('../', '../sv/', './')}

FONTS_EL = ('<link href="https://fonts.googleapis.com/css2?'
            'family=EB+Garamond:ital,wght@0,400..800;1,400..800'
            '&family=IBM+Plex+Mono:wght@400;500'
            '&family=Inter:wght@400;500;600'
            '&family=Noto+Sans+Mono:wght@400;500&display=swap" rel="stylesheet">')

# Fraunces and IBM Plex Mono have no Greek glyphs. Verified against Google
# Fonts: neither ships a greek subset, while Inter and EB Garamond both do.
# EB Garamond draws lighter than Fraunces, so weights are lifted to hold a
# comparable ink density.
STYLE_EL = """
<style>
  /* Greek typeface substitutions. See CLAUDE.md. */
  .display,h2.section,.work h3,.metric b,.note,.pullquote .display,.statement em,
  .pullquote em{
    font-family:'EB Garamond',Georgia,serif;
    font-variation-settings:normal;
    font-weight:575;
  }
  .metric b{font-weight:620;}
  .statement{letter-spacing:-0.01em;}

  .eyebrow,.masthead .name,.meta,.tag,.pair span:last-child,.aside,.ref,
  .colophon,.study summary,.full-link a,.cta,.pairs-label,.detail-body h4,
  .langs,.note::before,.work::before{
    font-family:'Noto Sans Mono',ui-monospace,monospace;
  }
</style>
"""


def langs_block(lang):
    en, sv, el = HREFS[lang]
    def a(code, href, hreflang):
        cur = ' aria-current="page"' if code.lower() == lang else ''
        return f'<a href="{href}" hreflang="{hreflang}"{cur}>{code}</a>'
    sep = '<span class="sep" aria-hidden="true">/</span>'
    return ('<span class="langs" role="group" aria-label="Language">'
            + a('EN', en, 'en') + sep + a('SV', sv, 'sv') + sep
            + a('EL', el, 'el') + '</span>')


def alternates(lang):
    en, sv, el = HREFS[lang]
    return ('\n<link rel="alternate" hreflang="en" href="%s">'
            '\n<link rel="alternate" hreflang="sv" href="%s">'
            '\n<link rel="alternate" hreflang="el" href="%s">' % (en, sv, el))


def translate_text_nodes(src, table, lang):
    """Replace whole text nodes whose trimmed content matches a known string.

    Whole-node matching only: a partial match would corrupt strings that happen
    to contain a shorter one.
    """
    parts = re.split(r'(<[^>]+>)', src)
    hits = 0
    for i, part in enumerate(parts):
        if part.startswith('<') or not part.strip():
            continue
        stripped = part.strip()
        key = html.unescape(stripped)
        entry = table.get(key)
        if entry and entry.get(lang):
            parts[i] = part.replace(stripped, html.escape(entry[lang], quote=False), 1)
            hits += 1
    return ''.join(parts), hits


def build(lang, table):
    src = open(os.path.join(HERE, 'index.html'), encoding='utf-8').read()

    out, hits = translate_text_nodes(src, table, lang)

    # statement and closing statement carry inline emphasis
    out = re.sub(r'(<h1 class="display statement">).*?(</h1>)',
                 lambda m: m.group(1) + STATEMENT[lang] + m.group(2), out, flags=re.S)
    out = re.sub(r'(<blockquote class="pullquote">\s*<p class="display">).*?(</p>)',
                 lambda m: m.group(1) + CLOSING[lang] + m.group(2), out, flags=re.S)

    # switcher, in both the masthead and the footer
    out = re.sub(r'<!--LANGS-->.*?<!--/LANGS-->',
                 lambda m: '<!--LANGS-->' + langs_block(lang) + '<!--/LANGS-->',
                 out, flags=re.S)

    out = out.replace('<html lang="en">', '<html lang="%s">' % lang)
    out = out.replace('href="%s"' % PDF['en'], 'href="%s"' % PDF[lang])

    if lang == 'el':
        out = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?[^"]*" rel="stylesheet">',
                     FONTS_EL, out)
        out = out.replace('</head>', STYLE_EL + '</head>')
        out = re.sub(r'(<p class="colophon">).*?(</p>)',
                     lambda m: m.group(1) + COLOPHON_EL + m.group(2), out)

    out = out.replace('</head>', alternates(lang) + '\n</head>')

    d = os.path.join(HERE, lang)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(out)
    return hits


def main():
    table = json.load(open(os.path.join(HERE, 'i18n.json'), encoding='utf-8'))

    # the role label is its own element, so derive it from the full name line
    full = 'Ioannis Koupidis · UX research & product'
    prefix = 'Ioannis Koupidis · '
    if full in table:
        table['UX research & product'] = {
            l: table[full][l][len(prefix):] for l in LANGS
        }

    total = len(table)
    for lang in LANGS:
        hits = build(lang, table)
        print('%s/index.html  %d strings replaced (of %d known)' % (lang, hits, total))
    print('English page untouched.')


if __name__ == '__main__':
    sys.exit(main())
