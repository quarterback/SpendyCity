<script lang="ts">
  import { downloadCSV, downloadSVGAsPNG } from '$lib/utils/format';
  import { CHART_REGISTRY, chartIframeSnippet, chartEmbedUrl } from '$lib/charts/registry';
  import { SITE_URL } from '$lib/config';

  interface Props {
    title: string;
    sub?: string;
    source?: string;
    modeled?: boolean;
    chartId?: string;
    csvName?: string;
    csvHeaders?: string[];
    csvRows?: (string | number)[][];
    pngName?: string;
    /**
     * One-sentence plain-language summary that gets exposed to assistive tech
     * via the keyboard-accessible data disclosure below the chart.
     */
    a11ySummary?: string;
    children: import('svelte').Snippet<[{ register: (svg: SVGSVGElement) => void }]>;
  }

  let {
    title,
    sub,
    source,
    modeled = false,
    chartId,
    csvName,
    csvHeaders,
    csvRows,
    pngName,
    a11ySummary,
    children
  }: Props = $props();

  let svgEl: SVGSVGElement | undefined = $state();
  function register(s: SVGSVGElement) {
    svgEl = s;
  }

  function onPng() {
    if (svgEl) downloadSVGAsPNG(svgEl, pngName ?? `${title.toLowerCase().replace(/\s+/g, '-')}.png`);
  }
  function onCsv() {
    if (csvHeaders && csvRows) downloadCSV(csvName ?? `${title.toLowerCase().replace(/\s+/g, '-')}.csv`, csvHeaders, csvRows);
  }

  let embedOpen = $state(false);
  let snippetCopied = $state(false);
  let linkCopied = $state(false);

  const embedMeta = $derived(chartId ? CHART_REGISTRY.get(chartId) : undefined);
  const snippet = $derived(embedMeta ? chartIframeSnippet(chartId!, embedMeta) : '');
  const embedLink = $derived(chartId ? chartEmbedUrl(chartId) : '');
  const sourcePageLink = $derived(embedMeta ? `${SITE_URL}${embedMeta.sourcePage}` : '');

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      snippetCopied = true;
      setTimeout(() => (snippetCopied = false), 1800);
    } catch { snippetCopied = false; }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(embedLink);
      linkCopied = true;
      setTimeout(() => (linkCopied = false), 1800);
    } catch { linkCopied = false; }
  }
</script>

<figure class="chart-frame">
  <div class="chart-header">
    <p class="chart-title">{title}</p>
    {#if modeled}<span class="chart-modeled-badge">MODELED</span>{/if}
  </div>
  {#if sub}<p class="chart-sub">{sub}</p>{/if}
  <div class="chart-body">
    {@render children({ register })}
  </div>
  {#if source}<p class="chart-source">Source · {source}</p>{/if}
  {#if (csvHeaders && csvRows) || svgEl || chartId}
    <div class="chart-tools">
      {#if chartId}
        <button class="tool-btn share-btn" onclick={() => (embedOpen = !embedOpen)}>
          {embedOpen ? 'Close' : 'Share / Embed'}
        </button>
      {/if}
      {#if svgEl}<button class="tool-btn" onclick={onPng}>Download PNG</button>{/if}
      {#if csvHeaders && csvRows}<button class="tool-btn" onclick={onCsv}>Download CSV</button>{/if}
    </div>
  {/if}

  {#if csvHeaders && csvRows}
    <details class="chart-data-disclosure">
      <summary>Data table for {title}</summary>
      {#if a11ySummary}
        <p class="chart-data-summary">{a11ySummary}</p>
      {/if}
      <div class="chart-data-scroll">
        <table class="chart-data-table">
          <caption class="sr-only">Underlying data for: {title}</caption>
          <thead>
            <tr>
              {#each csvHeaders as h}<th scope="col">{h}</th>{/each}
            </tr>
          </thead>
          <tbody>
            {#each csvRows as row}
              <tr>
                {#each row as cell, i}
                  <td class:num={typeof cell === 'number' || (i > 0 && !Number.isNaN(Number(cell)))}>{cell}</td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </details>
  {/if}

  {#if embedOpen && embedMeta}
    <div class="embed-panel" role="region" aria-label="Share and embed options">
      <p class="embed-panel-kicker">SHARE / EMBED</p>

      <div class="embed-field">
        <p class="embed-label">iframe snippet</p>
        <div class="embed-row">
          <pre class="embed-code">{snippet}</pre>
          <button class="copy-btn" onclick={copySnippet}>{snippetCopied ? 'Copied!' : 'Copy'}</button>
        </div>
      </div>

      <div class="embed-field">
        <p class="embed-label">Direct embed link</p>
        <div class="embed-row">
          <code class="embed-url">{embedLink}</code>
          <button class="copy-btn" onclick={copyLink}>{linkCopied ? 'Copied!' : 'Copy'}</button>
        </div>
      </div>

      <p class="embed-note">
        Embeds include a non-removable credit line linking back to
        <a href={sourcePageLink} target="_blank" rel="noopener noreferrer">this page on PDX Spend</a>.
        <a href="/embed/" target="_blank" rel="noopener noreferrer">See all embeddable charts →</a>
      </p>
    </div>
  {/if}
</figure>

<style>
  .chart-body {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .chart-header {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .chart-modeled-badge {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--ink-muted, #6b6357);
    border: 1px solid var(--ink-muted, #6b6357);
    padding: 1px 4px;
    border-radius: 2px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .chart-tools {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  .tool-btn {
    min-height: 44px;
    min-width: 44px;
    padding: 10px 16px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 12px;
    letter-spacing: 0.05em;
    background: transparent;
    border: 1px solid var(--rule, #d4cfc4);
    color: var(--ink-muted, #6b6357);
    cursor: pointer;
    border-radius: 2px;
    transition: border-color 0.15s ease, color 0.15s ease;
  }
  .tool-btn:hover {
    border-color: var(--ink, #1a1714);
    color: var(--ink, #1a1714);
  }
  .tool-btn:focus-visible {
    outline: 2px solid var(--accent, #b23c1a);
    outline-offset: 2px;
  }
  .share-btn {
    color: var(--accent, #c0501e);
    border-color: var(--accent, #c0501e);
  }
  .share-btn:hover {
    background: var(--accent, #c0501e);
    color: var(--paper, #fbf8f1);
    border-color: var(--accent, #c0501e);
  }

  .chart-data-disclosure {
    margin-top: 10px;
    border-top: 1px solid var(--rule, #d4cfc4);
    padding-top: 8px;
  }
  .chart-data-disclosure > summary {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 12px;
    letter-spacing: 0.05em;
    color: var(--ink-muted, #6b6357);
    cursor: pointer;
    padding: 6px 0;
    list-style: none;
  }
  .chart-data-disclosure > summary::-webkit-details-marker { display: none; }
  .chart-data-disclosure > summary::before {
    content: '▸ ';
    display: inline-block;
    transition: transform 0.15s ease;
    color: var(--accent, #c0501e);
    margin-right: 4px;
  }
  .chart-data-disclosure[open] > summary::before {
    transform: rotate(90deg);
  }
  .chart-data-disclosure > summary:focus-visible {
    outline: 2px solid var(--accent, #b23c1a);
    outline-offset: 2px;
  }
  .chart-data-summary {
    font-family: var(--font-serif, Georgia, serif);
    font-size: 14px;
    color: var(--ink-2, #2a2824);
    margin: 6px 0 8px;
    max-width: 60ch;
  }
  .chart-data-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .chart-data-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 12px;
    margin: 4px 0 6px;
  }
  .chart-data-table th,
  .chart-data-table td {
    padding: 6px 10px;
    border-bottom: 1px solid var(--rule, #d4cfc4);
    text-align: left;
  }
  .chart-data-table th {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 10px;
    color: var(--ink-muted, #6b6357);
    border-bottom: 1px solid var(--ink, #1a1714);
  }
  .chart-data-table td.num { text-align: right; font-variant-numeric: tabular-nums; }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .embed-panel {
    margin-top: 14px;
    padding: 14px 16px;
    background: var(--paper-alt, #f4efe6);
    border: 1px solid var(--rule, #d4cfc4);
    border-radius: 3px;
  }
  .embed-panel-kicker {
    margin: 0 0 12px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 9px;
    letter-spacing: 0.1em;
    color: var(--ink-muted, #6b6357);
  }
  .embed-field {
    margin-bottom: 12px;
  }
  .embed-label {
    margin: 0 0 4px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10px;
    letter-spacing: 0.06em;
    color: var(--ink-muted, #6b6357);
  }
  .embed-row {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .embed-code {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 8px 10px;
    background: var(--paper, #fbf8f1);
    border: 1px solid var(--rule, #d4cfc4);
    border-radius: 2px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-all;
    overflow-x: auto;
  }
  .embed-url {
    flex: 1;
    min-width: 0;
    display: block;
    padding: 8px 10px;
    background: var(--paper, #fbf8f1);
    border: 1px solid var(--rule, #d4cfc4);
    border-radius: 2px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .copy-btn {
    flex-shrink: 0;
    min-height: 44px;
    min-width: 44px;
    padding: 10px 16px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 12px;
    letter-spacing: 0.05em;
    background: var(--ink, #1a1714);
    color: var(--paper, #fbf8f1);
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.15s ease;
  }
  .copy-btn:hover {
    background: var(--accent, #c0501e);
  }
  .copy-btn:focus-visible {
    outline: 2px solid var(--accent, #b23c1a);
    outline-offset: 2px;
  }
  .embed-note {
    margin: 4px 0 0;
    font-size: 11px;
    color: var(--ink-muted, #6b6357);
    line-height: 1.5;
  }
  .embed-note a {
    color: var(--accent, #c0501e);
  }
</style>
