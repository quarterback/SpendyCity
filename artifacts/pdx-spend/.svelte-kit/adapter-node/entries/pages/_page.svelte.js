import { s as stringify, e as escape_html, d as ensure_array_like, a as attr, f as derived } from "../../chunks/root.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "d3";
import { f as formatUSD, C as ChartFrame } from "../../chunks/ChartFrame.js";
import { S as SiteMeta } from "../../chunks/SiteMeta.js";
import { S as ShareBlock } from "../../chunks/ShareBlock.js";
import { s as siteUrl } from "../../chunks/config.js";
import { a as FUNDS, F as FUND_BY_SLUG, T as TOTAL_MODELED_BALANCE, b as TOTAL_CUMULATIVE_COLLECTED, c as TOTAL_RESTRICTED, d as TOTAL_MOVABLE } from "../../chunks/funds.js";
import { h as html } from "../../chunks/html.js";
function HeroChart($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div style="width:100%"><svg role="img" aria-label="Modeled carry across all seven restricted funds"></svg></div>`);
  });
}
function SparkBalance($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<svg role="img" aria-label="Balance trend"></svg>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const latestWeekly = derived(() => data.latestWeekly);
    function fmtDate(d) {
      if (!d) return "";
      return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }
    const heroRows = FUNDS.map((f) => ({
      shortName: f.shortName,
      balance: f.modeledBalance,
      movable: f.modeledBalance * f.modeledMovableShare,
      restricted: f.modeledBalance * f.modeledRestrictedShare
    }));
    const csvHeaders = ["Fund", "Balance", "Restricted", "Movable"];
    const csvRows = heroRows.map((r) => [
      r.shortName,
      Math.round(r.balance),
      Math.round(r.restricted),
      Math.round(r.movable)
    ]);
    const movablePct = TOTAL_MODELED_BALANCE > 0 ? Math.round(TOTAL_MOVABLE / TOTAL_MODELED_BALANCE * 100) : 0;
    const headlineBlockerNews = FUND_BY_SLUG.pcef?.blockerNews ?? "";
    SiteMeta($$renderer2, {
      title: "PDX Spend — What Portland's voter funds could pay for, and what's blocking them",
      description: `Seven Portland-area voter funds hold ${stringify(formatUSD(TOTAL_MODELED_BALANCE))}. See what each one could pay for tomorrow, and the named rule blocking it.`,
      path: "/",
      type: "website"
    });
    $$renderer2.push(`<!----> <article><section class="hero container"><p class="kicker">PDX SPEND</p> <h1 class="hero-title">Seven Portland-area voter funds. What they could pay for, and what’s blocking it.</h1> <p class="headline-figure">${escape_html(formatUSD(TOTAL_MODELED_BALANCE))}</p> <p class="headline-figure-sub">sits across the seven funds today. About ${escape_html(movablePct)}% of it has been re-aimed away from what voters approved.</p> `);
    if (headlineBlockerNews) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="stop-banner"><p class="lbl">Live example, this month</p> <p>${escape_html(headlineBlockerNews)}</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <p class="hero-deck">Pick a fund. See what it could pay for at its current balance. See who controls the rule that stops it. Send the page to that person.</p></section> <section class="hero-figure container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        HeroChart($$renderer3);
      };
      ChartFrame($$renderer2, {
        title: "Year-end balance, all seven funds",
        sub: "Each bar is one fund. The orange share is the part already re-aimed.",
        source: "PDX Spend",
        modeled: true,
        pngName: "pdxspend-hero.png",
        csvHeaders,
        csvRows,
        children
      });
    }
    $$renderer2.push(`<!----></section> <section class="container"><p class="section-eyebrow">The seven, totaled</p> <div class="big-stats"><div class="big-stat"><p class="num">${escape_html(formatUSD(TOTAL_CUMULATIVE_COLLECTED))}</p> <p class="lbl">Collected from you, all years</p></div> <div class="big-stat"><p class="num">${escape_html(formatUSD(TOTAL_MODELED_BALANCE))}</p> <p class="lbl">Sitting in the funds today</p></div> <div class="big-stat"><p class="num">${escape_html(formatUSD(TOTAL_RESTRICTED))}</p> <p class="lbl">Still aimed where you voted</p></div> <div class="big-stat"><p class="num accent">${escape_html(formatUSD(TOTAL_MOVABLE))}</p> <p class="lbl">Re-aimed since you voted</p></div></div></section> <section class="container how-to svelte-1uha8ag"><p class="section-eyebrow">How to use this site</p> <ol class="how-list svelte-1uha8ag"><li class="svelte-1uha8ag"><span class="step-n svelte-1uha8ag">1</span> <p class="svelte-1uha8ag"><strong>Pick a fund.</strong> Each page opens with what you voted for, in plain words.</p></li> <li class="svelte-1uha8ag"><span class="step-n svelte-1uha8ag">2</span> <p class="svelte-1uha8ag"><strong>Read what it could pay for.</strong> Concrete units, grounded in published unit costs.</p></li> <li class="svelte-1uha8ag"><span class="step-n svelte-1uha8ag">3</span> <p class="svelte-1uha8ag"><strong>Read who controls the blocker.</strong> Every blocker names a defense and a rebuttal. Send the page to the office that holds the lever.</p></li></ol></section> `);
    if (latestWeekly().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="container changed-this-week svelte-1uha8ag"><p class="section-eyebrow">What changed this week</p> <h2 class="section-title">Latest memos</h2> <div class="changed-grid svelte-1uha8ag"><!--[-->`);
      const each_array = ensure_array_like(latestWeekly());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        const fund = FUND_BY_SLUG[item.fundSlug];
        if (fund) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<a class="changed-card svelte-1uha8ag"${attr("href", `${stringify(base)}/funds/${stringify(item.fundSlug)}/`)}><p class="changed-meta svelte-1uha8ag">${escape_html(fund.shortName)} ·
                ${escape_html(fmtDate(item.output.publishedAt ?? item.output.createdAt))}</p> `);
          if ("headline" in item && item.headline) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<h3 class="changed-headline svelte-1uha8ag">${escape_html(item.headline)}</h3>`);
          } else {
            $$renderer2.push("<!--[-1-->");
            $$renderer2.push(`<h3 class="changed-headline svelte-1uha8ag">${escape_html(fund.name)}</h3>`);
          }
          $$renderer2.push(`<!--]--> <div class="changed-excerpt svelte-1uha8ag">${html(item.excerptHtml)}</div> <p class="changed-cta svelte-1uha8ag">Read the memo →</p></a>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="container"><p class="section-eyebrow">The seven funds</p> <h2 class="section-title">Pick one to open it</h2> <div class="fund-grid"><!--[-->`);
    const each_array_1 = ensure_array_like(FUNDS);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let fund = each_array_1[$$index_1];
      $$renderer2.push(`<a class="fund-card"${attr("href", `${stringify(base)}/funds/${stringify(fund.slug)}/`)}><p class="fund-meta">${escape_html(fund.enacted)} · ${escape_html(fund.ballotMeasure ?? fund.enablingCode)}</p> <h3 class="fund-name">${escape_html(fund.name)}</h3> <p class="fund-deck">${escape_html(fund.oneLineStatus)}</p> <div class="fund-spark">`);
      SparkBalance($$renderer2, { data: fund.cashSeries });
      $$renderer2.push(`<!----></div> <div class="fund-stats"><span>${escape_html(formatUSD(fund.modeledBalance))} sitting</span> <span class="accent">${escape_html(Math.round(fund.modeledMovableShare * 100))}% re-aimed</span></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="container">`);
    ShareBlock($$renderer2, {
      headline: `Seven Portland voter funds hold ${stringify(formatUSD(TOTAL_MODELED_BALANCE))}. Here’s what each one could pay for, and what’s blocking it.`,
      summary: "Pick a fund. See what it could buy. See who controls the rule that stops it. PDX Spend.",
      url: siteUrl("/")
    });
    $$renderer2.push(`<!----></section></article>`);
  });
}
export {
  _page as default
};
