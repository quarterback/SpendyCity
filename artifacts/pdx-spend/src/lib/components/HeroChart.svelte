<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import { formatChartUSD } from '$lib/charts/format';
  import { chartColors, chartPatternDefs, CHART_COMPACT_BREAKPOINT } from '$lib/charts/colors';

  interface Props {
    rows: { shortName: string; balance: number; movable: number; restricted: number }[];
    width?: number;
    height?: number;
    register?: (svg: SVGSVGElement) => void;
  }

  let { rows, width = 1100, height = 460, register }: Props = $props();

  let svgEl: SVGSVGElement | undefined = $state();
  let containerEl: HTMLDivElement | undefined = $state();
  // svelte-ignore state_referenced_locally
  let renderedW = $state(width);
  let tip = $state({ vis: false, x: 0, y: 0, html: '', sticky: false });
  let selectedSlug = $state<string | null>(null);
  let liveMsg = $state('');
  const selectedRow = $derived(rows.find((r) => r.shortName === selectedSlug) ?? null);
  function clearSelection() { selectedSlug = null; hideTip(true); }

  const isCompact = $derived(renderedW < CHART_COMPACT_BREAKPOINT);
  const margin = $derived(
    isCompact
      ? { top: 22, right: 12, bottom: 56, left: 16 }
      : { top: 30, right: 30, bottom: 60, left: 30 }
  );

  const a11yLabel = $derived.by(() => {
    const total = rows.reduce((s, r) => s + r.balance, 0);
    const movableTotal = rows.reduce((s, r) => s + r.movable, 0);
    const pct = total > 0 ? Math.round((movableTotal / total) * 100) : 0;
    return `Year-end balance across ${rows.length} funds totaling ${formatChartUSD(total, 'precise')}, of which ${pct}% has moved to new uses.`;
  });

  function showTip(clientX: number, clientY: number, html: string, sticky = false) {
    if (!containerEl) return;
    const r = containerEl.getBoundingClientRect();
    tip = { vis: true, x: clientX - r.left, y: clientY - r.top, html, sticky };
  }
  function hideTip(force = false) {
    if (tip.sticky && !force) return;
    tip = { ...tip, vis: false, sticky: false };
  }

  const patternUid = `hero-${Math.random().toString(36).slice(2, 7)}`;

  function draw() {
    if (!svgEl) return;
    hideTip(true);
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const w = renderedW;
    const m = margin;
    const innerW = w - m.left - m.right;
    const innerH = height - m.top - m.bottom;

    svg
      .attr('viewBox', `0 0 ${w} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('width', '100%')
      .attr('height', height)
      .attr('role', 'img')
      .attr('aria-label', a11yLabel);

    const pats = chartPatternDefs(patternUid);
    svg.append('defs').html(pats.markup);

    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    const x = d3.scaleBand().domain(rows.map((r) => r.shortName)).range([0, innerW]).padding(isCompact ? 0.28 : 0.18);
    const yMax = d3.max(rows, (r) => r.balance) ?? 0;
    const y = d3.scaleLinear().domain([0, yMax * 1.12]).range([innerH, 0]);

    // baseline rule
    g.append('line').attr('x1', 0).attr('x2', innerW).attr('y1', innerH).attr('y2', innerH).attr('stroke', chartColors.balance).attr('stroke-width', 1);

    rows.forEach((r) => {
      const rx = x(r.shortName) ?? 0;
      const bw = x.bandwidth();
      const restrictedH = innerH - y(r.restricted);
      const movableH = innerH - y(r.movable);
      const movablePct = r.balance > 0 ? Math.round((r.movable / r.balance) * 100) : 0;
      const tipHtml =
        `<strong>${r.shortName}</strong> · ${formatChartUSD(r.balance, 'precise')} sitting` +
        `<span class="sub">${formatChartUSD(r.movable, 'precise')} moved (${movablePct}%) · ${formatChartUSD(r.restricted, 'precise')} still on-mission</span>`;

      // restricted base block
      g.append('rect')
        .attr('x', rx)
        .attr('y', innerH - restrictedH)
        .attr('width', bw)
        .attr('height', restrictedH)
        .attr('fill', chartColors.restricted);

      // movable on top, in accent + diagonal pattern (color-blind safe)
      g.append('rect')
        .attr('x', rx)
        .attr('y', innerH - restrictedH - movableH)
        .attr('width', bw)
        .attr('height', movableH)
        .attr('fill', `url(#${pats.movableId})`);

      // hit area covering the full bar column for hover/tap/keyboard
      g.append('rect')
        .attr('class', 'hit')
        .attr('x', rx)
        .attr('y', 0)
        .attr('width', bw)
        .attr('height', innerH)
        .attr('fill', 'transparent')
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', `${r.shortName}: ${formatChartUSD(r.balance, 'precise')} sitting, ${movablePct}% moved`)
        .style('cursor', 'pointer')
        .on('pointerenter pointermove', (event: PointerEvent) => {
          const sticky = event.pointerType !== 'mouse';
          showTip(event.clientX, event.clientY, tipHtml, sticky);
        })
        .on('pointerdown', (event: PointerEvent) => {
          selectedSlug = r.shortName;
          liveMsg = `${r.shortName}: ${formatChartUSD(r.balance, 'precise')} sitting, ${movablePct}% moved`;
          showTip(event.clientX, event.clientY, tipHtml, true);
        })
        .on('pointerleave', (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return;
          hideTip();
        })
        .on('focus', function (this: SVGRectElement) {
          const rect = this.getBoundingClientRect();
          selectedSlug = r.shortName;
          liveMsg = `${r.shortName}: ${formatChartUSD(r.balance, 'precise')} sitting, ${movablePct}% moved`;
          showTip(rect.left + rect.width / 2, rect.top + rect.height / 2, tipHtml, true);
        })
        .on('blur', () => hideTip(true));

      // total label above bar
      g.append('text')
        .attr('class', 'annotation-label')
        .attr('x', rx + bw / 2)
        .attr('y', y(r.balance) - 8)
        .attr('text-anchor', 'middle')
        .attr('fill', chartColors.balance)
        .attr('font-size', isCompact ? 9.5 : 11)
        .text(formatChartUSD(r.balance, 'compact'));

      // fund label below
      g.append('text')
        .attr('x', rx + bw / 2)
        .attr('y', innerH + (isCompact ? 14 : 16))
        .attr('text-anchor', 'middle')
        .attr('fill', chartColors.axis)
        .attr('font-family', 'JetBrains Mono, ui-monospace, monospace')
        .attr('font-size', isCompact ? 8.5 : 9.5)
        .attr('letter-spacing', '0.06em')
        .text(r.shortName.toUpperCase());
    });

    // legend (always rendered, below chart)
    const legend = svg.append('g').attr('transform', `translate(${m.left}, ${height - 14})`);
    legend.append('rect').attr('x', 0).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', chartColors.restricted);
    legend.append('text').attr('class', 'label').attr('x', 16).attr('y', -3).attr('fill', chartColors.axis).text('On-mission');
    legend.append('rect').attr('x', 96).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', `url(#${pats.movableId})`);
    legend.append('text').attr('class', 'label').attr('x', 112).attr('y', -3).attr('fill', chartColors.axis).text('Re-aimed');

    // top callout — only on wide
    if (!isCompact) {
      const total = rows.reduce((s, r) => s + r.balance, 0);
      const movableTotal = rows.reduce((s, r) => s + r.movable, 0);
      svg
        .append('text')
        .attr('x', w - m.right)
        .attr('y', 18)
        .attr('text-anchor', 'end')
        .attr('font-family', 'JetBrains Mono, ui-monospace, monospace')
        .attr('font-size', 10.5)
        .attr('letter-spacing', '0.07em')
        .attr('fill', chartColors.axis)
        .text(`ALL ${rows.length} FUNDS · ${formatChartUSD(total, 'compact')} TODAY · ${Math.round((movableTotal / total) * 100)}% RE-AIMED`);
    }
  }

  $effect(() => {
    void rows;
    void renderedW;
    draw();
  });

  function onContainerPointerDown(event: PointerEvent) {
    if (event.target instanceof SVGElement && (event.target as SVGElement).classList.contains('hit')) return;
    if (tip.sticky) hideTip(true);
  }

  onMount(() => {
    if (svgEl && register) register(svgEl);
    if (!containerEl) return;
    const ro = new ResizeObserver((e) => {
      const w = e[0]?.contentRect.width ?? width;
      renderedW = Math.max(320, Math.floor(w));
    });
    ro.observe(containerEl);
    return () => ro.disconnect();
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={containerEl} style="width:100%; position:relative;" onpointerdown={onContainerPointerDown}>
  <svg bind:this={svgEl}></svg>
  <div
    class="chart-tip"
    class:visible={tip.vis}
    style="left:{tip.x}px; top:{tip.y}px"
  >{@html tip.html}</div>
  <p class="sr-only" aria-live="polite">{liveMsg}</p>
  {#if selectedRow}
    {@const pct = selectedRow.balance > 0 ? Math.round((selectedRow.movable / selectedRow.balance) * 100) : 0}
    <p class="chart-selection-chip">
      <span class="chip-year">{selectedRow.shortName}</span>
      <span class="chip-val">{formatChartUSD(selectedRow.balance, 'precise')} sitting</span>
      <span class="chip-sub">{formatChartUSD(selectedRow.movable, 'precise')} moved ({pct}%)</span>
      <button class="chip-clear" onclick={clearSelection} aria-label="Clear selection">×</button>
    </p>
  {/if}
</div>
