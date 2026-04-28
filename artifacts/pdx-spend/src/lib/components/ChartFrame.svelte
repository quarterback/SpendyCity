<script lang="ts">
  import { downloadCSV, downloadSVGAsPNG } from '$lib/utils/format';

  interface Props {
    title: string;
    sub?: string;
    source?: string;
    modeled?: boolean;
    csvName?: string;
    csvHeaders?: string[];
    csvRows?: (string | number)[][];
    pngName?: string;
    children: import('svelte').Snippet<[{ register: (svg: SVGSVGElement) => void }]>;
  }

  let { title, sub, source, modeled = false, csvName, csvHeaders, csvRows, pngName, children }: Props = $props();

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
</script>

<figure class="chart-frame">
  <div class="chart-header">
    <p class="chart-title">{title}</p>
    {#if modeled}<span class="chart-modeled-badge">MODELED</span>{/if}
  </div>
  {#if sub}<p class="chart-sub">{sub}</p>{/if}
  {@render children({ register })}
  {#if source}<p class="chart-source">Source · {source}</p>{/if}
  {#if (csvHeaders && csvRows) || svgEl}
    <div class="chart-tools">
      {#if svgEl}<button onclick={onPng}>Download PNG</button>{/if}
      {#if csvHeaders && csvRows}<button onclick={onCsv}>Download CSV</button>{/if}
    </div>
  {/if}
</figure>

<style>
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
</style>
