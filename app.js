import { person, experience, education, projects } from "./data.js";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.body.dataset.root || "./";
const page = document.body.dataset.page || "home";
const project = projects.find((p) => p.id === document.body.dataset.project);
const esc = (v = "") =>
  String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const path = (p = "") => root + p;
const projectURL = (id) => path(`work/${id}/`);
const arrow = '<span aria-hidden="true">↗</span>';
const decisions = {
  hiroom: {
    title: "Making room booking easier at Hyper Island.",
    decision:
      "Prioritize visible availability, room capacity and booking edits before adding more features.",
    evidence: "10 participants completed moderated booking tasks.",
    kind: "Discovery & prioritization",
  },
  scribe: {
    title: "A meeting recorder built around recoverable files.",
    decision:
      "Protect saved audio independently of transcription, and verify the files people actually receive.",
    evidence:
      "Manual checks found four defects despite 283 passing tests in a documented snapshot.",
    kind: "Scope & delivery",
  },
  "pm-compass": {
    title: "Helping a product manager decide what comes next.",
    decision:
      "Organize guidance around five practical jobs and defer AI features that add unnecessary complexity.",
    evidence:
      "A private, ongoing product; public adoption has not been validated.",
    kind: "Strategy & product structure",
  },
  "agent-x": {
    title: "Helping new players find their footing.",
    decision:
      "Explore guidance that supports learning without removing the challenge of the game.",
    evidence:
      "Research and wireframe evaluation informed an onboarding concept.",
    kind: "UX research",
  },
  "tedx-circles": {
    title: "Keeping the conversation going between events.",
    decision:
      "Propose small, recurring discussions that can be tested with a limited pilot.",
    evidence:
      "A student concept and pitch; participation and retention remain untested.",
    kind: "Concept validation",
  },
  radio: {
    title: "Testing a focused listening experience on a real device.",
    decision:
      "Keep the scope narrow and separate implementation, independent review and device testing.",
    evidence:
      "A physical iPhone exposed a network failure that the simulator missed.",
    kind: "Product execution",
  },
};
function header() {
  const nav = [
    ["Home", path(""), "home"],
    ["Work", path("") + "#work", "work"],
    ["About", path("about/"), "about"],
    ["CV", path("cv/"), "cv"],
  ];
  return `<header class="header" id="top"><div class="wrap header-inner"><a class="skip-link" href="#main">Skip to content</a><a class="wordmark" href="${path("")}">Ioannis Koupidis<span>Stockholm, Sweden</span></a><button class="menu-toggle btn btn--secondary" type="button" aria-expanded="false" aria-controls="main-navigation">Menu</button><nav id="main-navigation" aria-label="Main navigation">${nav.map(([label, href, key]) => `<a href="${href}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}<a class="btn btn--primary" href="mailto:${person.email}">Contact me ${arrow}</a></nav></div></header>`;
}
function footer() {
  return `<footer class="footer" id="contact"><div class="wrap"><div class="footer-heading"><p class="eyebrow">Contact</p><h2>Let’s talk<br>about product work.</h2><p>I’m based in Stockholm and open to product opportunities.</p><a class="contact-email" href="mailto:${person.email}">${person.email} ${arrow}</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Ioannis Koupidis</span><div><a href="${person.linkedin}" target="_blank" rel="noopener">LinkedIn ${arrow}</a><a href="${person.github}" target="_blank" rel="noopener">GitHub ${arrow}</a><a href="${path("cv/")}">View CV ${arrow}</a><a href="#top">Back to top ↑</a></div></div></div></footer>`;
}
function projectArt(p) {
  if (p.id === "hiroom")
    return `<div class="project-art art-hiroom"><img src="${path("assets/hiroom/hiroom-02-availability.svg")}" alt="HIRoom prototype availability grid showing room capacity and booking times" loading="lazy" width="1440" height="1024"></div>`;
  if (p.id === "scribe")
    return `<div class="project-art art-scribe"><img src="${path("assets/scribe/scribe-recording.webp")}" alt="Scribe recording interface with audio sources, transcription settings and recording controls" loading="lazy" width="1200" height="945"></div>`;
  return `<div class="project-art art-compass"><div class="architecture"><p>PM Compass</p><h3>Return to the work.</h3><ol><li><span>01</span> Today <small>Resume a project</small></li><li><span>02</span> Help Me <small>Handle a situation</small></li><li><span>03</span> Guides <small>Complete a task</small></li><li><span>04</span> Library <small>Recall a concept</small></li><li><span>05</span> Projects <small>Recover a decision</small></li></ol><p class="architecture-note">Product structure · private project</p></div></div>`;
}
function feature(p, i) {
  const d = decisions[p.id];
  return `<article class="featured-project" id="featured-${p.id}"><div class="project-copy"><p class="eyebrow">0${i + 1} / ${d.kind}</p><h3><a href="${projectURL(p.id)}">${p.title} ${arrow}</a></h3><p class="project-title">${d.title}</p><p class="project-role">${esc(p.role)}</p><div class="decision"><span class="eyebrow">A key decision</span><p>${d.decision}</p></div><div class="project-bottom"><span class="status">${esc(p.status)}</span><a class="link" href="${projectURL(p.id)}">Read the case study ${arrow}</a></div></div><a class="project-image m-zoom" href="${projectURL(p.id)}" aria-label="Read the ${p.title} case study">${projectArt(p)}</a></article>`;
}
function home() {
  const featured = ["hiroom", "scribe", "pm-compass"].map((id) =>
    projects.find((p) => p.id === id),
  );
  const other = ["agent-x", "tedx-circles", "radio"].map((id) =>
    projects.find((p) => p.id === id),
  );
  return `<main id="main" tabindex="-1"><section class="home-hero hero" data-enter><div class="wrap hero-grid"><div class="hero-text"><p class="eyebrow">Founder · Product management · Stockholm</p><h1>Ioannis<br>Koupidis.</h1><p class="hero-lead">Bringing business experience<br>to digital product decisions.</p><p class="hero-description">I spent 13 years building healthcare services in Sweden. Now I’m studying Product Management at Hyper Island and applying that experience to research, prioritization and hands-on product work.</p><div class="btn-row"><a class="btn btn--primary" href="#work">Explore my work ↓</a><a class="btn btn--secondary" href="${path("cv/")}">View CV ${arrow}</a></div></div><div class="hero-work" data-enter-media><p class="eyebrow">Selected work / HIRoom</p><a class="hero-work-image m-zoom" href="${projectURL("hiroom")}" aria-label="Read the HIRoom case study"><img src="${path("assets/hiroom/hiroom-01-home.svg")}" alt="HIRoom prototype homepage with date selection and upcoming bookings" width="1440" height="1024" fetchpriority="high"></a><a class="link" href="${projectURL("hiroom")}">From research to product priorities ${arrow}</a></div></div></section>
 <div class="experience-band"><div class="wrap experience-grid"><div><span class="eyebrow">Business ownership</span><p>Founder, Konduko AB<br><span>Healthcare services · 2012–2025</span></p></div><div><span class="eyebrow">Current focus</span><p>Product Management<br><span>Hyper Island · Stockholm</span></p></div><div><span class="eyebrow">Practical experience</span><p>Research, scope and delivery<br><span>From interviews to working builds</span></p></div></div></div>
 <section class="selected-work wrap" id="work"><div class="section-heading"><p class="eyebrow">Selected work</p><h2>Problems, decisions<br>and what I learned.</h2><p>Three projects across discovery, delivery and product strategy. Each explains my contribution and the evidence behind the work.</p></div>${featured.map(feature).join("")}</section>
 <section class="further-work"><div class="wrap"><div class="section-heading compact"><p class="eyebrow">Further work</p><h2>Other questions I’ve explored.</h2></div><div class="secondary-grid">${other.map((p) => `<article class="secondary-project card"><p class="eyebrow">${decisions[p.id].kind}</p><h3><a href="${projectURL(p.id)}">${p.title} ${arrow}</a></h3><p>${decisions[p.id].title}</p><span class="status">${esc(p.status)}</span><a class="link" href="${projectURL(p.id)}">Read the case study ${arrow}</a></article>`).join("")}</div></div></section>
 <section class="home-story wrap"><p class="eyebrow">My background</p><div><h2>Years of decisions<br>with people depending on them.</h2><p>I started in graphic design, then founded and ran businesses in Sweden. Healthcare operations meant balancing people’s needs, contracts, schedules and reliability every day.</p><p>Product management brings that experience into a new setting. I’m learning to connect user research with priorities, build what is needed and test whether it works.</p><a class="link" href="${path("about/")}">Read my background ${arrow}</a></div></section></main>`;
}
function about() {
  return `<main id="main" tabindex="-1"><section data-enter class="hero page-hero about-hero"><span class="eyebrow">ABOUT / BACKGROUND</span><h1>Design, operations<br>and product management.</h1><div class="hero page-hero-bottom"><p>I'm Ioannis Koupidis, a founder, former creative professional and current Product Management student in Stockholm.</p><span class="eyebrow">DESIGN × OPERATIONS × PRODUCT</span></div></section><section class="story-body section-pad"><div class="story-split"><div class="eyebrow">THE SHORT VERSION <span class="accent-asterisk">✳</span></div><div class="story-prose"><p class="story-lead">I have spent much of my working life turning complicated needs into services that people can depend on.</p><p>I started in design, moved into entrepreneurship and spent 13 years building healthcare services in Sweden. That meant contracts, schedules, changing needs and decisions where reliability mattered, not just a good presentation.</p><p>Today I'm studying Product Management at Hyper Island, following UX Design studies at Medieinstitutet. I'm learning to bring user research, product decisions, prototyping and testing into digital products.</p><p>What interests me most hasn't changed: understand the problem before deciding what to build.</p></div></div></section><section class="learning-section section-pad"><div class="section-intro"><span class="eyebrow">WORKING TOGETHER</span><div><h2>How I work with a team.</h2><p>During my studies, I've reflected on moments when I moved too quickly toward a solution. I've learned to make more space for other perspectives, test assumptions and help a team reach a better decision, not simply defend my first idea.</p></div></div><div class="learning-three"><article><span>01 /</span><h3>Stay curious.</h3><p>Ask what people are actually trying to achieve, not only which feature they say they want.</p></article><article><span>02 /</span><h3>Make choices visible.</h3><p>Connect priorities to evidence, trade-offs and the constraints that shaped them.</p></article><article><span>03 /</span><h3>Test what matters.</h3><p>Measure the real outcome, including the things a passing test or pretty prototype can miss.</p></article></div></section><section class="section-pad timeline-section"><div class="section-heading-row"><span class="eyebrow">THE PATH SO FAR</span><h2>Experience<span class="heading-mark">↙</span></h2></div><div class="timeline">${experience.map((e) => `<article class="timeline-item"><div class="tl-years">${esc(e.years)}</div><div class="tl-content"><h3>${esc(e.company)}</h3><span class="role">${esc(e.role)}</span><p>${esc(e.details)}</p>${e.evidence ? `<div class="evidence-chips">${e.evidence.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}${e.note ? `<p class="evidence-note">${esc(e.note)}</p>` : ""}</div></article>`).join("")}</div></section><section class="section-pad education-section"><div class="section-heading-row"><span class="eyebrow">LEARNING</span><h2>Education<span class="heading-mark">↙</span></h2></div><div class="timeline">${education.map((e) => `<article class="timeline-item"><div class="tl-years">${esc(e.years)}</div><div class="tl-content"><h3>${esc(e.subject)}</h3><span class="role">${esc(e.school)}</span></div></article>`).join("")}</div><div class="language-bar"><span class="eyebrow">LANGUAGES</span><span>Greek / Native</span><span>Swedish / Fluent</span><span>English / Fluent</span><span>German / Basic</span></div></section></main>`;
}
function cv() {
  return `<main id="main" tabindex="-1"><section data-enter class="hero page-hero cv-hero"><span class="eyebrow">CURRICULUM VITAE / 2026</span><h1>Experience for<br>product work.</h1><div class="hero page-hero-bottom"><p>Founder & Product Management student · Stockholm, Sweden</p><a class="download-btn" href="${path('assets/cv/Ioannis-Koupidis-CV.pdf')}" target="_blank" rel="noopener">Download PDF <span>↓</span></a></div></section><div class="cv-paper"><section class="cv-contact"><div><span class="eyebrow">IOANNIS KOUPIDIS</span><h2>Founder · Product Management</h2><p>Combining 13 years of healthcare service experience in Sweden with user research, product scoping and hands-on AI-assisted development.</p></div><div class="cv-contact-links"><a href="mailto:${person.email}">${person.email}</a><a href="${person.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a><a href="${person.github}" target="_blank" rel="noopener">GitHub ↗</a><span>Stockholm, Sweden</span></div></section><section class="cv-block"><h3>Experience</h3><div>${experience.map((e) => `<div class="cv-entry"><div><strong>${esc(e.role)}</strong><span>${esc(e.company)}</span><p>${esc(e.details)}</p>${e.note ? `<small>${esc(e.note)}</small>` : ""}</div><span class="cv-date">${esc(e.years)}</span></div>`).join("")}</div></section><section class="cv-block"><h3>Selected product projects</h3><div>${projects
    .slice(0, 4)
    .map(
      (p) =>
        `<div class="cv-entry"><div><a href="${projectURL(p.id)}"><strong>${esc(p.title)} ↗</strong></a><span>${esc(p.eyebrow)}</span><p>${esc(p.teaser)}</p></div><span class="cv-date">${esc(p.year)}</span></div>`,
    )
    .join(
      "",
    )}</div></section><section class="cv-block"><h3>Education</h3><div>${education.map((e) => `<div class="cv-entry compact"><div><strong>${esc(e.subject)}</strong><span>${esc(e.school)}</span></div><span class="cv-date">${esc(e.years)}</span></div>`).join("")}</div></section><section class="cv-block"><h3>Capabilities</h3><p>User research and synthesis · Problem framing · Product scoping and acceptance criteria · Stakeholder coordination · Workflow design · Figma wireframes · Lovable prototypes · AI-assisted development and manual verification · Service operations</p></section><section class="cv-block"><h3>Languages</h3><p>Greek (native) · Swedish (fluent) · English (fluent) · German (basic)</p></section></div><section class="cv-after"><p>This page gives the longer picture. The downloadable PDF is the concise resume supplied with the original CV. Projects can also be explored in depth.</p><a href="${path("")}#work" class="text-link">Browse case studies ↗</a></section></main>`;
}

function artifact(src, alt) {
  return `<div class="case-artifact"><img src="${path(src)}" alt="${esc(alt)}" loading="lazy"></div>`;
}
function chapterArtifact(p, i) {
  if (p.id === "hiroom") {
    const shots = {
      1: [
        "hiroom-01-home.svg",
        "HIRoom prototype homepage used in discovery and testing",
      ],
      2: [
        "hiroom-02-availability.svg",
        "Room availability grid displaying times and room capacities",
      ],
      3: [
        "hiroom-03-invite.svg",
        "Prototype invitation flow with teammate email addresses blurred",
      ],
      4: ["hiroom-04-confirm.svg", "Prototype booking confirmation"],
      5: [
        "hiroom-05-bookings.svg",
        "Prototype view for managing upcoming bookings",
      ],
    };
    return shots[i]
      ? artifact("assets/hiroom/" + shots[i][0], shots[i][1])
      : "";
  }
  if (p.id === "scribe" && i === 1)
    return artifact(
      "assets/scribe/scribe-recording.webp",
      "Scribe recording settings for audio sources and local transcription",
    );
  if (p.id === "scribe" && i === 3)
    return artifact(
      "assets/scribe/scribe-library.webp",
      "Scribe session library empty state",
    );
  if (p.id === "radio" && i === 3)
    return artifact(
      "assets/radio/player.jpg",
      "Radio application player interface",
    );
  return "";
}
function chapterMarkup(c, i, p) {
  return `<section class="chapter" id="chapter-${i + 1}" data-chapter="${i + 1}"><p class="chapter-num">${String(i + 1).padStart(2, "0")} / ${esc(c.label)}</p><h2>${esc(c.title)}</h2>${c.body.map((t) => `<p>${esc(t)}</p>`).join("")}${c.take ? `<div class="chapter-insight"><span class="eyebrow">The takeaway</span><p>${esc(c.take)}</p></div>` : ""}${chapterArtifact(p, i)}</section>`;
}
function shortMarkup(c, i) {
  return `<section class="chapter" id="chapter-${i + 1}" data-chapter="${i + 1}"><p class="chapter-num">${String(i + 1).padStart(2, "0")} / ${esc(c.label)}</p><h2>${esc(c.title)}</h2><p>${esc(c.body)}</p></section>`;
}
function chapters(p, mode) {
  return (mode === "full" ? p.chapters : p.short)
    .map((c, i) =>
      mode === "full" ? chapterMarkup(c, i, p) : shortMarkup(c, i),
    )
    .join("");
}
function caseStudy(p) {
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const mode =
    new URLSearchParams(location.search).get("view") === "tldr"
      ? "tldr"
      : "full";
  const d = decisions[p.id];
  return `<main class="case-page" id="main" tabindex="-1" data-current-mode="${mode}"><section class="hero case-hero wrap" data-enter><a class="link" href="${path("")}#work">← All work</a><p class="eyebrow">${esc(p.eyebrow)}</p><h1>${esc(p.title)}</h1><p class="case-subtitle">${d.title}</p><dl class="case-meta"><div><dt>My contribution</dt><dd>${esc(p.role)}</dd></div><div><dt>Context</dt><dd>${esc(p.status)}</dd></div><div><dt>Year</dt><dd>${esc(p.year)}</dd></div></dl><div class="case-summary"><div><h2>The problem</h2><p>${esc(p.short[0].body)}</p></div><div><h2>A key decision</h2><p>${d.decision}</p></div><div><h2>What the evidence shows</h2><p>${d.evidence}</p></div></div>${p.links.length ? `<div class="case-actions">${p.links.map((l) => `<a class="link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${arrow}</a>`).join("")}</div>` : ""}</section>
 <div class="case-reading wrap"><aside class="case-sidebar"><p class="eyebrow">Reading options</p><div class="mode-control" role="group" aria-label="Case study reading mode"><button type="button" class="mode-button" data-mode="full" aria-pressed="${mode === "full"}">Full</button><button type="button" class="mode-button" data-mode="tldr" aria-pressed="${mode === "tldr"}">TL;DR</button></div><p class="reading-estimate" aria-live="polite"></p><nav class="chapter-nav" aria-label="Case study chapters"></nav></aside><div class="case-main"><div id="chapter-container">${chapters(p, mode)}</div><div class="case-end"><p class="eyebrow">Next project</p><a href="${projectURL(next.id)}">${next.title} ${arrow}</a></div></div></div></main>`;
}
$("#app").innerHTML =
  header() +
  (page === "home"
    ? home()
    : page === "about"
      ? about()
      : page === "cv"
        ? cv()
        : page === "case" && project
          ? caseStudy(project)
          : '<main id="main"><h1>Page not found</h1></main>') +
  footer();

function setupMenu() {
  const button = $(".menu-toggle"),
    nav = $("#main-navigation"),
    mobile = matchMedia("(max-width: 760px)");
  const setOpen = (open, restore = false) => {
    document.body.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? "Close" : "Menu";
    nav.inert = mobile.matches && !open;
    $("main").inert = mobile.matches && open;
    $(".footer").inert = mobile.matches && open;
    if (restore) button.focus();
  };
  button.addEventListener("click", () =>
    setOpen(button.getAttribute("aria-expanded") !== "true"),
  );
  $$("a", nav).forEach((a) =>
    a.addEventListener("click", () => setOpen(false)),
  );
  document.addEventListener("keydown", (e) => {
    if (!document.body.classList.contains("menu-open")) return;
    if (e.key === "Escape") {
      setOpen(false, true);
      return;
    }
    if (e.key === "Tab") {
      const items = [button, ...$$("a", nav)],
        first = items[0],
        last = items.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  mobile.addEventListener("change", () => setOpen(false));
  setOpen(false);
}
function setupCase() {
  if (page !== "case" || !project) return;
  const container = $("#chapter-container"),
    nav = $(".chapter-nav");
  let mode = $(".case-page").dataset.currentMode;
  function refresh() {
    const labels = mode === "full" ? project.chapters : project.short;
    nav.innerHTML = labels
      .map(
        (c, i) =>
          `<a href="#chapter-${i + 1}">${String(i + 1).padStart(2, "0")} <span>${esc(c.label)}</span></a>`,
      )
      .join("");
    const words = ($(".case-summary").textContent + " " + container.textContent)
      .trim()
      .split(/\s+/).length;
    $(".reading-estimate").textContent =
      `${Math.max(1, Math.ceil(words / 220))} min read`;
  }
  $$(".mode-button").forEach((button) =>
    button.addEventListener("click", () => {
      if (button.dataset.mode === mode) return;
      mode = button.dataset.mode;
      $(".case-page").dataset.currentMode = mode;
      container.innerHTML = chapters(project, mode);
      $$(".mode-button").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.mode === mode)),
      );
      const url = new URL(location.href);
      if (mode === "tldr") url.searchParams.set("view", "tldr");
      else url.searchParams.delete("view");
      url.hash = "";
      history.replaceState(null, "", url.pathname + url.search);
      refresh();
    }),
  );
  refresh();
}
setupMenu();
setupCase();
// Load the shared entrance and interaction layer after the page markup exists.
import("./assets/taste-motion/motion.js");
