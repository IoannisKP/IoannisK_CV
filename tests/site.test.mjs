import { parseHTML } from "linkedom";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
const root = path.resolve(process.argv[2] || ".");
const data = fs
  .readFileSync(path.join(root, "data.js"), "utf8")
  .replaceAll("export const ", "const ");
const app = fs
  .readFileSync(path.join(root, "app.js"), "utf8")
  .replace(/^import .*?;\n/, "")
  .replace(/import\(['"]\.\/assets\/taste-motion\/motion\.js['"]\);/, "");
const files = [
  "index.html",
  "about/index.html",
  "cv/index.html",
  ...["hiroom", "scribe", "pm-compass", "agent-x", "radio", "tedx-circles"].map(
    (id) => `work/${id}/index.html`,
  ),
];
let count = 0;
for (const file of files) {
  for (const mobile of [false, true]) {
    const { window } = parseHTML(
      fs.readFileSync(path.join(root, file), "utf8"),
    );
    const media = { matches: mobile, addEventListener() {} };
    const ctx = {
      document: window.document,
      window,
      URL,
      URLSearchParams,
      location: new URL(`https://example.test/CV-Port-IK/${file}`),
      history: {
        replaceState(...args) {
          ctx.lastURL = args[2];
        },
      },
      matchMedia: () => media,
    };
    vm.createContext(ctx);
    vm.runInContext(data + "\n" + app, ctx);
    const doc = window.document;
    assert.equal(doc.querySelectorAll("main").length, 1, file);
    assert.equal(doc.querySelectorAll("h1").length, 1, file);
    const ids = [...doc.querySelectorAll("[id]")].map((e) => e.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate IDs " + file);
    for (const img of doc.querySelectorAll("img")) {
      assert(img.getAttribute("alt"), "image alt " + file);
      const src = img.getAttribute("src");
      if (!/^https?:/.test(src))
        assert(
          fs.existsSync(path.resolve(root, path.dirname(file), src)),
          "missing asset " + src,
        );
    }
    for (const a of doc.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href");
      if (href.startsWith("#"))
        assert(doc.querySelector(href), "missing anchor " + href);
      else if (!/^(https?:|mailto:)/.test(href)) {
        const target = href.split("#")[0].split("?")[0];
        let resolved = path.resolve(root, path.dirname(file), target);
        if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory())
          resolved = path.join(resolved, "index.html");
        assert(fs.existsSync(resolved), "missing link " + href);
      }
    }
    if (file === "index.html") {
      assert.equal(doc.querySelectorAll(".featured-project").length, 3);
      assert.equal(doc.querySelectorAll(".secondary-project").length, 3);
    }
    const menu = doc.querySelector(".menu-toggle"),
      nav = doc.querySelector("#main-navigation");
    menu.dispatchEvent(new window.Event("click"));
    assert.equal(menu.getAttribute("aria-expanded"), "true");
    nav.querySelector("a").dispatchEvent(new window.Event("click"));
    assert.equal(menu.getAttribute("aria-expanded"), "false");
    assert.equal(nav.inert, mobile);
    if (file.startsWith("work/")) {
      const full = doc.querySelectorAll(".chapter").length;
      assert(full >= 4);
      doc
        .querySelector('[data-mode="tldr"]')
        .dispatchEvent(new window.Event("click"));
      assert.equal(doc.querySelectorAll(".chapter").length, 4);
      assert.equal(doc.querySelectorAll(".chapter-nav a").length, 4);
      assert.equal(
        doc.querySelector('[data-mode="tldr"]').getAttribute("aria-pressed"),
        "true",
      );
      assert(ctx.lastURL.endsWith("?view=tldr"));
      doc
        .querySelector('[data-mode="full"]')
        .dispatchEvent(new window.Event("click"));
      assert.equal(doc.querySelectorAll(".chapter").length, full);
      assert(!ctx.lastURL.includes("view=tldr"));
    }

    count++;
  }
}
console.log(
  `PASS: ${count} page/menu contexts (DOM simulation, not browser layout); headings, IDs, links, images, project counts, menu state and all reading-mode transitions.`,
);
