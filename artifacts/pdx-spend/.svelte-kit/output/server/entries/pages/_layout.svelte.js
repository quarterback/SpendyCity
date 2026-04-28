import { a as attr, s as stringify } from "../../chunks/root.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
function Masthead($$renderer) {
  $$renderer.push(`<header class="masthead"><div class="container masthead-inner"><a class="brand"${attr("href", `${stringify(base)}/`)}>PDX <span class="dot">·</span> Spend</a> <nav class="nav"><a${attr("href", `${stringify(base)}/dashboard`)}>Dashboard</a> <a${attr("href", `${stringify(base)}/agent`)}>Agent</a> <a${attr("href", `${stringify(base)}/methodology`)}>Methodology</a> <a${attr("href", `${stringify(base)}/implications`)}>Implications</a> <a${attr("href", `${stringify(base)}/about`)}>About</a></nav></div></header>`);
}
function Colophon($$renderer) {
  $$renderer.push(`<footer class="colophon"><div class="container colophon-inner"><div><h4>About this site</h4> <p>PDX Spend is an editorial accounting of seven voter-passed restricted funds in Portland and Multnomah County. All figures on this site are <em>modeled</em> reconstructions illustrating the structural pattern documented across audits, ordinances, and reporting.</p></div> <div><h4>Sections</h4> <p><a${attr("href", `${stringify(base)}/`)}>Home</a><br/> <a${attr("href", `${stringify(base)}/dashboard`)}>Cross-fund dashboard</a><br/> <a${attr("href", `${stringify(base)}/agent`)}>Agent demo</a><br/> <a${attr("href", `${stringify(base)}/methodology`)}>Methodology</a><br/> <a${attr("href", `${stringify(base)}/implications`)}>Implications</a><br/> <a${attr("href", `${stringify(base)}/feed`)}>Feed / RSS</a><br/> <a${attr("href", `${stringify(base)}/about`)}>About</a></p></div> <div><h4>Authored by</h4> <p>Ron Bronson<br/> Public Capacity Lab<br/> State Capacity AI</p></div> <div><h4>Use</h4> <p>Charts on each page can be downloaded as PNG or CSV. The dashboard provides an embed snippet. Pages link to enabling code, ballot text, and audit reports.</p></div></div></footer>`);
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
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
