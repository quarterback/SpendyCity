import { a as attr, e as escape_html, c as ensure_array_like, s as stringify } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { F as FUNDS } from "../../../chunks/funds.js";
import { S as SiteMeta } from "../../../chunks/SiteMeta.js";
function _page($$renderer) {
  SiteMeta($$renderer, {
    title: "Feed — PDX Spend",
    description: "Issue index for PDX Spend: every fund page, the dashboard, the agent demo, methodology, and implications. Subscribe via /feed.xml.",
    path: "/feed/",
    type: "article"
  });
  $$renderer.push(`<!----> <article><header class="container fund-header"><p class="kicker">FEED · ISSUE 01</p> <h1 class="article-title">PDX Spend, Issue 01</h1> <p class="article-deck">Seven fund pages, one dashboard, one agent demo, one methodology note, one implications essay. Listed in order of publication.</p> <p class="rss-link">Subscribe via RSS: <a${attr("href", `${stringify(base)}/feed.xml`)}>${escape_html(base || "")}/feed.xml</a></p></header> <section class="container"><ul class="feed"><li class="feed-item"><p class="feed-meta">FRONT · ISSUE 01</p> <h2><a${attr("href", `${stringify(base)}/`)}>Seven voter-passed funds, quietly redrawn around their balances</a></h2> <p>The cover essay and at-a-glance hero chart for the issue.</p></li> <!--[-->`);
  const each_array = ensure_array_like(FUNDS);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let f = each_array[$$index];
    $$renderer.push(`<li class="feed-item"><p class="feed-meta">FUND · ${escape_html(f.enacted)} · ${escape_html(f.ballotMeasure ?? f.enablingCode)}</p> <h2><a${attr("href", `${stringify(base)}/funds/${stringify(f.slug)}/`)}>${escape_html(f.name)}</a></h2> <p>${escape_html(f.scandal)}</p></li>`);
  }
  $$renderer.push(`<!--]--> <li class="feed-item"><p class="feed-meta">DASHBOARD</p> <h2><a${attr("href", `${stringify(base)}/dashboard/`)}>Cross-fund dashboard — three views of all seven</a></h2> <p>Switch between absolute carry, share-restricted, and drift trajectory. Embed-friendly.</p></li> <li class="feed-item"><p class="feed-meta">AGENT</p> <h2><a${attr("href", `${stringify(base)}/agent/`)}>Generate a structured financial memo</a></h2> <p>Pick a fund and a lens. The agent re-runs the memo against the modeled record.</p></li> <li class="feed-item"><p class="feed-meta">METHODOLOGY</p> <h2><a${attr("href", `${stringify(base)}/methodology/`)}>How this site was built</a></h2> <p>What is modeled, why, and how the audited figures will be swapped in.</p></li> <li class="feed-item"><p class="feed-meta">ESSAY</p> <h2><a${attr("href", `${stringify(base)}/implications/`)}>What the seven funds, taken together, suggest</a></h2> <p>The structural pattern is consistent enough across instruments and stewards that it is worth naming.</p></li> <li class="feed-item"><p class="feed-meta">ABOUT</p> <h2><a${attr("href", `${stringify(base)}/about/`)}>PDX Spend</a></h2> <p>Authorship, license, citation, and contact.</p></li></ul></section></article>`);
}
export {
  _page as default
};
