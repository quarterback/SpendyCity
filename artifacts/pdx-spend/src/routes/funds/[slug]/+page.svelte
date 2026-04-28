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
      <div><dt>Modeled carry</dt><dd>{formatUSD(fund.modeledBalance)}</dd></div>
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
        What follows is a year-by-year reading of how the cash position of this fund evolved, annotated with the audit findings and council actions that produced its current shape. Scroll to advance the chart.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Reading the chart</h4>
      <p>
        The dark line is the modeled year-end balance. The shaded area underneath is the portion that has been formally <em>obligated</em> — committed to a contract, grant, or program but not yet paid out. The orange dots are audit-trail events; orange labels above the line summarize each one.
      </p>
    </aside>
  </section>

  <section class="container-wide scrolly-section">
    <div class="scrolly-grid">
      <div class="scrolly-sticky">
        <ChartFrame
          title="Modeled cash position with audit annotations"
          sub="Annotations are auditor findings, council resolutions, and bureau memos. Active step shown with vertical rule."
          source="Modeled reconstruction (PDX Spend)"
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
        The chart on the right pairs each plan cycle's stated dollar promise with the dollar amount that was eventually delivered against it. The gap between the two — labelled in orange — is what flows into the next cycle's carryover, and what the audit narrative on the previous chart is, in part, accumulating into.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Why the gap matters</h4>
      <p>
        A persistent gap between promised and delivered creates a structural surplus. Surplus does not stay neutral: it becomes governable, and ordinances begin to make it movable. This is the mechanical link between under-spending and scope drift.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Promised vs. delivered, by fiscal cycle"
      sub="Promised dollars are those committed in the bureau's published plan; delivered dollars are what shipped against the plan. Modeled."
      source="Modeled reconstruction (PDX Spend)"
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
        When delivery lags collection, the residual accumulates as an unobligated reserve. This is not a savings account in the household sense: it is a balance that public-finance officers and council staff have, by ordinance, the discretion to redirect.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Reserve, plainly</h4>
      <p>
        The reserve is the share of the fund that is neither already spent nor formally obligated. It is the available headroom for any future scope-broadening vote.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Modeled unobligated reserve"
      source="Modeled reconstruction (PDX Spend)"
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
        The chart on the right is a <em>drift index</em>. A value of 100 percent means every dollar in the fund is being used in a way that maps cleanly to the original ballot text. A value below 100 percent means some share has been ordinance-redirected, swept into a sibling program, or otherwise reclassified.
      </p>
    </div>
    <aside class="margin-note">
      <h4>How drift is constructed</h4>
      <p>
        Drift is modeled by reading each post-enactment ordinance and resolution against the ballot text, scoring how much of the affected balance moved off the original-intent baseline, and compounding that score forward.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Drift index — voter intent vs. modeled actual disposition"
      source="Modeled reconstruction (PDX Spend)"
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
      deck="A structured-finance read of the corpus on file for this fund. The memo is cited inline against the documents the agent had access to at run time."
      html={weeklyMemo.html}
      output={weeklyMemo.output}
    />
  {:else}
    <section class="container">
      <p class="kicker">WEEKLY MEMO · {fund.shortName.toUpperCase()}</p>
      <h2 class="section-title">No memo on file yet</h2>
      <p class="section-deck">
        The scheduled run for this fund has not produced a published memo yet.
        Fund pages render the most recent memo once the pipeline has succeeded
        for the current corpus snapshot.
      </p>
    </section>
  {/if}

  {#if monthlyCashFlow}
    <AgentMemoBlock
      kicker={`MONTHLY CASH-FLOW · ${fund.shortName.toUpperCase()}`}
      title="Cash-flow narrative for the month"
      deck="A monthly cash-flow read against the same corpus, focused on inflows, outflows, and the residual that flows into next period."
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
      headline={`${fund.name} — ${fund.scandal}`}
      summary={fund.oneLineStatus}
      url={siteUrl(`/funds/${fund.slug}/`)}
    />
  </section>

  <section class="container fund-nav">
    <a class="nav-back" href="{base}/">← Back to issue index</a>
    <a class="nav-back" href="{base}/dashboard/">Cross-fund dashboard →</a>
  </section>
</article>
