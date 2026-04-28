<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import { formatChartUSD } from '$lib/charts/format';
  import { chartColors, CHART_COMPACT_BREAKPOINT } from '$lib/charts/colors';

  interface Props {
    series: { year: number; reserve: number }[];
    width?: number;
    height?: number;
    register?: (svg: SVGSVGElement) => void;
  }

  let { series, width = 820, height = 220, register }: Props = $props();

  let svgEl: SVGSVGElement | undefined = $state();
  let containerEl: HTMLDivElement | undefined = $state();
  // svelte-ignore state_referenced_locally
  let renderedW = $state(width);
  let tip = $state({ vis: false, x: 0, y: 0, html: '', sticky: false });
  let selectedIdx = $state<number | null>(null);
  let liveMsg = $state('');

  const isCompact = $derived(renderedW < CHART_COMPACT_BREAKPOINT);
  const margin = $derived(
    isCompact
      ? { top: 16, right: 14, bottom: 28, left: 44 }
      : { top: 18, right: 24, bottom: 28, left: 56 }
  );

  const a11yLabel = $derived.by(() => {
    if (!series.length) return 'Money sitting unspent in this fund by year';
    const first = series[0];
    const last = series[series.length - 1];
    return `Unspent reserve from ${first.year} to ${last.year}: ${formatChartUSD(first.reserve, 'precise')} to ${formatChartUSD(last.reserve, 'precise')}.`;
  });

  const selectedPoint = $derived(selectedIdx != null ? series[selectedIdx] : null);

  function showTip(clientX: number, clientY: number, html: string, sticky = false) {
    if (!containerEl) return;
    const r = containerEl.getBoundingClientRect();
    tip = { vis: true, x: clientX - r.left, y: clientY - r.top, html, sticky };
  }
  function hideTip(force = false) {
    if (tip.sticky && !force) return;
    tip = { ...tip, vis: false, sticky: false };
  }
  function describe(p: { year: number; reserve: number }) {
    return `<strong>${p.year}</strong> · ${formatChartUSD(p.reserve, 'precise')} sitting<span class="sub">unspent at year-end</span>`;
  }
  function describePlain(p: { year: number; reserve: number }) {
    return `${p.year}: ${formatChartUSD(p.reserve, 'precise')} unspent`;
  }

  function updateMarkerForSelection(idx: number) {
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    const x = (svgEl as SVGSVGElement & { __scaleX?: d3.ScaleLinear<number, number> }).__scaleX;
    const y = (svgEl as SVGSVGElement & { __scaleY?: d3.ScaleLinear<number, number> }).__scaleY;
    const point = series[idx];
    if (!x || !y || !point) return;
    svg.select<SVGLineElement>('line.hover-guide')
      .attr('x1', x(point.year)).attr('x2', x(point.year)).attr('opacity', 1);
    svg.select<SVGCircleElement>('circle.hover-dot')
      .attr('cx', x(point.year)).attr('cy', y(point.reserve)).attr('opacity', 1);
  }

  function selectIdx(idx: number) {
    if (idx < 0 || idx >= series.length) return;
    selectedIdx = idx;
    const point = series[idx];
    updateMarkerForSelection(idx);
    liveMsg = describePlain(point);
    if (containerEl && svgEl) {
      const rect = svgEl.getBoundingClientRect();
      const scale = rect.width / Math.max(renderedW, 1);
      const x = (svgEl as SVGSVGElement & { __scaleX?: d3.ScaleLinear<number, number> }).__scaleX;
      const y = (svgEl as SVGSVGElement & { __scaleY?: d3.ScaleLinear<number, number> }).__scaleY;
      if (x && y) {
        const sx = rect.left + (x(point.year) + margin.left) * scale;
        const sy = rect.top + (y(point.reserve) + margin.top) * scale;
        showTip(sx, sy, describe(point), true);
      }
    }
  }
  function clearSelection() {
    selectedIdx = null;
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    svg.select<SVGLineElement>('line.hover-guide').attr('opacity', 0);
    svg.select<SVGCircleElement>('circle.hover-dot').attr('opacity', 0);
    hideTip(true);
  }
  function onKey(e: KeyboardEvent) {
    if (!series.length) return;
    const cur = selectedIdx ?? 0;
    if (e.key === 'ArrowLeft') { e.preventDefault(); selectIdx(Math.max(0, cur - 1)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); selectIdx(Math.min(series.length - 1, cur + 1)); }
    else if (e.key === 'Home') { e.preventDefault(); selectIdx(0); }
    else if (e.key === 'End') { e.preventDefault(); selectIdx(series.length - 1); }
    else if (e.key === 'Escape') { e.preventDefault(); clearSelection(); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectIdx(selectedIdx ?? 0); }
  }

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

    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    const x = d3.scaleLinear().domain(d3.extent(series, (d) => d.year) as [number, number]).range([0, innerW]);
    const yMax = d3.max(series, (d) => d.reserve) ?? 0;
    const y = d3.scaleLinear().domain([0, yMax * 1.1]).range([innerH, 0]);
    (svgEl as SVGSVGElement & { __scaleX?: typeof x; __scaleY?: typeof y }).__scaleX = x;
    (svgEl as SVGSVGElement & { __scaleX?: typeof x; __scaleY?: typeof y }).__scaleY = y;

    g.append('g').attr('class', 'grid')
      .call(d3.axisLeft(y).ticks(3).tickSize(-innerW).tickFormat(() => '') as never);

    g.append('g').attr('class', 'axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(isCompact ? 4 : Math.min(series.length, 8)).tickFormat(d3.format('d')) as never);

    g.append('g').attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(3).tickFormat((d) => formatChartUSD(+d, 'compact')) as never);

    const area = d3.area<{ year: number; reserve: number }>()
      .x((d) => x(d.year)).y0(innerH).y1((d) => y(d.reserve))
      .curve(d3.curveMonotoneX);
    g.append('path').datum(series).attr('fill', chartColors.reserve).attr('opacity', 0.85).attr('d', area as never);

    const lastPoint = series[series.length - 1];
    if (lastPoint && !isCompact) {
      g.append('text').attr('class', 'annotation-label')
        .attr('x', x(lastPoint.year)).attr('y', y(lastPoint.reserve) - 6)
        .attr('text-anchor', 'end').attr('fill', chartColors.reserve)
        .text(formatChartUSD(lastPoint.reserve, 'precise'));
    }

    g.append('line').attr('class', 'hover-guide')
      .attr('y1', 0).attr('y2', innerH)
      .attr('stroke', chartColors.balance).attr('stroke-width', 1).attr('stroke-dasharray', '2 3')
      .attr('opacity', 0);
    g.append('circle').attr('class', 'hover-dot')
      .attr('r', 3.5).attr('fill', chartColors.reserve).attr('stroke', chartColors.paper).attr('stroke-width', 1.4)
      .attr('opacity', 0);

    // Per-mark focusable hit targets — every reserve year is individually tabbable.
    g.selectAll('circle.point-hit').data(series).enter()
      .append('circle').attr('class', 'point-hit')
      .attr('cx', (d) => x(d.year)).attr('cy', (d) => y(d.reserve))
      .attr('r', 12).attr('fill', 'transparent')
      .attr('tabindex', 0).attr('role', 'img')
      .attr('aria-label', (d) => describePlain(d))
      .on('focus', function (this: SVGCircleElement, _e, d) {
        const idx = series.indexOf(d);
        if (idx < 0) return;
        selectedIdx = idx;
        d3.select(svgEl as SVGSVGElement).select<SVGLineElement>('line.hover-guide')
          .attr('x1', x(d.year)).attr('x2', x(d.year)).attr('opacity', 1);
        d3.select(svgEl as SVGSVGElement).select<SVGCircleElement>('circle.hover-dot')
          .attr('cx', x(d.year)).attr('cy', y(d.reserve)).attr('opacity', 1);
        liveMsg = describePlain(d);
        const r = this.getBoundingClientRect();
        showTip(r.left + r.width / 2, r.top + r.height / 2, describe(d), true);
      })
      .on('blur', () => hideTip(true));

    function pickIdx(mx: number) {
      const yr = x.invert(mx - m.left);
      let bi = 0, bd = Infinity;
      for (let i = 0; i < series.length; i++) {
        const dist = Math.abs(series[i].year - yr);
        if (dist < bd) { bd = dist; bi = i; }
      }
      return bi;
    }

    g.append('rect').attr('class', 'hit')
      .attr('width', innerW).attr('height', innerH)
      .attr('fill', 'transparent').style('cursor', 'crosshair')
      .on('pointermove', (event: PointerEvent) => {
        const [mx] = d3.pointer(event, svgEl);
        const idx = pickIdx(mx);
        const point = series[idx];
        if (!point) return;
        d3.select(svgEl as SVGSVGElement).select<SVGLineElement>('line.hover-guide')
          .attr('x1', x(point.year)).attr('x2', x(point.year)).attr('opacity', 1);
        d3.select(svgEl as SVGSVGElement).select<SVGCircleElement>('circle.hover-dot')
          .attr('cx', x(point.year)).attr('cy', y(point.reserve)).attr('opacity', 1);
        const sticky = event.pointerType !== 'mouse';
        if (sticky) selectedIdx = idx;
        showTip(event.clientX, event.clientY, describe(point), sticky);
      })
      .on('pointerdown', (event: PointerEvent) => {
        const [mx] = d3.pointer(event, svgEl);
        const idx = pickIdx(mx);
        const point = series[idx];
        if (!point) return;
        selectedIdx = idx;
        d3.select(svgEl as SVGSVGElement).select<SVGLineElement>('line.hover-guide')
          .attr('x1', x(point.year)).attr('x2', x(point.year)).attr('opacity', 1);
        d3.select(svgEl as SVGSVGElement).select<SVGCircleElement>('circle.hover-dot')
          .attr('cx', x(point.year)).attr('cy', y(point.reserve)).attr('opacity', 1);
        liveMsg = describePlain(point);
        showTip(event.clientX, event.clientY, describe(point), true);
      })
      .on('pointerleave', (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        if (selectedIdx == null) {
          d3.select(svgEl as SVGSVGElement).select<SVGLineElement>('line.hover-guide').attr('opacity', 0);
          d3.select(svgEl as SVGSVGElement).select<SVGCircleElement>('circle.hover-dot').attr('opacity', 0);
        }
        hideTip();
      });

    if (selectedIdx != null) updateMarkerForSelection(selectedIdx);
  }

  $effect(() => { void series; void renderedW; draw(); });

  function onContainerPointerDown(event: PointerEvent) {
    if (event.target instanceof SVGElement && (event.target as SVGElement).classList.contains('hit')) return;
    if (tip.sticky) hideTip(true);
  }

  onMount(() => {
    if (svgEl && register) register(svgEl);
    if (!containerEl) return;
    const ro = new ResizeObserver((e) => {
      const w = e[0]?.contentRect.width ?? width;
      renderedW = Math.max(280, Math.floor(w));
    });
    ro.observe(containerEl);
    return () => ro.disconnect();
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={containerEl} style="width:100%; position:relative;" onpointerdown={onContainerPointerDown}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <svg
    bind:this={svgEl}
    tabindex="0"
    role="img"
    aria-label={a11yLabel}
    aria-keyshortcuts="ArrowLeft ArrowRight Home End Escape"
    onkeydown={onKey}
  ></svg>
  <div
    class="chart-tip"
    class:visible={tip.vis}
    style="left:{tip.x}px; top:{tip.y}px"
  >{@html tip.html}</div>
  <p class="sr-only" aria-live="polite">{liveMsg}</p>

  {#if selectedPoint}
    <p class="chart-selection-chip">
      <span class="chip-year">{selectedPoint.year}</span>
      <span class="chip-val">{formatChartUSD(selectedPoint.reserve, 'precise')} sitting</span>
      <span class="chip-sub">unspent at year-end</span>
      <button class="chip-clear" onclick={clearSelection} aria-label="Clear selection">×</button>
    </p>
  {/if}
</div>
