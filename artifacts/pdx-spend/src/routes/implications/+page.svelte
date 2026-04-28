<script lang="ts">
  import { base } from '$app/paths';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import ShareBlock from '$lib/components/ShareBlock.svelte';
  import { siteUrl } from '$lib/config';
</script>

<SiteMeta
  title="Implications — PDX Spend"
  description="Across instruments and stewards, the pattern across seven Portland-area restricted funds is consistent enough to name."
  path="/implications/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">IMPLICATIONS · ISSUE 01</p>
    <h1 class="article-title">What the seven funds suggest</h1>
    <p class="article-deck">
      The pattern is consistent across instruments and stewards. It is worth naming.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>1. Restriction lives in ordinances</h2>
      <p>
        The seven funds were enacted under a range of restriction classes — voter-restricted by ballot measure, charter-restricted, enabling-act-restricted. In practice, restriction is a property of the council, the bureau, and the ordinances that follow enactment. Each of the seven shows the same arc: a narrow charge, an accumulating balance, an ordinance that broadens the charge, and a balance that flows under the new definition.
      </p>

      <h2>2. Instrument doesn't change the shape</h2>
      <p>
        It doesn't matter whether the fund is a flat per-adult tax, a gross-receipts surcharge, a real-estate excise, a dedicated property levy, or a county-wide marginal income tax. The accumulation curve is the same. The drift curve is the same. The pattern is not a property of any one bureau or revenue mechanism.
      </p>

      <h2>3. Carryover is the governance event</h2>
      <p>
        In every fund on this site, the policy event that created drift was the moment a multi-year carryover became unavoidable. Carryover is treated in bureau memos as a neutral fact — a balance to be allocated. It is a governable surplus that creates standing pressure to redefine eligible uses.
      </p>

      <h2>4. Audit findings are absorbed</h2>
      <p>
        The City Auditor and County Auditor have, across the seven funds, produced findings that name the structural problem in plain language: collection-cost overruns, scope expansions, surplus carryover, compliance-rate gaps. In nearly every case, the bureau response is to amend the definition that produced the finding rather than to change the practice.
      </p>

      <h2>5. The remedy is structural</h2>
      <p>
        The remedy is in the enabling code: a sunset on each restricted fund, a public spend-down plan tied to verifiable beneficiary outcomes, and a hard ceiling on carryover beyond which the council must either disburse or return.
      </p>
    </div>
    <aside class="margin-note">
      <h4>— Ron Bronson</h4>
      <p>
        Public Capacity Lab<br />
        State Capacity AI
      </p>
      <p style="margin-top: 14px">
        <a href="{base}/methodology/">Methodology →</a>
      </p>
    </aside>
  </section>

  <section class="container">
    <ShareBlock
      headline="The pattern across seven Portland-area restricted funds is consistent enough to name."
      summary="How voter-passed dollars accumulate, get redefined, and end up elsewhere. PDX Spend."
      url={siteUrl('/implications/')}
    />
  </section>

  <section class="container fund-nav">
    <a class="nav-back" href="{base}/methodology/">← Methodology</a>
    <a class="nav-back" href="{base}/about/">About →</a>
  </section>
</article>
