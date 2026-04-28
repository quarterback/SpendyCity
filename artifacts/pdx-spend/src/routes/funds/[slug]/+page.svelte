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
  import CouldFundList from '$lib/components/CouldFundList.svelte';
  import BlockerCard from '$lib/components/BlockerCard.svelte';
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

  const reserveCsvHeaders = ['Year', 'Unspent reserve (USD)'];
  const reserveCsvRows = $derived(
    fund.reserveSeries.map((r) => [r.year, Math.round(r.reserve)])
  );

  const driftCsvHeaders = ['Year', 'On voter intent (%)', 'Drift (%)', 'Note'];
  const driftCsvRows = $derived(
    fund.drift.map((d) => [d.year, Math.round(d.actualUse), 100 - Math.round(d.actualUse), d.note ?? ''])
  );

  const intentLine = $derived(fund.voterIntentPlain ?? fund.voterIntent);
</script>

<SiteMeta
  title={`${fund.name} — PDX Spend`}
  description={fund.oneLineStatus}
  path={`/funds/${fund.slug}/`}
  type="article"
  oembedIds={[`${fund.slug}-cash`, `${fund.slug}-promise`, `${fund.slug}-reserve`, `${fund.slug}-drift`]}
/>

<article>
  <header class="container fund-header">
    <p class="kicker">FUND · {fund.enacted} · {fund.ballotMeasure ?? fund.enablingCode}</p>
    <h1 class="article-title">{fund.name}</h1>
    <p class="article-deck">{fund.oneLineStatus}</p>
    <dl class="fund-meta-grid">
      <div><dt>Passed</dt><dd>{fund.enacted}</dd></div>
      <div><dt>Who collects it</dt><dd>{fund.collector}</dd></div>
      <div><dt>Who runs it</dt><dd>{fund.steward}</dd></div>
      <div><dt>How often</dt><dd>{fund.collectionsCadence}</dd></div>
      <div><dt>Statute</dt><dd>{fund.enablingCode}</dd></div>
      <div><dt>Sitting today</dt><dd>{formatUSD(fund.modeledBalance)}</dd></div>
      <div><dt>Still aimed where you voted</dt><dd>{formatPct(fund.modeledRestrictedShare)}</dd></div>
      <div><dt>Re-aimed since</dt><dd class="accent">{formatPct(fund.modeledMovableShare)}</dd></div>
    </dl>
  </header>

  {#if fund.blockerNews}
    <section class="container">
      <div class="stop-banner">
        <p class="lbl">Live example</p>
        <p>{fund.blockerNews}</p>
      </div>
    </section>
  {/if}

  <section class="container two-col">
    <div class="prose">
      <h2>What you voted for</h2>
      <p>{intentLine}</p>
    </div>
    <aside class="margin-note">
      <h4>Original ballot text</h4>
      <p>{fund.voterIntent}</p>
    </aside>
  </section>

  {#if fund.couldFund && fund.couldFund.length > 0}
    <section class="container">
      <p class="section-eyebrow">What it could pay for tomorrow</p>
      <h2 class="section-title">{formatUSD(fund.modeledBalance)} could fund any one of these</h2>
      <CouldFundList items={fund.couldFund} balance={fund.modeledBalance} />
    </section>
  {/if}

  {#if fund.blockers && fund.blockers.length > 0}
    <section class="container">
      <p class="section-eyebrow">What&rsquo;s blocking it</p>
      <h2 class="section-title">Named obstacles, with the lever and the office</h2>
      <p class="section-deck">
        Each blocker is a mechanism, not a personality. The defense is the line routinely offered for it. The rebuttal is why that line doesn&rsquo;t hold up.
      </p>
      <div class="blocker-grid">
        {#each fund.blockers as b, i}
          <BlockerCard blocker={b} index={i + 1} />
        {/each}
      </div>
    </section>
  {/if}

  {#if fund.ifUnblocked}
    <section class="container">
      <div class="if-unblocked">
        <p class="lbl">If unblocked</p>
        <p>{fund.ifUnblocked}</p>
      </div>
    </section>
  {/if}

  <section class="container two-col">
    <div class="prose">
      <h2>How the balance got here</h2>
      <p>
        Each year-end balance, marked with the audits and council actions that shaped it. Scroll the right column to step through.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Read this chart</h4>
      <p>
        The line is the year-end balance. Vertical marks line up with the events listed beside the chart.
      </p>
    </aside>
  </section>

  <section class="container-wide scrolly-section">
    <div class="scrolly-grid">
      <div class="scrolly-sticky">
        <ChartFrame
          title="Balance over time, with key events"
          sub="Year-end balance. Marks indicate audits and council actions."
          source="PDX Spend"
          modeled={true}
          chartId="{fund.slug}-cash"
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
      <h2>Promised vs. delivered</h2>
      <p>
        Each pair shows what a budget cycle planned to spend, and what actually shipped. The gap becomes next year&rsquo;s carryover.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Why the gap matters</h4>
      <p>
        A balance that grows from under-delivery hands the bureau a reason to broaden what the dollars can be spent on.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Promised vs. delivered, by budget cycle"
      sub="Planned dollars next to dollars that actually shipped."
      source="PDX Spend"
      modeled={true}
      chartId="{fund.slug}-promise"
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
      <h2>Money sitting unspent, year by year</h2>
      <p>
        When inflows beat delivery, the residual sits as money that has not been promised to anyone yet. This is the headroom every scope-broadening vote draws on.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Headroom</h4>
      <p>
        The share neither spent nor formally promised in a contract. The available room for redirection.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Money sitting unspent, year by year"
      source="PDX Spend"
      modeled={true}
      chartId="{fund.slug}-reserve"
      pngName="{fund.slug}-reserve.png"
      csvName="{fund.slug}-reserve.csv"
      csvHeaders={reserveCsvHeaders}
      csvRows={reserveCsvRows}
      a11ySummary="Each row shows the dollars left sitting unspent in this fund at the end of that year."
    >
      {#snippet children({ register })}
        <ReserveStream series={fund.reserveSeries} {register} />
      {/snippet}
    </ChartFrame>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Share still aimed where you voted</h2>
      <p>
        100% means every dollar still maps to the original ballot text. Each council vote that broadens the eligible uses lowers the score.
      </p>
    </div>
    <aside class="margin-note">
      <h4>How it&rsquo;s scored</h4>
      <p>
        A 0–100 score from reading post-enactment ordinances against the original ballot text. See <a href="{base}/methodology/">Methodology</a>.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Share still aimed where you voted"
      source="PDX Spend"
      modeled={true}
      chartId="{fund.slug}-drift"
      pngName="{fund.slug}-drift.png"
      csvName="{fund.slug}-drift.csv"
      csvHeaders={driftCsvHeaders}
      csvRows={driftCsvRows}
      a11ySummary="Modeled share of dollars still aimed at the original ballot purpose, with each council vote that broadens the eligible uses pulling the score down."
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
      deck="A read of the documents on file for this fund, written this week. Citations link out to the source documents."
      html={weeklyMemo.html}
      output={weeklyMemo.output}
    />
  {:else}
    <section class="container">
      <p class="kicker">WEEKLY MEMO · {fund.shortName.toUpperCase()}</p>
      <h2 class="section-title">No memo for this fund yet this week</h2>
      <p class="section-deck">
        The weekly run hasn&rsquo;t produced a published memo for this fund yet.
      </p>
    </section>
  {/if}

  {#if monthlyCashFlow}
    <AgentMemoBlock
      kicker={`MONTHLY CASH-FLOW · ${fund.shortName.toUpperCase()}`}
      title="Cash this month"
      deck="What came in, what went out, what carried into next month."
      html={monthlyCashFlow.html}
      output={monthlyCashFlow.output}
    />
  {/if}

  <RunHistory runs={runs} />

  <section class="container">
    <h2 class="section-title">Where this comes from</h2>
    <ul class="citations">
      {#each fund.citations as c}
        <li>{c}</li>
      {/each}
    </ul>
  </section>

  <section class="container">
    <ShareBlock
      headline="{fund.name}: {formatUSD(fund.modeledBalance)} could pay for what you voted for. Here&rsquo;s what&rsquo;s blocking it."
      summary={fund.ifUnblocked ?? fund.oneLineStatus}
      url={siteUrl(`/funds/${fund.slug}/`)}
    />
  </section>

  <section class="container fund-nav">
    <a class="nav-back" href="{base}/">← Back to all funds</a>
    <a class="nav-back" href="{base}/dashboard/">Cross-fund dashboard →</a>
  </section>
</article>
