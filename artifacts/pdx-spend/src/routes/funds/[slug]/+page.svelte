<script lang="ts">
  import { base } from '$app/paths';
  import AnnotatedLineChart from '$lib/components/AnnotatedLineChart.svelte';
  import DivergingBarChart from '$lib/components/DivergingBarChart.svelte';
  import ReserveStream from '$lib/components/ReserveStream.svelte';
  import DriftTimeline from '$lib/components/DriftTimeline.svelte';
  import ChartFrame from '$lib/components/ChartFrame.svelte';
  import Scrolly from '$lib/components/Scrolly.svelte';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import AgentMemoBlock from '$lib/components/AgentMemoBlock.svelte';
  import RunHistory from '$lib/components/RunHistory.svelte';
  import CouldFundList from '$lib/components/CouldFundList.svelte';
  import BlockerCard from '$lib/components/BlockerCard.svelte';
  import { formatUSD, formatPct } from '$lib/utils/format';
  import { INVESTIGATIONS } from '$lib/data/investigations';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const fund = $derived(data.fund);
  const weeklyMemo = $derived(data.weeklyMemo);
  const monthlyCashFlow = $derived(data.monthlyCashFlow);
  const runs = $derived(data.runs);

  const relatedInvestigations = $derived(
    INVESTIGATIONS.filter((i) => i.relatedFundSlugs.includes(fund.slug))
  );

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

  <section class="container two-col">
    <div class="prose">
      <p class="lede">
        <strong>Voter intent.</strong> {intentLine}
      </p>
      <p>
        What follows is a year-by-year reading of how the cash position of this fund evolved, annotated with the audit findings and council actions that produced its current shape. Below that, a visual of what the balance could pay for at today&rsquo;s published unit costs, the named mechanisms by which it currently can&rsquo;t, and what would change if those mechanisms were removed.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Original ballot text</h4>
      <p>{fund.voterIntent}</p>
    </aside>
  </section>

  {#if fund.couldFund && fund.couldFund.length > 0}
    <section class="container">
      <p class="kicker">WHERE IT COULD HELP NOW</p>
      <h2 class="section-title">What the balance is the size of</h2>
      <p class="section-deck">
        At the fund&rsquo;s modeled balance, and at the unit costs that already appear in city, county, and bureau budgets, the dollars are equivalent in scale to any one of these.
      </p>
      <CouldFundList items={fund.couldFund} balance={fund.modeledBalance} />
    </section>
  {/if}

  {#if fund.blockerNews}
    <section class="container">
      <div class="context-banner">
        <p class="lbl">Current context</p>
        <p>{fund.blockerNews}</p>
      </div>
    </section>
  {/if}

  {#if fund.blockers && fund.blockers.length > 0}
    <section class="container">
      <p class="kicker">MECHANISMS</p>
      <h2 class="section-title">What&rsquo;s in the way of spending it as voted</h2>
      <p class="section-deck">
        Each item below is a named mechanism in code, charter, or council practice. The defense is the line routinely offered for it. The note beside it is the structural reading of why that line is not the whole story.
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
        <p class="lbl">If those mechanisms were removed</p>
        <p>{fund.ifUnblocked}</p>
      </div>
    </section>
  {/if}

  <section class="container two-col">
    <div class="prose">
      <h2>How the balance got here</h2>
      <p>
        What follows is a year-by-year reading of how the cash position of this fund evolved. Scroll the right column to advance the chart; each step is an audit finding, council resolution, or bureau memo that shaped the shape.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Reading the chart</h4>
      <p>
        The dark line is the modeled year-end balance. Vertical marks line up with the audit-trail events listed beside the chart, with the active step picked out as the page scrolls.
      </p>
    </aside>
  </section>

  <section class="container-wide scrolly-section">
    <div class="scrolly-grid">
      <div class="scrolly-sticky">
        <ChartFrame
          title="Modeled cash position, with audit annotations"
          sub="Annotations are auditor findings, council resolutions, and bureau memos. The active step is shown with a vertical rule."
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
          </div>
        {/each}
      </Scrolly>
    </div>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Promise versus delivery</h2>
      <p>
        The chart on the right pairs each plan cycle&rsquo;s stated dollar promise with the dollar amount that was eventually delivered against it. The gap between the two — labelled in orange — is what flows into the next cycle&rsquo;s carryover, and what the audit narrative on the previous chart is, in part, accumulating into.
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
      modeled={true}
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
      <h2>Drift from voter intent</h2>
      <p>
        The chart on the right is a <em>drift index</em>. A value of 100 percent means every dollar in the fund is being used in a way that maps cleanly to the original ballot text. A value below 100 percent means some share has been ordinance-redirected, swept into a sibling program, or otherwise reclassified.
      </p>
    </div>
    <aside class="margin-note">
      <h4>How drift is constructed</h4>
      <p>
        Drift is modeled by reading each post-enactment ordinance and resolution against the ballot text, scoring how much of the affected balance moved off the original-intent baseline, and compounding that score forward. See <a href="{base}/methodology/">Methodology</a>.
      </p>
    </aside>
  </section>

  <section class="container-wide">
    <ChartFrame
      title="Drift index — voter intent vs. modeled actual disposition"
      modeled={true}
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

  {#if relatedInvestigations.length > 0}
    <section class="container">
      <p class="kicker">FURTHER READING</p>
      <h2 class="section-title">Investigation tied to this fund</h2>
      <div class="related-invest">
        {#each relatedInvestigations as inv}
          <a class="related-invest-card" href="{base}/investigations/{inv.slug}/">
            <p class="meta">{inv.kicker}</p>
            <h3>{inv.title}</h3>
            <p class="deck">{inv.oneLineThesis}</p>
            <p class="cta">Read the investigation →</p>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <section class="container fund-nav">
    <a class="nav-back" href="{base}/">← Back to all funds</a>
    <a class="nav-back" href="{base}/dashboard/">Cross-fund dashboard →</a>
  </section>
</article>

<style>
  .related-invest {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 18px;
    margin-top: 18px;
  }
  .related-invest-card {
    display: block;
    padding: 20px 22px 16px;
    border: 1px solid var(--rule);
    background: var(--paper);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }
  .related-invest-card:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .related-invest-card .meta {
    margin: 0 0 6px;
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-4);
  }
  .related-invest-card h3 {
    margin: 0 0 8px;
    font-family: var(--serif);
    font-size: 22px;
    line-height: 1.22;
  }
  .related-invest-card .deck {
    margin: 0 0 12px;
    font-size: 14px;
    line-height: 1.55;
    color: var(--ink-2);
  }
  .related-invest-card .cta {
    margin: 0;
    font-size: 13px;
    color: var(--accent);
    font-weight: 600;
  }
</style>
