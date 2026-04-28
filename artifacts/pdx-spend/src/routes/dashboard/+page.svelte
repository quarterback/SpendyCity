<script lang="ts">
  import { base } from '$app/paths';
  import StackedBarChart from '$lib/components/StackedBarChart.svelte';
  import ChartFrame from '$lib/components/ChartFrame.svelte';
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

<svelte:head>
  <title>Cross-fund dashboard — PDX Spend</title>
</svelte:head>

<article>
  <header class="container fund-header">
    <p class="kicker">DASHBOARD · ALL SEVEN FUNDS</p>
    <h1 class="article-title">Cross-fund dashboard</h1>
    <p class="article-deck">
      Three views of the same seven funds — by absolute carry, by share of carry that has been made movable, and by trajectory of drift from the original voter intent.
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
        <span><strong>{formatUSD(TOTAL_MODELED_BALANCE)}</strong> total modeled carry</span>
        <span class="accent"><strong>{formatUSD(TOTAL_MOVABLE)}</strong> movable</span>
        <span>{Math.round((TOTAL_MOVABLE / TOTAL_MODELED_BALANCE) * 100)}% of total now movable</span>
      </div>
    </div>
  </section>

  <section class="container-wide">
    <ChartFrame
      title={mode === 'dollars' ? 'Modeled carry by fund' : mode === 'percent' ? 'Share of carry: restricted vs. movable' : 'Drift trajectory: modeled actual disposition vs. voter intent'}
      sub={mode === 'trajectory' ? 'Bars at 100% would mean fund is operated entirely on original voter intent.' : 'Sorted by absolute modeled carry. Click a fund label or row to open its page.'}
      source="Modeled reconstruction (PDX Spend)"
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
          <th>Modeled carry</th>
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
        The dashboard is intended to be embedded in newsroom, civic-org, or analyst posts. Copy the snippet on the right. The chart will render at full width inside the iframe and respect the container's responsive width.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Embed snippet</h4>
      <pre class="snippet">{embedSnippet}</pre>
      <button class="copy-btn" onclick={copyEmbed}>{copied ? 'Copied' : 'Copy snippet'}</button>
    </aside>
  </section>
</article>
