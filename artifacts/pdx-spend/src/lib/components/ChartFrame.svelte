<script lang="ts">
  interface Props {
    title: string;
    sub?: string;
    modeled?: boolean;
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
    modeled = false,
    csvName: _csvName,
    csvHeaders,
    csvRows,
    pngName: _pngName,
    a11ySummary,
    children
  }: Props = $props();

  // The register callback is retained on the snippet API so existing call
  // sites compile unchanged, but the chart frame itself no longer captures
  // the SVG element — image and CSV downloads were removed.
  function register(_s: SVGSVGElement) {}
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
</style>
