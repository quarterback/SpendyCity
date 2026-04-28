import { d as ensure_array_like, e as escape_html, a as attr, s as stringify } from "../../../chunks/root.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { a as FUNDS } from "../../../chunks/funds.js";
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
      { value: "voter", label: "Voter who passed it" },
      { value: "reporter", label: "Investigative reporter" }
    ];
    SiteMeta($$renderer2, {
      title: "Agent demo — PDX Spend",
      description: "Pick a fund and a lens. The agent writes a short memo about that fund in the voice you choose.",
      path: "/agent/",
      type: "article"
    });
    $$renderer2.push(`<!----> <article><header class="container fund-header"><p class="kicker">AGENT DEMO · WRITE A MEMO</p> <h1 class="article-title">Write a memo for any fund, in any voice</h1> <p class="article-deck">Pick a fund and pick a lens. The agent reads what we have on the fund and writes a short memo. Use it as a starting draft for your own letter or testimony.</p></header> <section class="container two-col"><div class="prose"><h2>How it works</h2> <p>The agent gets the fund’s ballot text, statute, balances, audit events, and recent memos. It writes a one-page memo in the voice you pick.</p> <p>The endpoint is rate-limited per IP. If it’s busy, the saved memo for each fund is the version on the fund page itself.</p></div> <aside class="margin-note"><h4>What the lens changes</h4> <p>The lens changes the voice, not the facts. <em>Auditor</em> cites code numbers. <em>Reporter</em> names the gap. <em>Voter</em> names what was promised and what arrived.</p></aside></section> <section class="container"><div class="agent-controls"><label><span>Fund</span> `);
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
    $$renderer2.push(`</label> <button class="run-btn"${attr("disabled", streaming, true)}>${escape_html("Generate")}</button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section> <section class="container"><p class="kicker">${escape_html("SAVED MEMO")}</p> <pre class="memo">${escape_html(memo)}</pre></section> <section class="container two-col"><div class="prose"><h2>Why a memo, not a press release</h2> <p>If you voted for one of these funds, you’re owed a short, structured account of what your dollars now do. A memo — summary, findings, recommendations — gives you something you can hand to a council member or a reporter the same day.</p></div> <aside class="margin-note"><h4>What runs this</h4> <p>Anthropic’s Claude (Sonnet) via Replit’s AI integration proxy. The system prompt and lens templates live in <code>src/routes/api/regenerate-memo/+server.ts</code>. The fund context is built server-side.</p> <p style="margin-top: 12px">See <a${attr("href", `${stringify(base)}/methodology/`)}>methodology →</a></p></aside></section></article>`);
  });
}
export {
  _page as default
};
