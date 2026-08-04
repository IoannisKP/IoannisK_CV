#!/usr/bin/env python3
"""Build i18n.json from CV-el.md and CV-sv.md.

The two markdown files are the human-readable record: every string appears with
its English source above the translation. This turns them into the keyed JSON
that build.py consumes.

Run after editing either markdown file, then run make-pdf.command.
"""

import collections
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCES = (('CV-el.md', 'Greek', 'el'), ('CV-sv.md', 'Swedish', 'sv'))


def parse(filename, heading):
    text = open(os.path.join(HERE, filename), encoding='utf-8').read()
    text = text.split('## Rhetorical line options')[0]      # drop the notes tail
    pattern = re.compile(
        r'\*\*English source[^\n]*\*\*\n> (.+?)\n\n\*\*' + heading + r'[^\n]*\*\*\n> (.+?)\n',
        re.S)
    return [(en.strip(), tr.strip()) for en, tr in pattern.findall(text)]


def main():
    parsed = {code: parse(f, h) for f, h, code in SOURCES}
    counts = {c: len(p) for c, p in parsed.items()}
    print('parsed:', counts)

    codes = list(parsed)
    if len({len(p) for p in parsed.values()}) != 1:
        print('ERROR: files disagree on how many strings exist.', file=sys.stderr)
        return 1

    # the files must describe the same English strings in the same order
    a, b = parsed[codes[0]], parsed[codes[1]]
    drift = [(i, x[0], y[0]) for i, (x, y) in enumerate(zip(a, b)) if x[0] != y[0]]
    if drift:
        print('ERROR: %d English sources differ between the two files.' % len(drift),
              file=sys.stderr)
        for i, x, y in drift[:5]:
            print('  #%d\n    %s: %r\n    %s: %r' % (i, codes[0], x[:60], codes[1], y[:60]),
                  file=sys.stderr)
        return 1

    # a repeated English string must not have been translated two different ways
    failed = False
    for code, pairs in parsed.items():
        seen = collections.defaultdict(set)
        for en, tr in pairs:
            seen[en].add(tr)
        for en, translations in seen.items():
            if len(translations) > 1:
                failed = True
                print('ERROR: %s translates %r inconsistently: %s'
                      % (code, en[:50], sorted(t[:40] for t in translations)), file=sys.stderr)
    if failed:
        return 1

    table = {}
    for code, pairs in parsed.items():
        for en, tr in pairs:
            table.setdefault(en, {})[code] = tr

    out = os.path.join(HERE, 'i18n.json')
    json.dump(table, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('wrote i18n.json with %d unique strings' % len(table))
    return 0


if __name__ == '__main__':
    sys.exit(main())
