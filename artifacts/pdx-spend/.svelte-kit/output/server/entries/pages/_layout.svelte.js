import { a as attr, e as escape_html, b as attr_class, s as stringify, h as head } from "../../chunks/root.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
function Masthead($$renderer) {
  let menuOpen = false;
  $$renderer.push(`<header class="masthead"><div class="container masthead-inner"><a class="brand"${attr("href", `${stringify(base)}/`)}>PDX <span class="dot">·</span> Spend</a> <button class="menu-btn svelte-s2sshx" type="button"${attr("aria-expanded", menuOpen)} aria-controls="primary-nav" aria-label="Toggle menu">${escape_html("Menu")}</button> <nav id="primary-nav"${attr_class("nav", void 0, { "open": menuOpen })} aria-label="Primary"><a${attr("href", `${stringify(base)}/dashboard/`)}>Dashboard</a> <a${attr("href", `${stringify(base)}/agent/`)}>Agent</a> <a${attr("href", `${stringify(base)}/methodology/`)}>Methodology</a> <a${attr("href", `${stringify(base)}/implications/`)}>Levers</a> <a${attr("href", `${stringify(base)}/about/`)}>About</a></nav></div></header>`);
}
function Colophon($$renderer) {
  $$renderer.push(`<footer class="colophon"><div class="container colophon-inner"><div><h4>What this site is</h4> <p>A tool for showing what seven Portland-area public funds could pay for tomorrow, and the named rule that purports to stop them. All figures are <em>modeled</em> until audited records replace them — see Methodology.</p></div> <div><h4>Sections</h4> <p><a${attr("href", `${stringify(base)}/`)}>Home</a><br/> <a${attr("href", `${stringify(base)}/dashboard/`)}>Cross-fund dashboard</a><br/> <a${attr("href", `${stringify(base)}/agent/`)}>Agent demo</a><br/> <a${attr("href", `${stringify(base)}/methodology/`)}>Methodology &amp; glossary</a><br/> <a${attr("href", `${stringify(base)}/implications/`)}>Levers</a><br/> <a${attr("href", `${stringify(base)}/feed/`)}>Feed / RSS</a><br/> <a${attr("href", `${stringify(base)}/about/`)}>About</a></p></div> <div><h4>Authored by</h4> <p>Ron Bronson<br/> Public Capacity Lab<br/> State Capacity AI</p></div> <div><h4>Use it</h4> <p>Pick a fund. Read what it could pay for. Read who controls the blocker. Send the page to the person who controls the lever. Every chart downloads as PNG or CSV.</p></div></div></footer>`);
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.push(`<link rel="alternate" type="application/rss+xml" title="PDX Spend — Issue feed"${attr("href", `${stringify(base)}/feed.xml`)}/> <meta name="theme-color" content="#f4efe6"/> <meta name="author" content="Ron Bronson — Public Capacity Lab / State Capacity AI"/>`);
  });
  Masthead($$renderer);
  $$renderer.push(`<!----> <main>`);
  children($$renderer);
  $$renderer.push(`<!----></main> `);
  Colophon($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
