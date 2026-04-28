import { f as attr_class, e as escape_html, c as ensure_array_like, a as attr, s as stringify } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "d3";
import { f as formatUSD, C as ChartFrame } from "../../../chunks/ChartFrame.js";
import { S as SiteMeta } from "../../../chunks/SiteMeta.js";
import { S as ShareBlock } from "../../../chunks/ShareBlock.js";
import { s as siteUrl } from "../../../chunks/config.js";
import { a as FUNDS, b as TOTAL_MODELED_BALANCE, d as TOTAL_MOVABLE } from "../../../chunks/funds.js";
function StackedBarChart($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div style="width:100%"><svg role="img" aria-label="Cross-fund stacked bar chart"></svg></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let mode = "dollars";
    const rows = FUNDS.map((f) => ({
      slug: f.slug,
      shortName: f.shortName,
      balance: f.modeledBalance,
      restricted: f.modeledBalance * f.modeledRestrictedShare,
      movable: f.modeledBalance * f.modeledMovableShare,
      cumulativeCollected: f.cumulativeCollected,
      enacted: f.enacted,
      drift: f.drift[f.drift.length - 1]?.actualUse ?? 100
    }));
    const csvHeaders = ["Fund", "Balance", "Restricted", "Movable", "Drift_Pct"];
    const csvRows = rows.map((r) => [
      r.shortName,
      Math.round(r.balance),
      Math.round(r.restricted),
      Math.round(r.movable),
      Math.round(r.drift)
    ]);
    SiteMeta($$renderer2, {
      title: "Cross-fund dashboard — PDX Spend",
      description: "All seven voter-restricted Portland and Multnomah County funds in one frame. Switch between dollars, share-restricted, and drift trajectory.",
      path: "/dashboard/",
      type: "article"
    });
    $$renderer2.push(`<!----> <article><header class="container fund-header"><p class="kicker">DASHBOARD · ALL SEVEN FUNDS</p> <h1 class="article-title">Cross-fund dashboard</h1> <p class="article-deck">Three views of the same seven funds — by absolute carry, by share of carry that has been made movable, and by trajectory of drift from the original voter intent.</p></header> <section class="container"><div class="dash-controls"><div class="seg"><button${attr_class("", void 0, { "active": mode === "dollars" })}>Dollars</button> <button${attr_class("", void 0, { "active": mode === "percent" })}>% Restricted vs. movable</button> <button${attr_class("", void 0, { "active": mode === "trajectory" })}>Drift trajectory</button></div> <div class="dash-summary"><span><strong>${escape_html(formatUSD(TOTAL_MODELED_BALANCE))}</strong> total modeled carry</span> <span class="accent"><strong>${escape_html(formatUSD(TOTAL_MOVABLE))}</strong> movable</span> <span>${escape_html(Math.round(TOTAL_MOVABLE / TOTAL_MODELED_BALANCE * 100))}% of total now movable</span></div></div></section> <section class="container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        StackedBarChart($$renderer3);
      };
      ChartFrame($$renderer2, {
        title: "Modeled carry by fund",
        sub: "Sorted by absolute modeled carry. Click a fund label or row to open its page.",
        source: "Modeled reconstruction (PDX Spend)",
        pngName: `dashboard-${stringify(mode)}.png`,
        csvHeaders,
        csvRows,
        children
      });
    }
    $$renderer2.push(`<!----></section> <section class="container"><h2 class="section-title">Fund index</h2> <table class="dash-table"><thead><tr><th>Fund</th><th>Enacted</th><th>Modeled carry</th><th>Restricted</th><th>Movable</th><th>Drift</th><th></th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(rows);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let r = each_array[$$index];
      $$renderer2.push(`<tr><td>${escape_html(r.shortName)}</td><td>${escape_html(r.enacted)}</td><td class="num">${escape_html(formatUSD(r.balance))}</td><td class="num">${escape_html(formatUSD(r.restricted))}</td><td class="num accent">${escape_html(formatUSD(r.movable))}</td><td class="num">${escape_html(Math.round(100 - r.drift))}%</td><td><a${attr("href", `${stringify(base)}/funds/${stringify(r.slug)}/`)}>read →</a></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section> <section class="container two-col"><div class="prose"><h2>Embed this dashboard</h2> <p>The dashboard is intended to be embedded in newsroom, civic-org, or analyst posts. Copy the snippet on the right. The chart will render at full width inside the iframe and respect the container's responsive width.</p></div> <aside class="margin-note"><h4>Embed snippet</h4> <pre class="snippet">&lt;iframe src="https://pdxspend.replit.app/dashboard/" width="100%" height="640" style="border:1px solid #161513">&lt;/iframe></pre> <button class="copy-btn">${escape_html("Copy snippet")}</button></aside></section> <section class="container">`);
    ShareBlock($$renderer2, {
      headline: "Cross-fund dashboard: seven Portland-area restricted funds, in one frame.",
      summary: "Switch between dollars, share-restricted, and drift trajectory. Embeddable. Modeled figures.",
      url: siteUrl("/dashboard/")
    });
    $$renderer2.push(`<!----></section></article>`);
  });
}
export {
  _page as default
};
