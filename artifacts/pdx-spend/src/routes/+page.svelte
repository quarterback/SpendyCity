<script lang="ts">
  import { base } from '$app/paths';
  import HeroChart from '$lib/components/HeroChart.svelte';
  import ChartFrame from '$lib/components/ChartFrame.svelte';
  import SparkBalance from '$lib/components/SparkBalance.svelte';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import ShareBlock from '$lib/components/ShareBlock.svelte';
  import { siteUrl } from '$lib/config';
  import {
    FUNDS,
    FUND_BY_SLUG,
    TOTAL_MODELED_BALANCE,
    TOTAL_RESTRICTED,
    TOTAL_MOVABLE,
    TOTAL_CUMULATIVE_COLLECTED
  } from '$lib/data/funds';
  import { formatUSD } from '$lib/utils/format';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const latestWeekly = $derived(data.latestWeekly);

  function fmtDate(d: Date | null | undefined): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  const heroRows = FUNDS.map((f) => ({
    shortName: f.shortName,
    balance: f.modeledBalance,
    movable: f.modeledBalance * f.modeledMovableShare,
    restricted: f.modeledBalance * f.modeledRestrictedShare
  }));

  const csvHeaders = ['Fund', 'Balance', 'Restricted', 'Movable'];
  const csvRows = heroRows.map((r) => [r.shortName, Math.round(r.balance), Math.round(r.restricted), Math.round(r.movable)]);

  const movablePct = Math.round((TOTAL_MOVABLE / TOTAL_MODELED_BALANCE) * 100);
</script>

<SiteMeta
  title="PDX Spend — Seven Portland-area voter funds, in plain view"
  description="Seven voter-passed funds in Portland and Multnomah County hold {formatUSD(TOTAL_MODELED_BALANCE)} in carry. {movablePct}% has been reclassified since enactment."
  path="/"
  type="website"
/>

<article>
  <section class="hero container">
    <p class="kicker">PDX SPEND · ISSUE 01</p>
    <h1 class="hero-title">
      Seven Portland-area voter funds hold {formatUSD(TOTAL_MODELED_BALANCE)}. {movablePct}% has been reclassified since enactment.
    </h1>
    <p class="hero-deck">
      Arts, climate, housing, preschool, homelessness. Each fund accumulated a surplus. Each surplus became governable. This is what that looks like, drawn.
    </p>
  </section>

  <section class="hero-figure container-wide">
    <ChartFrame
      title="Year-end carry across the seven funds"
      sub="Year-end balance by fund, split between original-intent and reclassified dollars."
      source="PDX Spend"
      modeled={true}
      pngName="pdxspend-hero.png"
      csvHeaders={csvHeaders}
      csvRows={csvRows}
    >
      {#snippet children({ register })}
        <HeroChart rows={heroRows} {register} />
      {/snippet}
    </ChartFrame>
  </section>

  <section class="container">
    <p class="kicker">SUMMARY · SEVEN FUNDS</p>
    <div class="big-stats">
      <div class="big-stat">
        <p class="num">{formatUSD(TOTAL_CUMULATIVE_COLLECTED)}</p>
        <p class="lbl">Cumulative collected, all funds</p>
      </div>
      <div class="big-stat">
        <p class="num">{formatUSD(TOTAL_MODELED_BALANCE)}</p>
        <p class="lbl">Current carry across the seven</p>
      </div>
      <div class="big-stat">
        <p class="num">{formatUSD(TOTAL_RESTRICTED)}</p>
        <p class="lbl">Still tied to original voter intent</p>
      </div>
      <div class="big-stat">
        <p class="num accent">{formatUSD(TOTAL_MOVABLE)}</p>
        <p class="lbl">Reclassified, swept, or made movable</p>
      </div>
    </div>
  </section>

  {#if latestWeekly.length > 0}
    <section class="container changed-this-week">
      <p class="kicker">WHAT CHANGED THIS WEEK</p>
      <h2 class="section-title">Latest memos</h2>
      <div class="changed-grid">
        {#each latestWeekly as item}
          {@const fund = FUND_BY_SLUG[item.fundSlug]}
          {#if fund}
            <a class="changed-card" href="{base}/funds/{item.fundSlug}/">
              <p class="changed-meta">
                {fund.shortName} ·
                {fmtDate(item.output.publishedAt ?? item.output.createdAt)}
              </p>
              {#if 'headline' in item && item.headline}
                <h3 class="changed-headline">{item.headline}</h3>
              {:else}
                <h3 class="changed-headline">{fund.name}</h3>
              {/if}
              <div class="changed-excerpt">{@html item.excerptHtml}</div>
              <p class="changed-cta">Read the memo →</p>
            </a>
          {/if}
        {/each}
      </div>
    </section>
  {/if}

  <section class="container">
    <p class="kicker">SEVEN FUNDS</p>
    <h2 class="section-title">The funds</h2>
    <div class="fund-grid">
      {#each FUNDS as fund}
        <a class="fund-card" href="{base}/funds/{fund.slug}/">
          <p class="fund-meta">{fund.enacted} · {fund.ballotMeasure ?? fund.enablingCode}</p>
          <h3 class="fund-name">{fund.name}</h3>
          <p class="fund-deck">{fund.oneLineStatus}</p>
          <div class="fund-spark">
            <SparkBalance data={fund.cashSeries} />
          </div>
          <div class="fund-stats">
            <span>{formatUSD(fund.modeledBalance)} carry</span>
            <span class="accent">{Math.round(fund.modeledMovableShare * 100)}% movable</span>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="container">
    <ShareBlock
      headline="Seven Portland-area voter funds hold {formatUSD(TOTAL_MODELED_BALANCE)}. {movablePct}% has been reclassified since enactment."
      summary="Fifteen years of voter-passed restricted funds, drawn in plain view. PDX Spend."
      url={siteUrl('/')}
    />
  </section>
</article>

<style>
  .changed-this-week {
    margin-top: 32px;
  }
  .changed-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin-top: 18px;
  }
  .changed-card {
    display: block;
    padding: 18px 20px 16px;
    border: 1px solid var(--rule, #d4cfc4);
    background: var(--paper, #fbf8f1);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }
  .changed-card:hover {
    border-color: var(--accent, #c0501e);
    transform: translateY(-1px);
  }
  .changed-meta {
    margin: 0 0 6px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-muted, #6b6357);
  }
  .changed-headline {
    margin: 0 0 8px;
    font-family: var(--font-serif, Georgia, serif);
    font-size: 19px;
    line-height: 1.25;
  }
  .changed-excerpt {
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink, #1a1714);
    max-height: 9em;
    overflow: hidden;
  }
  .changed-excerpt :global(p) {
    margin: 0 0 8px;
  }
  .changed-excerpt :global(ul),
  .changed-excerpt :global(ol) {
    margin: 0 0 8px 18px;
  }
  .changed-cta {
    margin: 12px 0 0;
    font-size: 13px;
    color: var(--accent, #c0501e);
    font-weight: 600;
  }
</style>
