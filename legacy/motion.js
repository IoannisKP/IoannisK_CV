/* Resolve the device default once, with an explicit visitor choice taking priority. */
(() => {
  'use strict';
  const root = document.documentElement;
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  let choice = null;
  try {
    const stored = localStorage.getItem('portfolio-motion');
    if (stored === 'on' || stored === 'off') choice = stored;
  } catch {}
  const isOff = () => root.dataset.motion === 'off';
  function apply() {
    root.dataset.motion = choice || (system.matches ? 'off' : 'on');
    window.dispatchEvent(new Event('portfolio-motion'));
  }
  window.portfolioMotion = {
    isOff,
    toggle() {
      choice = isOff() ? 'on' : 'off';
      try { localStorage.setItem('portfolio-motion', choice); } catch {}
      apply();
    }
  };
  system.addEventListener('change', () => { if (choice === null) apply(); });
  apply();
})();
