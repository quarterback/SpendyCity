import { a as attr, b as attr_class, e as escape_html, d as ensure_array_like, s as stringify } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "d3";
import { f as formatUSD, C as ChartFrame } from "../../../chunks/ChartFrame.js";
import { S as SiteMeta } from "../../../chunks/SiteMeta.js";
import { S as ShareBlock } from "../../../chunks/ShareBlock.js";
import { s as siteUrl } from "../../../chunks/config.js";
import { a as FUNDS, T as TOTAL_MODELED_BALANCE, d as TOTAL_MOVABLE } from "../../../chunks/funds.js";
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
    const embedSnippet = `<iframe src="${siteUrl("/dashboard/")}" width="100%" height="640" style="border:1px solid #161513"></iframe>`;
    SiteMeta($$renderer2, {
      title: "Dashboard — PDX Spend",
      description: "All seven Portland-area voter funds in one frame. Three views: dollars, share re-aimed, and how much each is still on-mission.",
      path: "/dashboard/",
      type: "article"
    });
    $$renderer2.push(`<!----> <article><header class="container fund-header"><p class="kicker">DASHBOARD · ALL SEVEN FUNDS</p> <h1 class="article-title">All seven funds, side by side</h1> <p class="article-deck">Same dollars, three angles. Switch between absolute balance, share re-aimed, and how much each fund is still on-mission.</p></header> <section class="container"><div class="dash-controls"><div class="seg" role="group" aria-label="Choose dashboard view"><button type="button"${attr("aria-pressed", mode === "dollars")}${attr_class("", void 0, { "active": mode === "dollars" })}>Dollars</button> <button type="button"${attr("aria-pressed", mode === "percent")}${attr_class("", void 0, { "active": mode === "percent" })}>Share re-aimed</button> <button type="button"${attr("aria-pressed", mode === "trajectory")}${attr_class("", void 0, { "active": mode === "trajectory" })}>Still on-mission</button></div> <div class="dash-summary"><span><strong>${escape_html(formatUSD(TOTAL_MODELED_BALANCE))}</strong> sitting today</span> <span class="accent"><strong>${escape_html(formatUSD(TOTAL_MOVABLE))}</strong> already re-aimed</span> <span>${escape_html(Math.round(TOTAL_MOVABLE / TOTAL_MODELED_BALANCE * 100))}% across the seven</span></div></div></section> <section class="container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        StackedBarChart($$renderer3);
      };
      ChartFrame($$renderer2, {
        title: "Balance by fund",
        sub: "Sorted by absolute balance. Click a fund to open it.",
        source: "PDX Spend",
        modeled: true,
        pngName: `dashboard-${stringify(mode)}.png`,
        csvHeaders,
        csvRows,
        children
      });
    }
    $$renderer2.push(`<!----></section> <section class="container"><h2 class="section-title">Pick a fund</h2> <div class="dash-table-wrap"><table class="dash-table"><thead><tr><th>Fund</th><th>Passed</th><th>Sitting</th><th>On-mission</th><th>Re-aimed</th><th>Off-mission</th><th><span class="sr-only">Open fund detail</span></th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(rows);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let r = each_array[$$index];
      $$renderer2.push(`<tr><td>${escape_html(r.shortName)}</td><td>${escape_html(r.enacted)}</td><td class="num">${escape_html(formatUSD(r.balance))}</td><td class="num">${escape_html(formatUSD(r.restricted))}</td><td class="num accent">${escape_html(formatUSD(r.movable))}</td><td class="num">${escape_html(Math.round(100 - r.drift))}%</td><td><a${attr("href", `${stringify(base)}/funds/${stringify(r.slug)}/`)}>open →</a></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></section> <section class="container two-col"><div class="prose"><h2>Embed this dashboard</h2> <p>Copy the snippet on the right. The chart fills its frame and stays readable on phones and tablets.</p></div> <aside class="margin-note"><h4>Embed snippet</h4> <pre class="snippet">${escape_html(embedSnippet)}</pre> <button class="copy-btn">${escape_html("Copy snippet")}</button></aside></section> <section class="container">`);
    ShareBlock($$renderer2, {
      headline: "Seven Portland-area voter funds, side by side. Same dollars, three angles.",
      summary: "Dollars, share re-aimed, share still on-mission. Embeddable. PDX Spend.",
      url: siteUrl("/dashboard/")
    });
    $$renderer2.push(`<!----></section></article>`);
  });
}
export {
  _page as default
};
