<script lang="ts">
  import { base } from '$app/paths';
  import AnnotatedLineChart from '$lib/components/AnnotatedLineChart.svelte';
  import ChartFrame from '$lib/components/ChartFrame.svelte';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import { FUND_BY_SLUG } from '$lib/data/funds';
  import { formatUSD } from '$lib/utils/format';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const investigation = $derived(data.investigation);
  const bodyHtml = $derived(data.bodyHtml);

  const cashCsvHeaders = ['Year', 'Revenue (Metro SHS)', 'Spent (county)', 'Obligated'];
  const cashCsvRows = $derived(
    (investigation.cashSeries ?? []).map((c) => [
      c.year,
      Math.round(c.inflow),
      Math.round(c.spent),
      Math.round(c.obligated)
    ])
  );

  const totalObligated = $derived(
    (investigation.contractorTable ?? []).reduce((s, r) => s + r.obligationUSD, 0)
  );

  function fmtDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
</script>

<SiteMeta
  title={`${investigation.title} — PDX Spend Investigations`}
  description={investigation.oneLineThesis}
  path={`/investigations/${investigation.slug}/`}
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">{investigation.kicker} · {fmtDate(investigation.publishedAt)}</p>
    <h1 class="article-title">{investigation.title}</h1>
    <p class="article-deck">{investigation.oneLineThesis}</p>
    {#if investigation.relatedFundSlugs.length > 0}
      <p class="related-funds">
        <span class="lbl">Related funds</span>
        {#each investigation.relatedFundSlugs as slug, i}
          {#if FUND_BY_SLUG[slug]}
            {#if i > 0}<span class="sep"> · </span>{/if}
            <a href="{base}/funds/{slug}/">{FUND_BY_SLUG[slug].shortName}</a>
          {/if}
        {/each}
      </p>
    {/if}
  </header>

  {#if investigation.cashSeries && investigation.cashSeries.length > 0}
    {@const series = investigation.cashSeries}
    <section class="container-wide">
      <ChartFrame
        title={investigation.cashSeriesTitle ?? 'Modeled revenue and spending'}
        sub={investigation.cashSeriesSub}
        modeled={true}
        pngName="{investigation.slug}-revenue-spend.png"
        csvHeaders={cashCsvHeaders}
        csvRows={cashCsvRows}
      >
        {#snippet children({ register })}
          <AnnotatedLineChart data={series} {register} />
        {/snippet}
      </ChartFrame>
    </section>
  {/if}

  <section class="container two-col">
    <div class="prose investigation-body">
      {@html bodyHtml}
    </div>
    <aside class="margin-note">
      <h4>What this is</h4>
      <p>
        An investigation is a structural read of one quasi-governmental relationship in Portland or Multnomah County. It is published as journalism, not advocacy. Figures are modeled and labeled as such until audited records replace them.
      </p>
      <h4 style="margin-top: 22px">Reading the table</h4>
      <p>
        The contractor obligations below are modeled from public Multnomah County program-area totals. The “outcomes public” column is a strict reading: it is <strong>Yes</strong> only when the provider publishes a program-level annual report at a level of detail that lets a reader compute cost per placement or cost per twelve-month retention from public documents.
      </p>
    </aside>
  </section>

  {#if investigation.contractorTable && investigation.contractorTable.length > 0}
    <section class="container-wide">
      <div class="contractor-frame">
        <header class="contractor-frame-header">
          <p class="kicker">CONTRACTOR LAYER · MODELED</p>
          <h2 class="section-title">{investigation.contractorTableTitle}</h2>
          {#if investigation.contractorTableNote}
            <p class="section-deck">{investigation.contractorTableNote}</p>
          {/if}
        </header>

        <div class="table-scroll">
          <table class="contractor-table">
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">Fiscal year</th>
                <th scope="col" class="num">Modeled obligation</th>
                <th scope="col">Primary deliverable</th>
                <th scope="col">Outcomes public</th>
              </tr>
            </thead>
            <tbody>
              {#each investigation.contractorTable as row}
                <tr>
                  <th scope="row">{row.provider}</th>
                  <td>{row.fiscalYear}</td>
                  <td class="num">{formatUSD(row.obligationUSD)}</td>
                  <td>
                    {row.primaryDeliverable}
                    {#if row.note}<span class="row-note">{row.note}</span>{/if}
                  </td>
                  <td>
                    <span class="badge" class:pos={row.outcomesPublic} class:neg={!row.outcomesPublic}>
                      {row.outcomesPublic ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              {/each}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colspan="2">Modeled total of named providers</th>
                <td class="num"><strong>{formatUSD(totalObligated)}</strong></td>
                <td colspan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  {/if}

  {#if investigation.sources && investigation.sources.length > 0}
    <section class="container">
      <p class="kicker">SOURCES</p>
      <h2 class="section-title">What this is built on</h2>
      <ol class="sources-list">
        {#each investigation.sources as src}
          <li>
            <a href={src.url} rel="noopener" target="_blank">{src.label}</a>
            {#if src.publishedAt}<span class="src-date"> — {fmtDate(src.publishedAt)}</span>{/if}
          </li>
        {/each}
      </ol>
    </section>
  {/if}

  <section class="container fund-nav">
    <a class="nav-back" href="{base}/investigations/">← All investigations</a>
    <a class="nav-back" href="{base}/methodology/">Methodology →</a>
  </section>
</article>

<style>
  .related-funds {
    margin: 18px 0 0;
    font-family: var(--mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-4);
  }
  .related-funds .lbl { margin-right: 10px; }
  .related-funds .sep { color: var(--ink-4); }
  .related-funds a { color: var(--accent); text-decoration: none; }
  .related-funds a:hover { text-decoration: underline; }

  .investigation-body :global(h2) {
    font-family: var(--serif);
    font-size: 26px;
    line-height: 1.2;
    margin: 36px 0 14px;
  }
  .investigation-body :global(h2:first-child) { margin-top: 0; }
  .investigation-body :global(h3) {
    font-family: var(--serif);
    font-size: 19px;
    line-height: 1.25;
    margin: 26px 0 10px;
  }
  .investigation-body :global(p) {
    margin: 0 0 14px;
    font-size: 17px;
    line-height: 1.6;
  }
  .investigation-body :global(blockquote) {
    margin: 18px 0;
    padding: 6px 16px;
    border-left: 3px solid var(--accent);
    color: var(--ink-2);
    font-style: italic;
  }
  .investigation-body :global(ul),
  .investigation-body :global(ol) {
    margin: 0 0 14px 22px;
    font-size: 17px;
    line-height: 1.6;
  }
  .investigation-body :global(li) { margin-bottom: 6px; }
  .investigation-body :global(a) { color: var(--accent); }
  .investigation-body :global(strong) { font-weight: 700; }
  .investigation-body :global(hr) {
    border: 0;
    border-top: 1px solid var(--rule);
    margin: 28px 0;
  }

  .contractor-frame {
    border: 1px solid var(--rule);
    background: var(--paper);
    padding: 22px 24px 24px;
  }
  .contractor-frame-header { margin-bottom: 16px; }
  .contractor-frame-header .section-title { margin: 6px 0 8px; }
  .contractor-frame-header .section-deck {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--ink-2);
  }
  .table-scroll { overflow-x: auto; }
  .contractor-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .contractor-table th,
  .contractor-table td {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid var(--rule);
    vertical-align: top;
  }
  .contractor-table thead th {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-4);
    border-bottom: 1px solid var(--ink);
  }
  .contractor-table .num { text-align: right; font-variant-numeric: tabular-nums; }
  .contractor-table tbody th { font-weight: 600; }
  .contractor-table .row-note {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: var(--ink-4);
  }
  .contractor-table tfoot td,
  .contractor-table tfoot th {
    border-bottom: none;
    border-top: 1px solid var(--ink);
    padding-top: 12px;
  }
  .badge {
    display: inline-block;
    padding: 2px 8px;
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border: 1px solid currentColor;
  }
  .badge.pos { color: var(--ink); }
  .badge.neg { color: var(--accent); }

  .sources-list {
    margin: 14px 0 0 22px;
    font-size: 15px;
    line-height: 1.55;
  }
  .sources-list li { margin-bottom: 8px; }
  .sources-list a { color: var(--accent); }
  .src-date { color: var(--ink-4); font-size: 13px; }
</style>
