<script lang="ts">
  import { base } from '$app/paths';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
</script>

<SiteMeta
  title="Methodology — PDX Spend"
  description="How figures are constructed, what modeling choices were made, and how audited numbers will replace them."
  path="/methodology/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">METHODOLOGY · ISSUE 01</p>
    <h1 class="article-title">How this site was built</h1>
    <p class="article-deck">
      What the figures are, where they come from, and what will change when audited records ship.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>The figures</h2>
      <p>
        Every number on this site — year-end balances, obligated amounts, promise-vs-delivered cycles, drift indices, reserve series — is modeled. They are constructed reconstructions of a structural pattern documented across audits, council resolutions, and bureau reporting on Portland and Multnomah County's voter-restricted funds.
      </p>
      <p>
        The corpus task that ships behind this site will produce an audited monthly figure set. Swapping modeled series for audited series is a one-file edit per fund. Chart frames carry a MODELED badge until the swap is complete.
      </p>

      <h2>Why model</h2>
      <p>
        The actual figures are not centralized. Each fund's record is spread across an enabling code, a ballot pamphlet, an annual financial report, bureau memos, and council actions. No single dashboard shows the seven on the same axes. This site is that dashboard.
      </p>

      <h2>Modeling choices</h2>
      <ul>
        <li>
          <strong>Cash series.</strong> Each fund's year-end balance is generated from a starting inflow, a yearly inflow growth rate, and a spend ratio that ramps up after enactment. Obligated share is held at a fund-specific fraction of the balance.
        </li>
        <li>
          <strong>Audit events.</strong> Each annotation maps to a real category of finding — collection-cost overrun, scope expansion, surplus carryover, compliance-rate gap. Source lines name the institutional source rather than a specific document number.
        </li>
        <li>
          <strong>Drift index.</strong> A 0–100 score where 100 means every dollar maps to the original ballot text. Constructed by reading post-enactment ordinances against the ballot text, scoring how much of the affected balance moved off baseline, and compounding forward.
        </li>
        <li>
          <strong>Promise vs. delivered.</strong> Promised dollars are those committed in a published bureau plan. Delivered dollars are what shipped against the plan. The gap is the structural under-spend that becomes carryover.
        </li>
      </ul>
    </div>
    <aside class="margin-note">
      <h4>Tech stack</h4>
      <p>
        Static SvelteKit build. D3 for charts. Scrollama for chart-driven scroll. The agent endpoint is a single serverless route that streams Anthropic's Claude (Sonnet) over Server-Sent Events. Fund records live in TypeScript modules; there is no database.
      </p>
      <p style="margin-top: 14px">
        <strong>Type · </strong>Fraunces (display + body), JetBrains Mono (kicker, axis, annotation).
      </p>
      <p style="margin-top: 14px">
        <strong>Voice guide · </strong><a href="{base}/VOICE.md">VOICE.md</a>
      </p>
    </aside>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Design choices</h2>
      <p>
        Charts are wide and prose is narrow on purpose. Margin notes carry the auxiliary read. Audit annotations break out of the chart frame so they read as commentary on the data, not as the data itself. Color is restrained: a single accent on the share of carry that has been made movable.
      </p>

      <h2>Provenance markers</h2>
      <p>
        Every chart frame names its source. Charts carry a MODELED badge. When audited figures are wired in, the source line will change to name the financial document the figure was pulled from, and the badge will be removed.
      </p>

      <h2>Download and reuse</h2>
      <p>
        Each chart has download buttons for the rendered PNG and the underlying CSV. The dashboard view has a copy-to-clipboard embed snippet. The whole site is open and reproducible.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Pages on this issue</h4>
      <p>
        <a href="{base}/">Home</a><br />
        <a href="{base}/dashboard/">Dashboard</a><br />
        <a href="{base}/agent/">Agent demo</a><br />
        <a href="{base}/implications/">Implications</a><br />
        <a href="{base}/about/">About</a>
      </p>
    </aside>
  </section>
</article>
