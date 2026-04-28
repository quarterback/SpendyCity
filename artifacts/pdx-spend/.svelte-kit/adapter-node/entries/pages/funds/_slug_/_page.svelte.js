import { e as escape_html, f as derived, d as ensure_array_like, b as attr_class, s as stringify, a as attr } from "../../../../chunks/root.js";
import { b as base } from "../../../../chunks/server.js";
import "../../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "d3";
import { f as formatUSD, a as formatNumber, b as formatPct, C as ChartFrame } from "../../../../chunks/ChartFrame.js";
import { S as SiteMeta } from "../../../../chunks/SiteMeta.js";
import { S as ShareBlock } from "../../../../chunks/ShareBlock.js";
import { h as html } from "../../../../chunks/html.js";
import { s as siteUrl } from "../../../../chunks/config.js";
function AnnotatedLineChart($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div style="width:100%"><svg role="img" aria-label="Annotated cash position over time"></svg></div>`);
  });
}
function DivergingBarChart($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div style="width:100%"><svg role="img" aria-label="Promised vs delivered, by fiscal cycle"></svg></div>`);
  });
}
function ReserveStream($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div style="width:100%"><svg role="img" aria-label="Unobligated reserve by year"></svg></div>`);
  });
}
function DriftTimeline($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div style="width:100%"><svg role="img" aria-label="Drift between voter intent and actual disposition"></svg></div>`);
  });
}
function Scrolly($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    $$renderer2.push(`<div class="scrolly">`);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function AgentMemoBlock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { kicker, title, deck, html: html$1, output } = $$props;
    const dt = derived(() => output?.publishedAt ?? output?.createdAt ?? null);
    const dateLabel = derived(() => dt() ? new Date(dt()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : null);
    $$renderer2.push(`<section class="container memo-block svelte-g8lblw"><p class="kicker">${escape_html(kicker)}</p> <h2 class="section-title">${escape_html(title)}</h2> `);
    if (deck) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="section-deck">${escape_html(deck)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="memo-meta svelte-g8lblw"><p class="byline svelte-g8lblw">Ron Bronson · Public Capacity Lab · State Capacity AI</p> `);
    if (output) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="run-meta svelte-g8lblw">`);
      if (dateLabel()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span>${escape_html(dateLabel())}</span> ·`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <span>model ${escape_html(output.modelVersion)}</span> · <span>prompt ${escape_html(output.promptVersion)}</span> `);
      if (output.attemptCount > 1) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`· <span>${escape_html(output.attemptCount)} attempts</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="memo-prose svelte-g8lblw">${html(html$1)}</div></section>`);
  });
}
function RunHistory($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { runs } = $$props;
    function fmt(d) {
      if (!d) return "—";
      return new Date(d).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    }
    function product(t) {
      if (t === "weekly-memo") return "Weekly memo";
      if (t === "monthly-cash-flow") return "Monthly cash-flow";
      return t;
    }
    if (runs.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="container run-history svelte-1e53qd5"><p class="kicker">RUN HISTORY · LAST ${escape_html(runs.length)}</p> <h2 class="section-title">Prior agent runs</h2> <p class="section-deck">Each row is one invocation of the structured-finance prompt. Failed runs
      are kept on the record so the cadence is auditable.</p> <div class="table-wrap svelte-1e53qd5"><table class="svelte-1e53qd5"><thead><tr><th class="svelte-1e53qd5">When</th><th class="svelte-1e53qd5">Work product</th><th class="svelte-1e53qd5">Status</th><th class="svelte-1e53qd5">Model</th><th class="svelte-1e53qd5">Prompt</th><th class="svelte-1e53qd5">Attempts</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(runs);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let r = each_array[$$index];
        $$renderer2.push(`<tr><td class="svelte-1e53qd5">${escape_html(fmt(r.publishedAt ?? r.createdAt))}</td><td class="svelte-1e53qd5">${escape_html(product(r.workProductType))}</td><td class="svelte-1e53qd5"><span${attr_class(`status status-${stringify(r.status)}`, "svelte-1e53qd5")}>${escape_html(r.status)}</span></td><td class="svelte-1e53qd5"><code class="svelte-1e53qd5">${escape_html(r.modelVersion)}</code></td><td class="svelte-1e53qd5"><code class="svelte-1e53qd5">${escape_html(r.promptVersion)}</code></td><td class="svelte-1e53qd5">${escape_html(r.attemptCount)}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function CouldFundList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { items, balance } = $$props;
    $$renderer2.push(`<section class="could-fund svelte-1qu141a"><p class="hed-num svelte-1qu141a">${escape_html(formatUSD(balance))} could pay for any one of these:</p> <ul class="svelte-1qu141a"><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<li class="row svelte-1qu141a"><div class="row-main svelte-1qu141a"><p class="item svelte-1qu141a">${escape_html(item.item)}</p> <p class="basis svelte-1qu141a">Unit cost: ${escape_html(formatUSD(item.unitCost))} · Basis: ${escape_html(item.basis)}</p></div> <div class="row-right svelte-1qu141a"><p class="units svelte-1qu141a">${escape_html(formatNumber(item.units))}<span class="x svelte-1qu141a">×</span></p> <p class="total svelte-1qu141a">${escape_html(formatUSD(item.total))}</p></div></li>`);
    }
    $$renderer2.push(`<!--]--></ul> <p class="footnote svelte-1qu141a">Unit counts are rounded against published references. Real procurement and ramp time would shape the exact numbers. The point is the order of magnitude.</p></section>`);
  });
}
function BlockerCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { blocker, index } = $$props;
    $$renderer2.push(`<article class="blocker svelte-1lf9yec"><p class="num svelte-1lf9yec">Blocker ${escape_html(index)}</p> <h3 class="svelte-1lf9yec">${escape_html(blocker.name)}</h3> <p class="mechanism svelte-1lf9yec">${escape_html(blocker.mechanism)}</p> <dl class="lever svelte-1lf9yec"><dt class="svelte-1lf9yec">Who controls the lever</dt> <dd class="svelte-1lf9yec">${escape_html(blocker.controlledBy)}</dd></dl> <div class="defense svelte-1lf9yec"><p class="lbl svelte-1lf9yec">The defense</p> <p class="quote svelte-1lf9yec">“${escape_html(blocker.defense)}”</p></div> <div class="rebuttal svelte-1lf9yec"><p class="lbl svelte-1lf9yec">Why it doesn’t hold up</p> <p class="line svelte-1lf9yec">${escape_html(blocker.rebuttal)}</p></div></article>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const fund = derived(() => data.fund);
    const weeklyMemo = derived(() => data.weeklyMemo);
    const monthlyCashFlow = derived(() => data.monthlyCashFlow);
    const runs = derived(() => data.runs);
    let activeStep = 0;
    const steps = derived(() => fund().auditEvents.map((e) => ({ year: e.year, label: e.label, body: e.body, source: e.source })));
    const activeYear = derived(() => steps()[activeStep]?.year ?? null);
    const cashCsvHeaders = ["Year", "Balance", "Obligated", "Inflow", "Spent"];
    const cashCsvRows = derived(() => fund().cashSeries.map((c) => [
      c.year,
      Math.round(c.balance),
      Math.round(c.obligated),
      Math.round(c.inflow),
      Math.round(c.spent)
    ]));
    const promiseCsvHeaders = ["Cycle", "Promised", "Delivered", "Gap"];
    const promiseCsvRows = derived(() => fund().promiseVsHappened.map((p) => [
      p.cycle,
      Math.round(p.promised),
      Math.round(p.delivered),
      Math.round(p.promised - p.delivered)
    ]));
    const intentLine = derived(() => fund().voterIntentPlain ?? fund().voterIntent);
    SiteMeta($$renderer2, {
      title: `${fund().name} — PDX Spend`,
      description: fund().oneLineStatus,
      path: `/funds/${fund().slug}/`,
      type: "article"
    });
    $$renderer2.push(`<!----> <article><header class="container fund-header"><p class="kicker">FUND · ${escape_html(fund().enacted)} · ${escape_html(fund().ballotMeasure ?? fund().enablingCode)}</p> <h1 class="article-title">${escape_html(fund().name)}</h1> <p class="article-deck">${escape_html(fund().oneLineStatus)}</p> <dl class="fund-meta-grid"><div><dt>Passed</dt><dd>${escape_html(fund().enacted)}</dd></div> <div><dt>Who collects it</dt><dd>${escape_html(fund().collector)}</dd></div> <div><dt>Who runs it</dt><dd>${escape_html(fund().steward)}</dd></div> <div><dt>How often</dt><dd>${escape_html(fund().collectionsCadence)}</dd></div> <div><dt>Statute</dt><dd>${escape_html(fund().enablingCode)}</dd></div> <div><dt>Sitting today</dt><dd>${escape_html(formatUSD(fund().modeledBalance))}</dd></div> <div><dt>Still aimed where you voted</dt><dd>${escape_html(formatPct(fund().modeledRestrictedShare))}</dd></div> <div><dt>Re-aimed since</dt><dd class="accent">${escape_html(formatPct(fund().modeledMovableShare))}</dd></div></dl></header> `);
    if (fund().blockerNews) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="container"><div class="stop-banner"><p class="lbl">Live example</p> <p>${escape_html(fund().blockerNews)}</p></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="container two-col"><div class="prose"><h2>What you voted for</h2> <p>${escape_html(intentLine())}</p></div> <aside class="margin-note"><h4>Original ballot text</h4> <p>${escape_html(fund().voterIntent)}</p></aside></section> `);
    if (fund().couldFund && fund().couldFund.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="container"><p class="section-eyebrow">What it could pay for tomorrow</p> <h2 class="section-title">${escape_html(formatUSD(fund().modeledBalance))} could fund any one of these</h2> `);
      CouldFundList($$renderer2, { items: fund().couldFund, balance: fund().modeledBalance });
      $$renderer2.push(`<!----></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (fund().blockers && fund().blockers.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="container"><p class="section-eyebrow">What’s blocking it</p> <h2 class="section-title">Named obstacles, with the lever and the office</h2> <p class="section-deck">Each blocker is a mechanism, not a personality. The defense is the line routinely offered for it. The rebuttal is why that line doesn’t hold up.</p> <div class="blocker-grid"><!--[-->`);
      const each_array = ensure_array_like(fund().blockers);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let b = each_array[i];
        BlockerCard($$renderer2, { blocker: b, index: i + 1 });
      }
      $$renderer2.push(`<!--]--></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (fund().ifUnblocked) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="container"><div class="if-unblocked"><p class="lbl">If unblocked</p> <p>${escape_html(fund().ifUnblocked)}</p></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="container two-col"><div class="prose"><h2>How the balance got here</h2> <p>Each year-end balance, marked with the audits and council actions that shaped it. Scroll the right column to step through.</p></div> <aside class="margin-note"><h4>Read this chart</h4> <p>The line is the year-end balance. Vertical marks line up with the events listed beside the chart.</p></aside></section> <section class="container-wide scrolly-section"><div class="scrolly-grid"><div class="scrolly-sticky">`);
    {
      let children = function($$renderer3, { register }) {
        AnnotatedLineChart($$renderer3, {
          data: fund().cashSeries,
          events: fund().auditEvents,
          activeYear: activeYear()
        });
      };
      ChartFrame($$renderer2, {
        title: "Balance over time, with key events",
        sub: "Year-end balance. Marks indicate audits and council actions.",
        source: "PDX Spend",
        modeled: true,
        pngName: `${stringify(fund().slug)}-cash.png`,
        csvHeaders: cashCsvHeaders,
        csvRows: cashCsvRows(),
        children
      });
    }
    $$renderer2.push(`<!----></div> `);
    Scrolly($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(steps());
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          let step = each_array_1[i];
          $$renderer3.push(`<div${attr_class("step", void 0, { "active": i === activeStep })}><p class="step-year">${escape_html(step.year)}</p> <h3 class="step-label">${escape_html(step.label)}</h3> <p class="step-body">${escape_html(step.body)}</p> `);
          if (step.source) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<p class="step-source">${escape_html(step.source)}</p>`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!----></div></section> <section class="container two-col"><div class="prose"><h2>Promised vs. delivered</h2> <p>Each pair shows what a budget cycle planned to spend, and what actually shipped. The gap becomes next year’s carryover.</p></div> <aside class="margin-note"><h4>Why the gap matters</h4> <p>A balance that grows from under-delivery hands the bureau a reason to broaden what the dollars can be spent on.</p></aside></section> <section class="container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        DivergingBarChart($$renderer3, { data: fund().promiseVsHappened });
      };
      ChartFrame($$renderer2, {
        title: "Promised vs. delivered, by budget cycle",
        sub: "Planned dollars next to dollars that actually shipped.",
        source: "PDX Spend",
        modeled: true,
        pngName: `${stringify(fund().slug)}-promise.png`,
        csvHeaders: promiseCsvHeaders,
        csvRows: promiseCsvRows(),
        children
      });
    }
    $$renderer2.push(`<!----></section> <section class="container two-col"><div class="prose"><h2>Money sitting unspent, year by year</h2> <p>When inflows beat delivery, the residual sits as money that has not been promised to anyone yet. This is the headroom every scope-broadening vote draws on.</p></div> <aside class="margin-note"><h4>Headroom</h4> <p>The share neither spent nor formally promised in a contract. The available room for redirection.</p></aside></section> <section class="container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        ReserveStream($$renderer3, { series: fund().reserveSeries });
      };
      ChartFrame($$renderer2, {
        title: "Money sitting unspent, year by year",
        source: "PDX Spend",
        modeled: true,
        pngName: `${stringify(fund().slug)}-reserve.png`,
        children
      });
    }
    $$renderer2.push(`<!----></section> <section class="container two-col"><div class="prose"><h2>Share still aimed where you voted</h2> <p>100% means every dollar still maps to the original ballot text. Each council vote that broadens the eligible uses lowers the score.</p></div> <aside class="margin-note"><h4>How it’s scored</h4> <p>A 0–100 score from reading post-enactment ordinances against the original ballot text. See <a${attr("href", `${stringify(base)}/methodology/`)}>Methodology</a>.</p></aside></section> <section class="container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        DriftTimeline($$renderer3, { drift: fund().drift });
      };
      ChartFrame($$renderer2, {
        title: "Share still aimed where you voted",
        source: "PDX Spend",
        modeled: true,
        pngName: `${stringify(fund().slug)}-drift.png`,
        children
      });
    }
    $$renderer2.push(`<!----></section> `);
    if (weeklyMemo()) {
      $$renderer2.push("<!--[0-->");
      AgentMemoBlock($$renderer2, {
        kicker: `WEEKLY MEMO · ${fund().shortName.toUpperCase()}`,
        title: "What changed this week",
        deck: "A read of the documents on file for this fund, written this week. Citations link out to the source documents.",
        html: weeklyMemo().html,
        output: weeklyMemo().output
      });
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<section class="container"><p class="kicker">WEEKLY MEMO · ${escape_html(fund().shortName.toUpperCase())}</p> <h2 class="section-title">No memo for this fund yet this week</h2> <p class="section-deck">The weekly run hasn’t produced a published memo for this fund yet.</p></section>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (monthlyCashFlow()) {
      $$renderer2.push("<!--[0-->");
      AgentMemoBlock($$renderer2, {
        kicker: `MONTHLY CASH-FLOW · ${fund().shortName.toUpperCase()}`,
        title: "Cash this month",
        deck: "What came in, what went out, what carried into next month.",
        html: monthlyCashFlow().html,
        output: monthlyCashFlow().output
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    RunHistory($$renderer2, { runs: runs() });
    $$renderer2.push(`<!----> <section class="container"><h2 class="section-title">Where this comes from</h2> <ul class="citations"><!--[-->`);
    const each_array_2 = ensure_array_like(fund().citations);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let c = each_array_2[$$index_2];
      $$renderer2.push(`<li>${escape_html(c)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></section> <section class="container">`);
    ShareBlock($$renderer2, {
      headline: `${stringify(fund().name)}: ${stringify(formatUSD(fund().modeledBalance))} could pay for what you voted for. Here’s what’s blocking it.`,
      summary: fund().ifUnblocked ?? fund().oneLineStatus,
      url: siteUrl(`/funds/${fund().slug}/`)
    });
    $$renderer2.push(`<!----></section> <section class="container fund-nav"><a class="nav-back"${attr("href", `${stringify(base)}/`)}>← Back to all funds</a> <a class="nav-back"${attr("href", `${stringify(base)}/dashboard/`)}>Cross-fund dashboard →</a></section></article>`);
  });
}
export {
  _page as default
};
