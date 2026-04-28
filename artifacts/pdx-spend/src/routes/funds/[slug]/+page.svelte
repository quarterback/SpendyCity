<script lang="ts">
  import { base } from '$app/paths';
  import AnnotatedLineChart from '$lib/components/AnnotatedLineChart.svelte';
  import DivergingBarChart from '$lib/components/DivergingBarChart.svelte';
  import ReserveStream from '$lib/components/ReserveStream.svelte';
  import DriftTimeline from '$lib/components/DriftTimeline.svelte';
  import ChartFrame from '$lib/components/ChartFrame.svelte';
  import Scrolly from '$lib/components/Scrolly.svelte';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import ShareBlock from '$lib/components/ShareBlock.svelte';
  import AgentMemoBlock from '$lib/components/AgentMemoBlock.svelte';
  import RunHistory from '$lib/components/RunHistory.svelte';
  import { siteUrl } from '$lib/config';
  import { formatUSD, formatPct } from '$lib/utils/format';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const fund = $derived(data.fund);
  const weeklyMemo = $derived(data.weeklyMemo);
  const monthlyCashFlow = $derived(data.monthlyCashFlow);
  const runs = $derived(data.runs);

  let activeStep = $state(0);

  const steps = $derived(
    fund.auditEvents.map((e) => ({
      year: e.year,
      label: e.label,
      body: e.body,
      source: e.source
    }))
  );

  const activeYear = $derived(steps[activeStep]?.year ?? null);

  const cashCsvHeaders = ['Year', 'Balance', 'Obligated', 'Inflow', 'Spent'];
  const cashCsvRows = $derived(
    fund.cashSeries.map((c) => [c.year, Math.round(c.balance), Math.round(c.obligated), Math.round(c.inflow), Math.round(c.spent)])
  );

  const promiseCsvHeaders = ['Cycle', 'Promised', 'Delivered', 'Gap'];
  const promiseCsvRows = $derived(
    fund.promiseVsHappened.map((p) => [p.cycle, Math.round(p.promised), Math.round(p.delivered), Math.round(p.promised - p.delivered)])
  );
</script>

<SiteMeta
  title={`${fund.name} — PDX Spend`}
  description={fund.oneLineStatus}
  path={`/funds/${fund.slug}/`}
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">FUND · {fund.enacted} · {fund.ballotMeasure ?? fund.enablingCode}</p>
    <h1 class="article-title">{fund.name}</h1>
    <p class="article-deck">{fund.scandal}</p>
    <dl class="fund-meta-grid">
      <div><dt>Enabling code</dt><dd>{fund.enablingCode}</dd></div>
      <div><dt>Collector</dt><dd>{fund.collector}</dd></div>
      <div><dt>Steward</dt><dd>{fund.steward}</dd></div>
      <div><dt>Cadence</dt><dd>{fund.collectionsCadence}</dd></div>
      <div><dt>Restriction class</dt><dd>{fund.restrictionClass}</dd></div>
      <div><dt>Carry</dt><dd>{formatUSD(fund.modeledBalance)}</dd></div>
      <div><dt>Restricted share</dt><dd>{formatPct(fund.modeledRestrictedShare)}</dd></div>
      <div><dt>Movable share</dt><dd class="accent">{formatPct(fund.modeledMovableShare)}</dd></div>
    </dl>
  </header>

  <section class="container two-col">
    <div class="prose">
      <p class="lede">
        <strong>Voter intent.</strong> {fund.voterIntent}
      </p>
      <p>
        {fund.enablingCode} passed in {fund.enacted}. The chart below traces each year-end balance, annotated with the audit findings and council actions that produced its current shape.
      </p>
    </div>
    <aside class="margin-note">
      <h4>{fund.enablingCode}</h4>
      <p>
        Collector: {fund.collector}. Steward: {fund.steward}. Cadence: {fund.collectionsCadence}.
      </p>
    </aside>
  </section>

  <section class="container-wide scrolly-section">
    <div class="scrolly-grid">
      <div class="scrolly-sticky">
        <ChartFrame
          title="Cash position with audit annotations"
          sub="Year-end balance, with auditor findings and council actions marked."
          source="PDX Spend"
          modeled={true}
          pngName="{fund.slug}-cash.png"
          csvHeaders={cashCsvHeaders}
          csvRows={cashCsvRows}
        >
          {#snippet children({ register })}
            <AnnotatedLineChart data={fund.cashSeries} events={fund.auditEvents} activeYear={activeYear} {register} />
          {/snippet}
        </ChartFrame>
      </div>

      <Scrolly onstep={(i) => (activeStep = i)}>
        {#each steps as step, i}
          <div class="step" class:active={i === activeStep}>
            <p class="step-year">{step.year}</p>
            <h3 class="step-label">{step.label}</h3>
            <p class="step-body">{step.body}</p>
            {#if step.source}<p class="step-source">{step.source}</p>{/if}
          </div>
        {/each}
      </Scrolly>
    </div>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Promise versus delivery</h2>
      <p>
        Each bar pair shows a plan cycle's committed dollars against what shipped. The gap flows into carryover.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Carryover and scope</h4>
      <p>
        A persistent delivery gap produces a structural surplus. Surplus becomes governable. Ordinances follow.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Promised vs. delivered, by fiscal cycle"
      sub="Committed plan dollars against actual disbursements, by cycle."
      source="PDX Spend"
      modeled={true}
      pngName="{fund.slug}-promise.png"
      csvHeaders={promiseCsvHeaders}
      csvRows={promiseCsvRows}
    >
      {#snippet children({ register })}
        <DivergingBarChart data={fund.promiseVsHappened} {register} />
      {/snippet}
    </ChartFrame>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Reserve growth</h2>
      <p>
        When delivery lags collection, the residual accumulates as an unobligated reserve. Council staff have the ordinance discretion to redirect it.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Unobligated reserve</h4>
      <p>
        The share of the fund neither spent nor formally committed to a contract or grant — the available headroom for any future scope-broadening vote.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Unobligated reserve over time"
      source="PDX Spend"
      modeled={true}
      pngName="{fund.slug}-reserve.png"
    >
      {#snippet children({ register })}
        <ReserveStream series={fund.reserveSeries} {register} />
      {/snippet}
    </ChartFrame>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Drift from voter intent</h2>
      <p>
        100% means every dollar maps to the original ballot text. Each post-enactment ordinance that moves dollars off the original-intent baseline lowers the index.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Drift index</h4>
      <p>
        Scored by reading each post-enactment ordinance against the ballot text. The score compounds forward from the first scope-broadening vote.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Drift index — actual disposition vs. voter intent"
      source="PDX Spend"
      modeled={true}
      pngName="{fund.slug}-drift.png"
    >
      {#snippet children({ register })}
        <DriftTimeline drift={fund.drift} {register} />
      {/snippet}
    </ChartFrame>
  </section>

  {#if weeklyMemo}
    <AgentMemoBlock
      kicker={`WEEKLY MEMO · ${fund.shortName.toUpperCase()}`}
      title="What changed this week"
      deck="A structured-finance read of the corpus on file for this fund, cited inline against documents available at run time."
      html={weeklyMemo.html}
      output={weeklyMemo.output}
    />
  {:else}
    <section class="container">
      <p class="kicker">WEEKLY MEMO · {fund.shortName.toUpperCase()}</p>
      <h2 class="section-title">No memo on file yet</h2>
      <p class="section-deck">
        The scheduled run for this fund has not produced a published memo yet.
      </p>
    </section>
  {/if}

  {#if monthlyCashFlow}
    <AgentMemoBlock
      kicker={`MONTHLY CASH-FLOW · ${fund.shortName.toUpperCase()}`}
      title="Cash-flow narrative"
      deck="Inflows, outflows, and the residual that flows into next period."
      html={monthlyCashFlow.html}
      output={monthlyCashFlow.output}
    />
  {/if}

  <RunHistory runs={runs} />

  <section class="container">
    <h2 class="section-title">Citations</h2>
    <ul class="citations">
      {#each fund.citations as c}
        <li>{c}</li>
      {/each}
    </ul>
  </section>

  <section class="container">
    <ShareBlock
      headline="{fund.name}: {fund.scandal}"
      summary={fund.oneLineStatus}
      url={siteUrl(`/funds/${fund.slug}/`)}
    />
  </section>

  <section class="container fund-nav">
    <a class="nav-back" href="{base}/">← Back to issue index</a>
    <a class="nav-back" href="{base}/dashboard/">Cross-fund dashboard →</a>
  </section>
</article>
