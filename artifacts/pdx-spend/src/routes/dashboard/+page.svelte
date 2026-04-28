<script lang="ts">
  import { base } from '$app/paths';
  import StackedBarChart from '$lib/components/StackedBarChart.svelte';
  import ChartFrame from '$lib/components/ChartFrame.svelte';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import ShareBlock from '$lib/components/ShareBlock.svelte';
  import { siteUrl } from '$lib/config';
  import { FUNDS, TOTAL_MODELED_BALANCE, TOTAL_MOVABLE } from '$lib/data/funds';
  import { formatUSD } from '$lib/utils/format';

  let mode = $state<'dollars' | 'percent' | 'trajectory'>('dollars');

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

  const csvHeaders = ['Fund', 'Balance', 'Restricted', 'Movable', 'Drift_Pct'];
  const csvRows = rows.map((r) => [r.shortName, Math.round(r.balance), Math.round(r.restricted), Math.round(r.movable), Math.round(r.drift)]);

  const embedSnippet = `<iframe src="https://pdxspend.replit.app/dashboard/" width="100%" height="640" style="border:1px solid #161513"></iframe>`;
  let copied = $state(false);
  function copyEmbed() {
    navigator.clipboard.writeText(embedSnippet).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 1800);
    });
  }
</script>

<SiteMeta
  title="Dashboard — PDX Spend"
  description="All seven voter-restricted funds in one frame. Switch between dollars, share restricted, and drift trajectory."
  path="/dashboard/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">DASHBOARD · ALL SEVEN FUNDS</p>
    <h1 class="article-title">Cross-fund dashboard</h1>
    <p class="article-deck">
      Three views of the same seven funds: absolute carry, share made movable, and drift from voter intent.
    </p>
  </header>

  <section class="container">
    <div class="dash-controls">
      <div class="seg">
        <button class:active={mode === 'dollars'} onclick={() => (mode = 'dollars')}>Dollars</button>
        <button class:active={mode === 'percent'} onclick={() => (mode = 'percent')}>% Restricted vs. movable</button>
        <button class:active={mode === 'trajectory'} onclick={() => (mode = 'trajectory')}>Drift trajectory</button>
      </div>
      <div class="dash-summary">
        <span><strong>{formatUSD(TOTAL_MODELED_BALANCE)}</strong> total carry</span>
        <span class="accent"><strong>{formatUSD(TOTAL_MOVABLE)}</strong> movable</span>
        <span>{Math.round((TOTAL_MOVABLE / TOTAL_MODELED_BALANCE) * 100)}% of total now movable</span>
      </div>
    </div>
  </section>

  <section class="container-wide">
    <ChartFrame
      title={mode === 'dollars' ? 'Carry by fund' : mode === 'percent' ? 'Restricted vs. movable, by fund' : 'Drift trajectory by fund'}
      sub={mode === 'trajectory' ? '100% means fund operates entirely within original voter intent.' : 'Sorted by absolute carry. Click a fund to open its page.'}
      source="PDX Spend"
      modeled={true}
      pngName="dashboard-{mode}.png"
      csvHeaders={csvHeaders}
      csvRows={csvRows}
    >
      {#snippet children({ register })}
        <StackedBarChart {rows} {mode} {register} />
      {/snippet}
    </ChartFrame>
  </section>

  <section class="container">
    <h2 class="section-title">Fund index</h2>
    <table class="dash-table">
      <thead>
        <tr>
          <th>Fund</th>
          <th>Enacted</th>
          <th>Carry</th>
          <th>Restricted</th>
          <th>Movable</th>
          <th>Drift</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r}
          <tr>
            <td>{r.shortName}</td>
            <td>{r.enacted}</td>
            <td class="num">{formatUSD(r.balance)}</td>
            <td class="num">{formatUSD(r.restricted)}</td>
            <td class="num accent">{formatUSD(r.movable)}</td>
            <td class="num">{Math.round(100 - r.drift)}%</td>
            <td><a href="{base}/funds/{r.slug}/">read →</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Embed this dashboard</h2>
      <p>
        Copy the snippet at right. The chart renders at full width inside the iframe and respects the container's responsive width.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Embed snippet</h4>
      <pre class="snippet">{embedSnippet}</pre>
      <button class="copy-btn" onclick={copyEmbed}>{copied ? 'Copied' : 'Copy snippet'}</button>
    </aside>
  </section>

  <section class="container">
    <ShareBlock
      headline="Seven Portland-area restricted funds in one frame."
      summary="Switch between dollars, share restricted, and drift trajectory. Embeddable. PDX Spend."
      url={siteUrl('/dashboard/')}
    />
  </section>
</article>
