<script lang="ts">
  import { base } from '$app/paths';
  import StackedBarChart from '$lib/components/StackedBarChart.svelte';
  import ChartFrame from '$lib/components/ChartFrame.svelte';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
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
</script>

<SiteMeta
  title="Dashboard — PDX Spend"
  description="All seven Portland-area voter funds in one frame. Three views: dollars, share re-aimed, and how much each is still on-mission."
  path="/dashboard/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">DASHBOARD · ALL SEVEN FUNDS</p>
    <h1 class="article-title">All seven funds, side by side</h1>
    <p class="article-deck">
      Same dollars, three angles. Switch between absolute balance, share re-aimed, and how much each fund is still on-mission.
    </p>
  </header>

  <section class="container">
    <div class="dash-controls">
      <div class="seg" role="group" aria-label="Choose dashboard view">
        <button type="button" aria-pressed={mode === 'dollars'} class:active={mode === 'dollars'} onclick={() => (mode = 'dollars')}>Dollars</button>
        <button type="button" aria-pressed={mode === 'percent'} class:active={mode === 'percent'} onclick={() => (mode = 'percent')}>Share re-aimed</button>
        <button type="button" aria-pressed={mode === 'trajectory'} class:active={mode === 'trajectory'} onclick={() => (mode = 'trajectory')}>Still on-mission</button>
      </div>
      <div class="dash-summary">
        <span><strong>{formatUSD(TOTAL_MODELED_BALANCE)}</strong> sitting today</span>
        <span class="accent"><strong>{formatUSD(TOTAL_MOVABLE)}</strong> already re-aimed</span>
        <span>{Math.round((TOTAL_MOVABLE / TOTAL_MODELED_BALANCE) * 100)}% across the seven</span>
      </div>
    </div>
  </section>

  <section class="container-wide">
    <ChartFrame
      title={mode === 'dollars' ? 'Balance by fund' : mode === 'percent' ? 'Share re-aimed, by fund' : 'Share still on-mission, by fund'}
      sub={mode === 'trajectory' ? '100% means a fund is still spending entirely on what voters approved.' : 'Sorted by absolute balance. Click a fund to open it.'}
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
    <h2 class="section-title">Pick a fund</h2>
    <div class="dash-table-wrap">
      <table class="dash-table">
        <thead>
          <tr>
            <th>Fund</th>
            <th>Passed</th>
            <th>Sitting</th>
            <th>On-mission</th>
            <th>Re-aimed</th>
            <th>Off-mission</th>
            <th><span class="sr-only">Open fund detail</span></th>
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
              <td><a href="{base}/funds/{r.slug}/">open →</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

</article>
