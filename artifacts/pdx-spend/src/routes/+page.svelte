<script lang="ts">
  import { base } from '$app/paths';
  import HeroChart from '$lib/components/HeroChart.svelte';
  import ChartFrame from '$lib/components/ChartFrame.svelte';
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

  const movablePct = TOTAL_MODELED_BALANCE > 0
    ? Math.round((TOTAL_MOVABLE / TOTAL_MODELED_BALANCE) * 100)
    : 0;

  // Pull the live blocker example from PCEF (the Moda Center proposal).
  const headlineBlockerNews = FUND_BY_SLUG.pcef?.blockerNews ?? '';
</script>

<SiteMeta
  title="PDX Spend — What Portland's voter funds could pay for, and what's blocking them"
  description="Seven Portland-area voter funds hold {formatUSD(TOTAL_MODELED_BALANCE)}. See what each one could pay for tomorrow, and the named rule blocking it."
  path="/"
  type="website"
/>

<article>
  <section class="hero container">
    <p class="kicker">PDX SPEND</p>
    <h1 class="hero-title">
      Seven Portland-area voter funds. What they could pay for, and what&rsquo;s blocking it.
    </h1>
    <p class="headline-figure">{formatUSD(TOTAL_MODELED_BALANCE)}</p>
    <p class="headline-figure-sub">
      sits across the seven funds today. About {movablePct}% of it has been re-aimed away from what voters approved.
    </p>

    {#if headlineBlockerNews}
      <div class="stop-banner">
        <p class="lbl">Live example, this month</p>
        <p>{headlineBlockerNews}</p>
      </div>
    {/if}

    <p class="hero-deck">
      Pick a fund. See what it could pay for at its current balance. See who controls the rule that stops it. Send the page to that person.
    </p>
  </section>

  <section class="hero-figure container-wide">
    <ChartFrame
      title="Year-end balance, all seven funds"
      sub="Each bar is one fund. The orange share is the part already re-aimed."
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
    <p class="section-eyebrow">The seven, totaled</p>
    <div class="big-stats">
      <div class="big-stat">
        <p class="num">{formatUSD(TOTAL_CUMULATIVE_COLLECTED)}</p>
        <p class="lbl">Collected from you, all years</p>
      </div>
      <div class="big-stat">
        <p class="num">{formatUSD(TOTAL_MODELED_BALANCE)}</p>
        <p class="lbl">Sitting in the funds today</p>
      </div>
      <div class="big-stat">
        <p class="num">{formatUSD(TOTAL_RESTRICTED)}</p>
        <p class="lbl">Still aimed where you voted</p>
      </div>
      <div class="big-stat">
        <p class="num accent">{formatUSD(TOTAL_MOVABLE)}</p>
        <p class="lbl">Re-aimed since you voted</p>
      </div>
    </div>
  </section>

  <section class="container how-to">
    <p class="section-eyebrow">How to use this site</p>
    <ol class="how-list">
      <li>
        <span class="step-n">1</span>
        <p><strong>Pick a fund.</strong> Each page opens with what you voted for, in plain words.</p>
      </li>
      <li>
        <span class="step-n">2</span>
        <p><strong>Read what it could pay for.</strong> Concrete units, grounded in published unit costs.</p>
      </li>
      <li>
        <span class="step-n">3</span>
        <p><strong>Read who controls the blocker.</strong> Every blocker names a defense and a rebuttal. Send the page to the office that holds the lever.</p>
      </li>
    </ol>
  </section>

  {#if latestWeekly.length > 0}
    <section class="container changed-this-week">
      <p class="section-eyebrow">What changed this week</p>
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
    <p class="section-eyebrow">The seven funds</p>
    <h2 class="section-title">Pick one to open it</h2>
    <div class="fund-grid">
      {#each FUNDS as fund}
        {@const topCould = fund.couldFund?.[0]}
        {@const topBlocker = fund.blockers?.[0]}
        <a class="fund-card" href="{base}/funds/{fund.slug}/">
          <p class="fund-meta">{fund.enacted} · {fund.ballotMeasure ?? fund.enablingCode}</p>
          <h3 class="fund-name">{fund.name}</h3>
          <p class="fund-balance">{formatUSD(fund.modeledBalance)} <span class="lbl">sitting</span></p>
          {#if topCould}
            <p class="fund-line">
              <span class="lbl">Could pay for</span>
              {topCould.item}
            </p>
          {/if}
          {#if topBlocker}
            <p class="fund-line blocker">
              <span class="lbl">Blocked by</span>
              {topBlocker.name}
            </p>
          {/if}
          <p class="fund-stats">
            <span class="accent">{Math.round(fund.modeledMovableShare * 100)}% re-aimed</span>
          </p>
        </a>
      {/each}
    </div>
  </section>

  <section class="container">
    <ShareBlock
      headline="Seven Portland voter funds hold {formatUSD(TOTAL_MODELED_BALANCE)}. Here&rsquo;s what each one could pay for, and what&rsquo;s blocking it."
      summary="Pick a fund. See what it could buy. See who controls the rule that stops it. PDX Spend."
      url={siteUrl('/')}
    />
  </section>
</article>

<style>
  .changed-this-week { margin-top: 32px; }
  .changed-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin-top: 18px;
  }
  .changed-card {
    display: block;
    padding: 18px 20px 16px;
    border: 1px solid var(--rule);
    background: var(--paper);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }
  .changed-card:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .changed-meta {
    margin: 0 0 6px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-4);
  }
  .changed-headline {
    margin: 0 0 8px;
    font-family: var(--serif);
    font-size: 19px;
    line-height: 1.25;
  }
  .changed-excerpt {
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink-2);
    max-height: 9em;
    overflow: hidden;
  }
  .changed-excerpt :global(p) { margin: 0 0 8px; }
  .changed-excerpt :global(ul),
  .changed-excerpt :global(ol) { margin: 0 0 8px 18px; }
  .changed-cta {
    margin: 12px 0 0;
    font-size: 13px;
    color: var(--accent);
    font-weight: 600;
  }

  .how-to { margin-top: 1.5rem; }
  .how-list {
    list-style: none;
    padding: 0;
    margin: 0.6rem 0 2.4rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    border-top: 1px solid var(--ink);
    padding-top: 1.2rem;
  }
  .how-list li {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
  }
  .step-n {
    font-family: var(--mono, monospace);
    font-size: 1.6rem;
    color: var(--accent);
    line-height: 1;
    flex-shrink: 0;
    min-width: 1.8rem;
  }
  .how-list p {
    margin: 0;
    font-family: var(--serif, Georgia, serif);
    font-size: 1rem;
    line-height: 1.45;
    color: var(--ink-2);
    max-width: none;
  }
  @media (max-width: 720px) {
    .how-list { grid-template-columns: 1fr; gap: 0.8rem; }
  }
</style>
