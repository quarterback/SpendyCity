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
</script>

<SiteMeta
  title="PDX Spend — Seven funds, modeled in plain view"
  description="An editorial accounting of seven voter-restricted funds in Portland and Multnomah County: where the money came from, what it was promised for, and what it now does."
  path="/"
  type="website"
/>

<article>
  <section class="hero container">
    <p class="kicker">PDX SPEND · ISSUE 01 · MODELED FIGURES</p>
    <h1 class="hero-title">
      Seven voter-passed funds in Portland and Multnomah County have been quietly redrawn around their balances.
    </h1>
    <p class="hero-deck">
      Each was sold as a fix to a specific civic problem — arts, climate, housing, preschool, homelessness. Each now carries a multi-million-dollar surplus, an audit trail of scope-broadening votes, and a public ledger that lives in PDF appendices. This is what the structural pattern looks like when you draw it.
    </p>
  </section>

  <section class="hero-figure container-wide">
    <ChartFrame
      title="Modeled year-end carry across the seven funds"
      sub="Black blocks are dollars still restricted to the original voter intent. Burnt-orange caps are dollars that have been reclassified, swept, or otherwise made movable."
      source="Modeled reconstruction (PDX Spend)"
      pngName="pdxspend-hero.png"
      csvHeaders={csvHeaders}
      csvRows={csvRows}
    >
      {#snippet children({ register })}
        <HeroChart rows={heroRows} {register} />
      {/snippet}
    </ChartFrame>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>What you are looking at</h2>
      <p>
        Public funding measures in Portland and Multnomah County share a recurring shape: a measure passes with a clear, narrow charge; collections come in faster than the standing-up of the program; balances accumulate; and within four to seven years, ordinances and resolutions begin to broaden what those dollars are allowed to do.
      </p>
      <p>
        The seven funds on this page span fifteen years of measures, three jurisdictions of stewardship, and almost every kind of revenue instrument the city uses — flat per-adult tax, gross-receipts surcharge, real-estate excise, dedicated property levy, county-wide marginal income tax. They behave the same way.
      </p>
      <h2>What is modeled</h2>
      <p>
        Cash positions, audit annotations, and disposition curves on this site are <em>modeled</em>. They are constructed to illustrate the structural pattern that is documented across audits, council actions, and reporting on these funds. They are not a live ledger and should not be cited as such. The corpus team is working on a published-figures version; this site will swap to it when it ships.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Read the issue</h4>
      <p>
        Each fund has its own page with a chart-driven scrollytelling read. The dashboard shows them side-by-side. The agent demo runs a structured-finance prompt against the modeled record.
      </p>
      <p style="margin-top: 14px">
        <strong>Stewards across:</strong> City of Portland Revenue Division, Multnomah County, Metro, Portland Housing Bureau, Bureau of Planning and Sustainability, Office of Management and Finance.
      </p>
    </aside>
  </section>

  <section class="container">
    <p class="kicker">SUMMARY · SEVEN FUNDS</p>
    <div class="big-stats">
      <div class="big-stat">
        <p class="num">{formatUSD(TOTAL_CUMULATIVE_COLLECTED)}</p>
        <p class="lbl">Modeled cumulative collected, all funds</p>
      </div>
      <div class="big-stat">
        <p class="num">{formatUSD(TOTAL_MODELED_BALANCE)}</p>
        <p class="lbl">Modeled current carry across the seven</p>
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
      <h2 class="section-title">Latest agent memos across the seven funds</h2>
      <p class="section-deck">
        Each card pulls from the most recent succeeded weekly memo for that
        fund. The full memo, byline, and run history live on the fund page.
      </p>
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
    <p class="kicker">ISSUE INDEX · BEGIN HERE</p>
    <h2 class="section-title">The seven funds</h2>
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

  <section class="container two-col">
    <div class="prose">
      <h2>How to read this</h2>
      <p>
        Each fund page opens with a single chart and a short read. Scroll, and the chart annotates itself with the audit events, council resolutions, and fiscal moves that produced the shape on screen. At the bottom of each page is the agent's structured memo — the kind of document a public-finance officer would write if they were asked to inventory the fund honestly.
      </p>
      <p>
        The dashboard view pulls all seven into one frame, switchable between dollars, percent restricted, and trajectory of drift. The methodology and implications pages explain how this site was constructed, and what it suggests about how restricted funds are governed in this jurisdiction.
      </p>
    </div>
    <aside class="margin-note">
      <h4>A note on tone</h4>
      <p>
        This site is published as journalism, not advocacy. There are no calls to action. The figures are modeled and labeled as such. The authorial position is that voters who pass restricted-fund measures are entitled to a clear public accounting of what those funds become. This is one such accounting.
      </p>
    </aside>
  </section>

  <section class="container">
    <ShareBlock
      headline="Seven voter-passed funds in Portland and Multnomah County have been quietly redrawn around their balances."
      summary="An editorial accounting of where the money came from, what it was promised for, and what it now does. Modeled figures, labeled as such."
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
