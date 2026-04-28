import { e as escape_html, a as attr, d as derived, c as ensure_array_like, f as attr_class, s as stringify } from "../../../../chunks/root.js";
import { b as base } from "../../../../chunks/server.js";
import "../../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "d3";
import { f as formatUSD, a as formatPct, C as ChartFrame } from "../../../../chunks/ChartFrame.js";
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
    let { kicker, title, deck, html: html$1, output, pdfUrl } = $$props;
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
      $$renderer2.push(`<!--]--> `);
      if (pdfUrl) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`· <a class="pdf-link svelte-g8lblw"${attr("href", pdfUrl)} download="">Download PDF</a>`);
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
      are kept on the record so the cadence is auditable.</p> <div class="table-wrap svelte-1e53qd5"><table class="svelte-1e53qd5"><thead><tr><th class="svelte-1e53qd5">When</th><th class="svelte-1e53qd5">Work product</th><th class="svelte-1e53qd5">Status</th><th class="svelte-1e53qd5">Model</th><th class="svelte-1e53qd5">Prompt</th><th class="svelte-1e53qd5">Attempts</th><th class="svelte-1e53qd5">Artifact</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(runs);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let r = each_array[$$index];
        $$renderer2.push(`<tr><td class="svelte-1e53qd5">${escape_html(fmt(r.publishedAt ?? r.createdAt))}</td><td class="svelte-1e53qd5">${escape_html(product(r.workProductType))}</td><td class="svelte-1e53qd5"><span${attr_class(`status status-${stringify(r.status)}`, "svelte-1e53qd5")}>${escape_html(r.status)}</span></td><td class="svelte-1e53qd5"><code class="svelte-1e53qd5">${escape_html(r.modelVersion)}</code></td><td class="svelte-1e53qd5"><code class="svelte-1e53qd5">${escape_html(r.promptVersion)}</code></td><td class="svelte-1e53qd5">${escape_html(r.attemptCount)}</td><td class="svelte-1e53qd5">`);
        if (r.pdfUrl) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<a${attr("href", r.pdfUrl)} download="">PDF</a>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`—`);
        }
        $$renderer2.push(`<!--]--></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
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
    SiteMeta($$renderer2, {
      title: `${fund().name} — PDX Spend`,
      description: fund().oneLineStatus,
      path: `/funds/${fund().slug}/`,
      type: "article"
    });
    $$renderer2.push(`<!----> <article><header class="container fund-header"><p class="kicker">FUND · ${escape_html(fund().enacted)} · ${escape_html(fund().ballotMeasure ?? fund().enablingCode)}</p> <h1 class="article-title">${escape_html(fund().name)}</h1> <p class="article-deck">${escape_html(fund().scandal)}</p> <dl class="fund-meta-grid"><div><dt>Enabling code</dt><dd>${escape_html(fund().enablingCode)}</dd></div> <div><dt>Collector</dt><dd>${escape_html(fund().collector)}</dd></div> <div><dt>Steward</dt><dd>${escape_html(fund().steward)}</dd></div> <div><dt>Cadence</dt><dd>${escape_html(fund().collectionsCadence)}</dd></div> <div><dt>Restriction class</dt><dd>${escape_html(fund().restrictionClass)}</dd></div> <div><dt>Modeled carry</dt><dd>${escape_html(formatUSD(fund().modeledBalance))}</dd></div> <div><dt>Restricted share</dt><dd>${escape_html(formatPct(fund().modeledRestrictedShare))}</dd></div> <div><dt>Movable share</dt><dd class="accent">${escape_html(formatPct(fund().modeledMovableShare))}</dd></div></dl></header> <section class="container two-col"><div class="prose"><p class="lede"><strong>Voter intent.</strong> ${escape_html(fund().voterIntent)}</p> <p>What follows is a year-by-year reading of how the cash position of this fund evolved, annotated with the audit findings and council actions that produced its current shape. Scroll to advance the chart.</p></div> <aside class="margin-note"><h4>Reading the chart</h4> <p>The dark line is the modeled year-end balance. The shaded area underneath is the portion that has been formally <em>obligated</em> — committed to a contract, grant, or program but not yet paid out. The orange dots are audit-trail events; orange labels above the line summarize each one.</p></aside></section> <section class="container-wide scrolly-section"><div class="scrolly-grid"><div class="scrolly-sticky">`);
    {
      let children = function($$renderer3, { register }) {
        AnnotatedLineChart($$renderer3, {
          data: fund().cashSeries,
          events: fund().auditEvents,
          activeYear: activeYear()
        });
      };
      ChartFrame($$renderer2, {
        title: "Modeled cash position with audit annotations",
        sub: "Annotations are auditor findings, council resolutions, and bureau memos. Active step shown with vertical rule.",
        source: "Modeled reconstruction (PDX Spend)",
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
        const each_array = ensure_array_like(steps());
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let step = each_array[i];
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
    $$renderer2.push(`<!----></div></section> <section class="container two-col"><div class="prose"><h2>Promise versus delivery</h2> <p>The chart on the right pairs each plan cycle's stated dollar promise with the dollar amount that was eventually delivered against it. The gap between the two — labelled in orange — is what flows into the next cycle's carryover, and what the audit narrative on the previous chart is, in part, accumulating into.</p></div> <aside class="margin-note"><h4>Why the gap matters</h4> <p>A persistent gap between promised and delivered creates a structural surplus. Surplus does not stay neutral: it becomes governable, and ordinances begin to make it movable. This is the mechanical link between under-spending and scope drift.</p></aside></section> <section class="container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        DivergingBarChart($$renderer3, { data: fund().promiseVsHappened });
      };
      ChartFrame($$renderer2, {
        title: "Promised vs. delivered, by fiscal cycle",
        sub: "Promised dollars are those committed in the bureau's published plan; delivered dollars are what shipped against the plan. Modeled.",
        source: "Modeled reconstruction (PDX Spend)",
        pngName: `${stringify(fund().slug)}-promise.png`,
        csvHeaders: promiseCsvHeaders,
        csvRows: promiseCsvRows(),
        children
      });
    }
    $$renderer2.push(`<!----></section> <section class="container two-col"><div class="prose"><h2>Reserve growth</h2> <p>When delivery lags collection, the residual accumulates as an unobligated reserve. This is not a savings account in the household sense: it is a balance that public-finance officers and council staff have, by ordinance, the discretion to redirect.</p></div> <aside class="margin-note"><h4>Reserve, plainly</h4> <p>The reserve is the share of the fund that is neither already spent nor formally obligated. It is the available headroom for any future scope-broadening vote.</p></aside></section> <section class="container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        ReserveStream($$renderer3, { series: fund().reserveSeries });
      };
      ChartFrame($$renderer2, {
        title: "Modeled unobligated reserve",
        source: "Modeled reconstruction (PDX Spend)",
        pngName: `${stringify(fund().slug)}-reserve.png`,
        children
      });
    }
    $$renderer2.push(`<!----></section> <section class="container two-col"><div class="prose"><h2>Drift from voter intent</h2> <p>The chart on the right is a <em>drift index</em>. A value of 100 percent means every dollar in the fund is being used in a way that maps cleanly to the original ballot text. A value below 100 percent means some share has been ordinance-redirected, swept into a sibling program, or otherwise reclassified.</p></div> <aside class="margin-note"><h4>How drift is constructed</h4> <p>Drift is modeled by reading each post-enactment ordinance and resolution against the ballot text, scoring how much of the affected balance moved off the original-intent baseline, and compounding that score forward.</p></aside></section> <section class="container-wide">`);
    {
      let children = function($$renderer3, { register }) {
        DriftTimeline($$renderer3, { drift: fund().drift });
      };
      ChartFrame($$renderer2, {
        title: "Drift index — voter intent vs. modeled actual disposition",
        source: "Modeled reconstruction (PDX Spend)",
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
        deck: "A structured-finance read of the corpus on file for this fund. The memo is cited inline against the documents the agent had access to at run time.",
        html: weeklyMemo().html,
        output: weeklyMemo().output,
        pdfUrl: weeklyMemo().pdfUrl
      });
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<section class="container"><p class="kicker">WEEKLY MEMO · ${escape_html(fund().shortName.toUpperCase())}</p> <h2 class="section-title">No memo on file yet</h2> <p class="section-deck">The scheduled run for this fund has not produced a published memo yet.
        Fund pages render the most recent memo once the pipeline has succeeded
        for the current corpus snapshot.</p></section>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (monthlyCashFlow()) {
      $$renderer2.push("<!--[0-->");
      AgentMemoBlock($$renderer2, {
        kicker: `MONTHLY CASH-FLOW · ${fund().shortName.toUpperCase()}`,
        title: "Cash-flow narrative for the month",
        deck: "A monthly cash-flow read against the same corpus, focused on inflows, outflows, and the residual that flows into next period.",
        html: monthlyCashFlow().html,
        output: monthlyCashFlow().output,
        pdfUrl: monthlyCashFlow().pdfUrl
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    RunHistory($$renderer2, { runs: runs() });
    $$renderer2.push(`<!----> <section class="container"><h2 class="section-title">Citations</h2> <ul class="citations"><!--[-->`);
    const each_array_1 = ensure_array_like(fund().citations);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let c = each_array_1[$$index_1];
      $$renderer2.push(`<li>${escape_html(c)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></section> <section class="container">`);
    ShareBlock($$renderer2, {
      headline: `${fund().name} — ${fund().scandal}`,
      summary: fund().oneLineStatus,
      url: siteUrl(`/funds/${fund().slug}/`)
    });
    $$renderer2.push(`<!----></section> <section class="container fund-nav"><a class="nav-back"${attr("href", `${stringify(base)}/`)}>← Back to issue index</a> <a class="nav-back"${attr("href", `${stringify(base)}/dashboard/`)}>Cross-fund dashboard →</a></section></article>`);
  });
}
export {
  _page as default
};
