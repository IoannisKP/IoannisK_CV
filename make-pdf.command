#!/bin/zsh
# Double-click to regenerate the CV PDF from index.html.
# The page is its own print source: the @media print block collapses the
# three-column editorial grid into a single-column A4 layout.
cd "$(dirname "$0")"

chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=20000 \
  --print-to-pdf="Ioannis-Koupidis-CV.pdf" \
  "file://$PWD/index.html" \
  && echo "Done: Ioannis-Koupidis-CV.pdf updated." \
  || echo "Something went wrong. Is Google Chrome installed in /Applications?"
