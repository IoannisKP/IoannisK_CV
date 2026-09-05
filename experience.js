/* Native scrolling, restrained parallax, and an original generative point field. */
(() => {
  'use strict';
  window.initPortfolioExperience = ({ onSection }) => {
    const root = document.documentElement;
    const fine = matchMedia('(pointer: fine)');
    const hero = document.querySelector('.hero');
    const contact = document.querySelector('.contact');
    const sequence = document.querySelector('.signal-sequence');
    const scene = document.querySelector('.signal-scene');
    const canvas = document.querySelector('#signal-canvas');
    const ctx = canvas?.getContext('2d', { alpha: true });
    const words = [...document.querySelectorAll('[data-reading] > span')];
    const reading = document.querySelector('[data-reading]');
    const sections = [...document.querySelectorAll('[data-section], [data-chapter]')];
    let disposeGlass = () => {};
    import('./glass.js?v=motion-override-1').then(module => { if (!disposed) disposeGlass = module.mountGlass(); }).catch(error => console.warn('Using the still artwork.', error));
    let disposed = false, frame = 0, dirty = true, active = '', inScene = false;
    let width = 0, height = 0, lastTime = 0, clock = 0, progress = 0;
    const off = () => root.dataset.motion === 'off';
    const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));
    const smooth = n => n * n * (3 - 2 * n);
    const points = Array.from({ length: 1450 }, (_, i) => {
      const u = (i % 58) / 58 * Math.PI * 2;
      const v = Math.floor(i / 58) / 24 * Math.PI * 2;
      const rand = x => { const n = Math.sin(x * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); };
      return { u, v, x: (rand(i + 1) - .5) * 5, y: (rand(i + 350) - .5) * 3.3,
        z: (rand(i + 720) - .5) * 3, size: .65 + rand(i + 2100) * 1.1, lime: i % 11 === 0 };
    });
    function resize() {
      if (canvas && ctx) {
        width = scene.clientWidth; height = scene.clientHeight;
        const dpr = Math.min(devicePixelRatio || 1, 1.75);
        canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      invalidate();
    }
    function draw(time) {
      if (!ctx || !width) return;
      ctx.clearRect(0, 0, width, height);
      const morph = off() ? .86 : smooth(clamp(progress * 1.35));
      const angle = off() ? .3 : time * .075 + progress * .48;
      const cosine = Math.cos(angle), sine = Math.sin(angle);
      const scale = Math.min(width * .30, height * .32);
      const projected = points.map(p => {
        const r = 1.36 + .43 * Math.cos(p.v);
        const tx = r * Math.cos(p.u);
        const ty = .86 * r * Math.sin(p.u);
        const tz = .45 * Math.sin(p.v) + .13 * Math.sin(p.u * 3 + time * .3);
        let x = p.x * (1 - morph) + tx * morph;
        const y = p.y * (1 - morph) + ty * morph;
        let z = p.z * (1 - morph) + tz * morph;
        const rotateX = x * cosine + z * sine;
        z = z * cosine - x * sine;
        x = rotateX;
        const lens = 3.8 / (3.8 - z);
        return { x: width / 2 + x * scale * lens, y: height / 2 + y * scale * lens,
          r: p.size * lens, alpha: clamp(.33 + (z + 1.8) * .17, .1, .9), lime: p.lime, z };
      }).sort((a, b) => a.z - b.z);
      for (const p of projected) {
        ctx.fillStyle = p.lime ? `rgba(220,255,194,${p.alpha})` : `rgba(148,235,248,${p.alpha})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    function update() {
      const vh = innerHeight;
      root.style.setProperty('--read-progress', clamp(scrollY / Math.max(1, document.documentElement.scrollHeight - vh)));
      document.querySelector('.masthead').classList.toggle('is-scrolled', scrollY > 24);
      if (hero) hero.style.setProperty('--hero-shift', off() ? 0 : clamp(-hero.getBoundingClientRect().top / hero.offsetHeight));
      if (contact) contact.style.setProperty('--contact-shift', off() ? 0 : clamp((vh - contact.getBoundingClientRect().top) / (vh + contact.offsetHeight)));
      if (reading) {
        const rect = reading.getBoundingClientRect();
        const reveal = clamp((vh * .83 - rect.top) / (rect.height + vh * .12));
        words.forEach((word, i) => word.style.setProperty('--word-opacity', off() ? 1 : .23 + .77 * clamp(reveal * words.length - i + 1)));
      }
      if (sequence) {
        const rect = sequence.getBoundingClientRect();
        progress = clamp(-rect.top / Math.max(1, sequence.offsetHeight - vh));
        inScene = rect.top < vh && rect.bottom > 0;
        document.body.classList.toggle('in-signal', rect.top < 55 && rect.bottom > 85);
      }
      let selected = sections[0];
      for (const section of sections) if (section.getBoundingClientRect().top <= vh * .38) selected = section;
      const id = selected?.id;
      if (id && id !== active) {
        active = id; onSection(id);
        document.querySelectorAll('.case-nav a').forEach(a => {
          if (a.hash.split('/')[2] === selected.dataset.chapter) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      }
    }
    function tick(time) {
      frame = 0; if (disposed) return;
      if (dirty) { update(); dirty = false; }
      if (ctx && inScene && (time - lastTime > 30 || off())) {
        if (!off()) clock += Math.min(50, time - lastTime) / 1000;
        draw(clock); lastTime = time;
      }
      if (inScene && !off() && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function invalidate() { dirty = true; if (!frame && !disposed) frame = requestAnimationFrame(tick); }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    root.classList.add('motion-ready');
    const tilt = [];
    document.querySelectorAll('.work-link').forEach(link => {
      const art = link.querySelector('.work-art');
      const move = e => {
        if (!fine.matches || off()) return;
        const b = link.getBoundingClientRect();
        art.style.setProperty('--tilt-x', `${-(e.clientY - b.top - b.height / 2) / b.height * 5}deg`);
        art.style.setProperty('--tilt-y', `${(e.clientX - b.left - b.width / 2) / b.width * 5}deg`);
      };
      const leave = () => { art.style.setProperty('--tilt-x', '0deg'); art.style.setProperty('--tilt-y', '0deg'); };
      link.addEventListener('pointermove', move); link.addEventListener('pointerleave', leave);
      tilt.push(() => { link.removeEventListener('pointermove', move); link.removeEventListener('pointerleave', leave); });
    });
    const pointer = e => {
      if (!fine.matches || off() || !hero || scrollY > hero.offsetHeight) return;
      hero.style.setProperty('--pointer-x', (e.clientX / innerWidth - .5) * 2);
      hero.style.setProperty('--pointer-y', (e.clientY / innerHeight - .5) * 2);
    };
    const motion = () => { resize(); if (off()) { document.querySelectorAll('.work-art').forEach(el => { el.style.setProperty('--tilt-x', '0deg'); el.style.setProperty('--tilt-y', '0deg'); }); } };
    addEventListener('scroll', invalidate, { passive: true });
    addEventListener('resize', resize); addEventListener('pointermove', pointer, { passive: true });
    addEventListener('portfolio-motion', motion);
    document.addEventListener('visibilitychange', invalidate);
    const resizer = new ResizeObserver(invalidate); resizer.observe(document.querySelector('#main'));
    resize();
    return () => {
      disposed = true; disposeGlass(); cancelAnimationFrame(frame); observer.disconnect(); resizer.disconnect(); tilt.forEach(fn => fn());
      removeEventListener('scroll', invalidate); removeEventListener('resize', resize); removeEventListener('pointermove', pointer);
      removeEventListener('portfolio-motion', motion);
      document.removeEventListener('visibilitychange', invalidate); document.body.classList.remove('in-signal');
    };
  };
})();
