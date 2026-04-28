import { c as ensure_array_like, e as escape_html, a as attr, s as stringify } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { F as FUNDS } from "../../../chunks/funds.js";
import { S as SiteMeta } from "../../../chunks/SiteMeta.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedSlug = FUNDS[0].slug;
    let lens = "financial-officer";
    let memo = FUNDS[0].memo;
    let streaming = false;
    const lenses = [
      { value: "financial-officer", label: "Public-finance officer" },
      { value: "auditor", label: "City auditor" },
      { value: "voter", label: "Voter who passed the measure" },
      { value: "reporter", label: "Investigative reporter" }
    ];
    SiteMeta($$renderer2, {
      title: "Agent demo — Generate a structured financial memo — PDX Spend",
      description: "Pick a fund and a lens. The agent re-runs a structured public-finance memo against the modeled record.",
      path: "/agent/",
      type: "article"
    });
    $$renderer2.push(`<!----> <article><header class="container fund-header"><p class="kicker">AGENT DEMO · STRUCTURED MEMO</p> <h1 class="article-title">Generate a structured financial memo</h1> <p class="article-deck">Pick a fund and a lens. The agent reads the fund's modeled record and writes a brief in the voice you select. Each page of this site already ships with a pre-generated memo; this view re-runs it live.</p></header> <section class="container two-col"><div class="prose"><h2>How this works</h2> <p>The agent receives the fund's enabling code, voter intent, modeled balances, audit-event log, drift index, and promise-vs-delivered series. It is asked to produce a single-page structured memo: summary, structural findings, recommendations. No editorial framing.</p> <p>The endpoint is rate-limited per IP and the modeled-data caveat is enforced in the system prompt. If the live endpoint is unavailable, the pre-generated memo on each fund's page is the canonical version.</p></div> <aside class="margin-note"><h4>Lenses</h4> <p>The lens parameter changes the voice but not the structure. A "voter" lens explains what they were sold and what arrived. An "auditor" lens cites code and resolution numbers. A "reporter" lens names the structural gap.</p></aside></section> <section class="container"><div class="agent-controls"><label><span>Fund</span> `);
    $$renderer2.select({ value: selectedSlug }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(FUNDS);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let f = each_array[$$index];
        $$renderer3.option({ value: f.slug }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(f.shortName)} — ${escape_html(f.name)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</label> <label><span>Lens</span> `);
    $$renderer2.select({ value: lens }, ($$renderer3) => {
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(lenses);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let l = each_array_1[$$index_1];
        $$renderer3.option({ value: l.value }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(l.label)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</label> <button class="run-btn"${attr("disabled", streaming, true)}>${escape_html("Regenerate live")}</button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section> <section class="container"><p class="kicker">${escape_html("PRE-GENERATED MEMO")}</p> <pre class="memo">${escape_html(memo)}</pre></section> <section class="container two-col"><div class="prose"><h2>Why a memo, not an opinion</h2> <p>Voters who pass restricted-fund measures are entitled to a structured accounting of what their dollars now do. The form of that accounting is not a press release or a feature story; it is a memo. The agent is asked to produce that memo and nothing else.</p></div> <aside class="margin-note"><h4>Provenance</h4> <p>The model behind this endpoint is Anthropic's Claude (Sonnet generation) accessed through Replit's AI integration proxy. The system prompt and structure live in <code>artifacts/api-server/src/routes/regenerate-memo.ts</code>.</p> <p style="margin-top: 12px">See <a${attr("href", `${stringify(base)}/methodology/`)}>methodology →</a></p></aside></section></article>`);
  });
}
export {
  _page as default
};
