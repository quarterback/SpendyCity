import { d as ensure_array_like, e as escape_html, a as attr, s as stringify } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { S as SiteMeta } from "../../../chunks/SiteMeta.js";
import { S as ShareBlock } from "../../../chunks/ShareBlock.js";
import { s as siteUrl } from "../../../chunks/config.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const levers = [
      {
        n: 1,
        name: "Put a sunset on every restricted fund",
        who: "Council, by ordinance amendment",
        body: "Each fund should have an end date. If the work is done, return the surplus. If the work isn’t done, return to voters. Sunsets close the door that scope-broadening votes open."
      },
      {
        n: 2,
        name: "Cap carryover at one year of operations",
        who: "Council; County Board for tri-county funds",
        body: "Anything above one year of operating cost gets disbursed against the published plan within the next two budget cycles. A reserve is for volatility. A multi-year balance is undeployed capacity."
      },
      {
        n: 3,
        name: "Require a binding multi-year deployment plan",
        who: "Bureau steward, ratified by Council",
        body: "Every fund publishes a five-year plan with quarterly reconciliation between awards and delivery. “Awarded” doesn’t equal weatherized, trained, built, or housed. The plan and the report use the same units."
      },
      {
        n: 4,
        name: "Send any change in eligible uses back to voters",
        who: "Council; County Board; Metro Council",
        body: "A simple-majority vote should not be enough to redefine what voter-restricted dollars can be spent on. New uses go on the next ballot, or come from a different source."
      },
      {
        n: 5,
        name: "Require third-party verification of beneficiary outcomes",
        who: "City Auditor, County Auditor, Metro Auditor",
        body: "A bureau reporting on its own delivery is not the same as an auditor verifying it. Annual outcome verification — units occupied, kids enrolled, retrofits completed, jobs placed — should be a precondition for next year’s appropriation."
      }
    ];
    SiteMeta($$renderer2, {
      title: "Levers — PDX Spend",
      description: "Five named structural changes that would unblock the seven Portland-area voter funds. Each names who controls the lever.",
      path: "/implications/",
      type: "article"
    });
    $$renderer2.push(`<!----> <article><header class="container fund-header"><p class="kicker">LEVERS · ISSUE 01</p> <h1 class="article-title">Five levers that unblock the seven funds</h1> <p class="article-deck">Each lever is mechanical, not rhetorical. Each one names the office that controls it.</p></header> <section class="container two-col"><div class="prose"><p>The pattern across the seven funds is consistent enough to fix structurally. The five changes below would each remove one of the named blockers across the whole portfolio. None of them require a ballot measure. All of them require a vote.</p></div> <aside class="margin-note"><h4>Why these five</h4> <p>Each lever appears in audit recommendations across multiple funds. None has been adopted as a portfolio-wide standard.</p></aside></section> <section class="container"><ol class="lever-list svelte-6u67v5"><!--[-->`);
    const each_array = ensure_array_like(levers);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let l = each_array[$$index];
      $$renderer2.push(`<li class="lever svelte-6u67v5"><p class="lever-n svelte-6u67v5">Lever ${escape_html(l.n)}</p> <h2 class="lever-name svelte-6u67v5">${escape_html(l.name)}</h2> <dl class="lever-meta svelte-6u67v5"><dt class="svelte-6u67v5">Who controls it</dt> <dd class="svelte-6u67v5">${escape_html(l.who)}</dd></dl> <p class="lever-body svelte-6u67v5">${escape_html(l.body)}</p></li>`);
    }
    $$renderer2.push(`<!--]--></ol></section> <section class="container">`);
    ShareBlock($$renderer2, {
      headline: "Five named levers would unblock seven Portland-area voter funds. None requires a ballot measure.",
      summary: "Sunset, carryover cap, deployment plan, no-redefinition-without-voters, third-party outcome verification. PDX Spend.",
      url: siteUrl("/implications/")
    });
    $$renderer2.push(`<!----></section> <section class="container fund-nav"><a class="nav-back"${attr("href", `${stringify(base)}/methodology/`)}>← Methodology</a> <a class="nav-back"${attr("href", `${stringify(base)}/about/`)}>About →</a></section></article>`);
  });
}
export {
  _page as default
};
