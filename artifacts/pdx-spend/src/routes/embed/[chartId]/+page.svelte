<script lang="ts">
  import { SITE_URL } from '$lib/config';
  import { FUNDS } from '$lib/data/funds';
  import HeroChart from '$lib/components/HeroChart.svelte';
  import AnnotatedLineChart from '$lib/components/AnnotatedLineChart.svelte';
  import DivergingBarChart from '$lib/components/DivergingBarChart.svelte';
  import ReserveStream from '$lib/components/ReserveStream.svelte';
  import DriftTimeline from '$lib/components/DriftTimeline.svelte';
  import StackedBarChart from '$lib/components/StackedBarChart.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const { meta, fund } = $derived(data);

  const heroRows = FUNDS.map((f) => ({
    shortName: f.shortName,
    balance: f.modeledBalance,
    movable: f.modeledBalance * f.modeledMovableShare,
    restricted: f.modeledBalance * f.modeledRestrictedShare
  }));

  const dashRows = FUNDS.map((f) => ({
    slug: f.slug,
    shortName: f.shortName,
    balance: f.modeledBalance,
    restricted: f.modeledBalance * f.modeledRestrictedShare,
    movable: f.modeledBalance * f.modeledMovableShare,
    cumulativeCollected: f.cumulativeCollected,
    enacted: f.enacted,
    drift: f.drift[f.drift.length - 1]?.actualUse ?? 100
  }));

  const sourcePageUrl = $derived(`${SITE_URL}${meta.sourcePage}`);
</script>

<svelte:head>
  <title>{meta.title} — PDX Spend</title>
  <meta name="description" content={meta.sub} />
</svelte:head>

<div class="embed-root">
  <div class="embed-body">
    <div class="embed-header">
      <p class="embed-title">{meta.title}</p>
      {#if meta.sub}<p class="embed-sub">{meta.sub}</p>{/if}
    </div>

    <div class="embed-chart">
      {#if meta.chartType === 'hero'}
        <HeroChart rows={heroRows} />
      {:else if meta.chartType === 'dashboard'}
        <StackedBarChart rows={dashRows} mode="dollars" />
      {:else if meta.chartType === 'cash' && fund}
        <AnnotatedLineChart data={fund.cashSeries} events={fund.auditEvents} />
      {:else if meta.chartType === 'promise' && fund}
        <DivergingBarChart data={fund.promiseVsHappened} />
      {:else if meta.chartType === 'reserve' && fund}
        <ReserveStream series={fund.reserveSeries} />
      {:else if meta.chartType === 'drift' && fund}
        <DriftTimeline drift={fund.drift} />
      {/if}
    </div>

    <footer class="embed-credit">
      <span class="embed-credit-source">Source · {meta.source}</span>
      <a
        class="embed-credit-link"
        href={sourcePageUrl}
        target="_blank"
        rel="noopener noreferrer"
      >PDX Spend · pdxspend.replit.app</a>
    </footer>
  </div>
</div>

<style>
  .embed-root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--paper, #fbf8f1);
    color: var(--ink, #1a1714);
    font-family: var(--font-sans, system-ui, sans-serif);
  }

  .embed-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 16px 20px 0;
  }

  .embed-header {
    margin-bottom: 10px;
  }

  .embed-title {
    margin: 0 0 4px;
    font-family: var(--font-serif, Georgia, serif);
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    color: var(--ink, #1a1714);
  }

  .embed-sub {
    margin: 0;
    font-size: 12px;
    color: var(--ink-muted, #6b6357);
    line-height: 1.4;
  }

  .embed-chart {
    flex: 1;
  }

  .embed-credit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
    border-top: 1px solid var(--rule, #d4cfc4);
    margin-top: 10px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10px;
    letter-spacing: 0.04em;
    color: var(--ink-muted, #6b6357);
    flex-shrink: 0;
  }

  .embed-credit-source {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .embed-credit-link {
    color: var(--accent, #c0501e);
    text-decoration: none;
    white-space: nowrap;
    font-weight: 600;
    flex-shrink: 0;
  }

  .embed-credit-link:hover {
    text-decoration: underline;
  }
</style>
