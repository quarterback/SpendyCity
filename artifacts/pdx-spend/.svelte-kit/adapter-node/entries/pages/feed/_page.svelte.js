import { a as attr, e as escape_html, d as ensure_array_like, s as stringify } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { a as FUNDS } from "../../../chunks/funds.js";
import { S as SiteMeta } from "../../../chunks/SiteMeta.js";
function _page($$renderer) {
  SiteMeta($$renderer, {
    title: "Index — PDX Spend",
    description: "Every page on PDX Spend in one list. Seven fund pages, the dashboard, the agent demo, methodology, and the levers essay.",
    path: "/feed/",
    type: "article"
  });
  $$renderer.push(`<!----> <article><header class="container fund-header"><p class="kicker">INDEX</p> <h1 class="article-title">Every page in one list</h1> <p class="article-deck">Seven funds, one dashboard, one agent demo, one methodology page, one essay on the levers.</p> <p class="rss-link">Subscribe via RSS: <a${attr("href", `${stringify(base)}/feed.xml`)}>${escape_html(base || "")}/feed.xml</a></p></header> <section class="container"><ul class="feed"><li class="feed-item"><p class="feed-meta">FRONT</p> <h2><a${attr("href", `${stringify(base)}/`)}>Seven Portland-area voter funds, in plain view</a></h2> <p>What each fund could pay for, and the named rule that purports to stop it.</p></li> <!--[-->`);
  const each_array = ensure_array_like(FUNDS);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let f = each_array[$$index];
    $$renderer.push(`<li class="feed-item"><p class="feed-meta">FUND · ${escape_html(f.enacted)} · ${escape_html(f.ballotMeasure ?? f.enablingCode)}</p> <h2><a${attr("href", `${stringify(base)}/funds/${stringify(f.slug)}/`)}>${escape_html(f.name)}</a></h2> <p>${escape_html(f.oneLineStatus)}</p></li>`);
  }
  $$renderer.push(`<!--]--> <li class="feed-item"><p class="feed-meta">DASHBOARD</p> <h2><a${attr("href", `${stringify(base)}/dashboard/`)}>All seven funds, side by side</a></h2> <p>Three angles on the same dollars: balance, share re-aimed, share still on-mission.</p></li> <li class="feed-item"><p class="feed-meta">AGENT</p> <h2><a${attr("href", `${stringify(base)}/agent/`)}>Write a memo for any fund</a></h2> <p>Pick a fund, pick a lens, get a one-page memo.</p></li> <li class="feed-item"><p class="feed-meta">METHODOLOGY</p> <h2><a${attr("href", `${stringify(base)}/methodology/`)}>How this site was built, in plain words</a></h2> <p>What the figures mean, where they come from, and a glossary of every term.</p></li> <li class="feed-item"><p class="feed-meta">ESSAY</p> <h2><a${attr("href", `${stringify(base)}/implications/`)}>Five levers that would unblock the seven funds</a></h2> <p>Mechanical, not rhetorical. Each lever names who controls it.</p></li> <li class="feed-item"><p class="feed-meta">ABOUT</p> <h2><a${attr("href", `${stringify(base)}/about/`)}>About PDX Spend</a></h2> <p>Who built it, how to cite it, and how to send corrections.</p></li></ul></section></article>`);
}
export {
  _page as default
};
