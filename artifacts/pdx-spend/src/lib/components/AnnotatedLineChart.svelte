<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { CashPoint, AuditEvent } from '$lib/data/types';
  import { formatChartUSD } from '$lib/charts/format';
  import { chartColors, CHART_COMPACT_BREAKPOINT } from '$lib/charts/colors';
  import { layoutTopLabels } from '$lib/charts/annotations';

  interface Props {
    data: CashPoint[];
    events?: AuditEvent[];
    width?: number;
    height?: number;
    activeYear?: number | null;
    register?: (svg: SVGSVGElement) => void;
  }

  let { data, events = [], width = 820, height = 420, activeYear = null, register }: Props = $props();

  let svgEl: SVGSVGElement | undefined = $state();
  let containerEl: HTMLDivElement | undefined = $state();
  // svelte-ignore state_referenced_locally
  let renderedW = $state(width);
  let tip = $state({ vis: false, x: 0, y: 0, html: '', sticky: false });
  let selectedIdx = $state<number | null>(null);
  let liveMsg = $state('');

  const isCompact = $derived(renderedW < CHART_COMPACT_BREAKPOINT);
  const innerHeight = $derived(isCompact ? Math.max(440, height) : height);

  const margin = $derived(
    isCompact
      ? { top: 24, right: 12, bottom: 36, left: 44 }
      : { top: 28, right: 28, bottom: 36, left: 64 }
  );

  const eventsByYear = $derived(new Map(events.map((e) => [e.year, e])));
  const annotated = $derived(
    data.filter((d) => eventsByYear.has(d.year)).sort((a, b) => a.year - b.year)
  );

  const a11yLabel = $derived.by(() => {
    if (!data.length) return 'Annotated cash position over time';
    const first = data[0];
    const last = data[data.length - 1];
    return `Year-end balance from ${first.year} to ${last.year}: ${formatChartUSD(first.balance, 'precise')} to ${formatChartUSD(last.balance, 'precise')}.`;
  });

  const selectedPoint = $derived(selectedIdx != null ? data[selectedIdx] : null);
  const selectedEvent = $derived(selectedPoint ? eventsByYear.get(selectedPoint.year) : undefined);

  function showTip(clientX: number, clientY: number, html: string, sticky = false) {
    if (!containerEl) return;
    const r = containerEl.getBoundingClientRect();
    tip = { vis: true, x: clientX - r.left, y: clientY - r.top, html, sticky };
  }
  function hideTip(force = false) {
    if (tip.sticky && !force) return;
    tip = { ...tip, vis: false, sticky: false };
  }
  function describePoint(point: CashPoint, ev?: AuditEvent) {
    const evLine = ev ? `<span class="sub">${ev.label}</span>` : '';
    return `<strong>${point.year}</strong> · ${formatChartUSD(point.balance, 'precise')} balance<span class="sub">${formatChartUSD(point.obligated, 'precise')} obligated</span>${evLine}`;
  }

  function updateMarkerForSelection(idx: number) {
    // d3-side guide/dot mirror the selected index
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    const m = margin;
    const x = (svg.node() as SVGSVGElement & { __scaleX?: d3.ScaleLinear<number, number> }).__scaleX;
    const y = (svg.node() as SVGSVGElement & { __scaleY?: d3.ScaleLinear<number, number> }).__scaleY;
    if (!x || !y) return;
    const point = data[idx];
    if (!point) return;
    svg.select<SVGLineElement>('line.hover-guide')
      .attr('x1', x(point.year))
      .attr('x2', x(point.year))
      .attr('opacity', 1);
    svg.select<SVGCircleElement>('circle.hover-dot')
      .attr('cx', x(point.year))
      .attr('cy', y(point.balance))
      .attr('opacity', 1);
    void m;
  }

  function selectIdx(idx: number, opts: { focus?: boolean } = {}) {
    if (idx < 0 || idx >= data.length) return;
    selectedIdx = idx;
    const point = data[idx];
    const ev = eventsByYear.get(point.year);
    updateMarkerForSelection(idx);
    liveMsg = `${point.year}: ${formatChartUSD(point.balance, 'precise')} balance${ev ? `, ${ev.label}` : ''}`;
    if (opts.focus && containerEl && svgEl) {
      // anchor the tooltip on the selected point's screen coordinate
      const rect = svgEl.getBoundingClientRect();
      const scaleX = rect.width / Math.max(renderedW, 1);
      const x = (svgEl as SVGSVGElement & { __scaleX?: d3.ScaleLinear<number, number> }).__scaleX;
      const y = (svgEl as SVGSVGElement & { __scaleY?: d3.ScaleLinear<number, number> }).__scaleY;
      if (x && y) {
        const sx = rect.left + (x(point.year) + margin.left) * scaleX;
        const sy = rect.top + (y(point.balance) + margin.top) * scaleX;
        showTip(sx, sy, describePoint(point, ev), true);
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

  function onHitKeyDown(e: KeyboardEvent) {
    if (!data.length) return;
    const cur = selectedIdx ?? 0;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectIdx(Math.max(0, cur - 1), { focus: true });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectIdx(Math.min(data.length - 1, cur + 1), { focus: true });
    } else if (e.key === 'Home') {
      e.preventDefault();
      selectIdx(0, { focus: true });
    } else if (e.key === 'End') {
      e.preventDefault();
      selectIdx(data.length - 1, { focus: true });
    } else if (e.key === 'Escape') {
      e.preventDefault();
      clearSelection();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectIdx(selectedIdx ?? 0, { focus: true });
    }
  }

  function draw() {
    if (!svgEl) return;
    hideTip(true);
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const w = renderedW;
    const h = innerHeight;
    const m = margin;
    const innerW = w - m.left - m.right;
    const innerH = h - m.top - m.bottom;

    svg
      .attr('viewBox', `0 0 ${w} ${h}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('width', '100%')
      .attr('height', h)
      .attr('role', 'img')
      .attr('aria-label', a11yLabel);

    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year) as [number, number])
      .range([0, innerW]);
    const yMax = d3.max(data, (d) => d.balance) ?? 0;
    const y = d3.scaleLinear().domain([0, yMax * 1.08]).range([innerH, 0]);

    // stash scales so keyboard handler can read them
    (svgEl as SVGSVGElement & { __scaleX?: typeof x; __scaleY?: typeof y }).__scaleX = x;
    (svgEl as SVGSVGElement & { __scaleX?: typeof x; __scaleY?: typeof y }).__scaleY = y;

    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(y).ticks(isCompact ? 3 : 5).tickSize(-innerW).tickFormat(() => '') as never
      );

    const xTicks = isCompact ? Math.min(data.length, 5) : Math.min(data.length, 10);
    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(xTicks).tickFormat(d3.format('d')) as never);

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(isCompact ? 3 : 5).tickFormat((d) => formatChartUSD(+d, 'compact')) as never);

    const area = d3
      .area<CashPoint>()
      .x((d) => x(d.year))
      .y0(innerH)
      .y1((d) => y(d.obligated))
      .curve(d3.curveMonotoneX);

    g.append('path').datum(data).attr('fill', chartColors.obligated).attr('opacity', 0.45).attr('d', area as never);

    const line = d3
      .line<CashPoint>()
      .x((d) => x(d.year))
      .y((d) => y(d.balance))
      .curve(d3.curveMonotoneX);

    g.append('path').datum(data).attr('fill', 'none').attr('stroke', chartColors.balance).attr('stroke-width', 1.6).attr('d', line as never);

    g.selectAll('circle.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d) => x(d.year))
      .attr('cy', (d) => y(d.balance))
      .attr('r', 2.4)
      .attr('fill', chartColors.balance);

    // Per-mark focusable hit targets — each data point is individually
    // tabbable so keyboard users can reach every year via Tab as well as
    // arrow keys on the SVG.
    g.selectAll('circle.point-hit')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point-hit')
      .attr('cx', (d) => x(d.year))
      .attr('cy', (d) => y(d.balance))
      .attr('r', 12)
      .attr('fill', 'transparent')
      .attr('tabindex', 0)
      .attr('role', 'img')
      .attr('aria-label', (d) => {
        const ev = eventsByYear.get(d.year);
        return `${d.year}: ${formatChartUSD(d.balance, 'precise')} year-end balance${ev ? `. ${ev.label}` : ''}`;
      })
      .on('focus', function (this: SVGCircleElement, _e, d) {
        const idx = data.indexOf(d);
        if (idx < 0) return;
        selectedIdx = idx;
        d3.select(svgEl as SVGSVGElement).select<SVGLineElement>('line.hover-guide')
          .attr('x1', x(d.year)).attr('x2', x(d.year)).attr('opacity', 1);
        d3.select(svgEl as SVGSVGElement).select<SVGCircleElement>('circle.hover-dot')
          .attr('cx', x(d.year)).attr('cy', y(d.balance)).attr('opacity', 1);
        const ev = eventsByYear.get(d.year);
        liveMsg = `${d.year}: ${formatChartUSD(d.balance, 'precise')} balance${ev ? `, ${ev.label}` : ''}`;
        const r = this.getBoundingClientRect();
        showTip(r.left + r.width / 2, r.top + r.height / 2, describePoint(d, ev), true);
      })
      .on('blur', () => hideTip(true));

    if (!isCompact) {
      const labelEstWidth = 96;
      const layout = layoutTopLabels(
        annotated.map((d, i) => ({
          id: `${d.year}-${i}`,
          x: x(d.year),
          y: y(d.balance),
          width: labelEstWidth
        })),
        { topY: -8, rowHeight: 14, minGap: 6, maxRows: 3 }
      );

      layout.forEach((p, i) => {
        const ev = eventsByYear.get(annotated[i].year)!;
        g.append('line')
          .attr('class', 'annotation-line')
          .attr('x1', p.ax).attr('x2', p.lx)
          .attr('y1', p.ay).attr('y2', p.ly + 6);
        g.append('circle')
          .attr('cx', p.ax).attr('cy', p.ay).attr('r', 4.2)
          .attr('fill', chartColors.audit).attr('stroke', chartColors.paper).attr('stroke-width', 1.4);
        const labelText = ev.label.toUpperCase();
        const textNode = g.append('text')
          .attr('class', 'annotation-label')
          .attr('x', p.lx).attr('y', p.ly)
          .attr('text-anchor', 'middle')
          .text(labelText);
        const bbox = (textNode.node() as SVGTextElement).getBBox();
        g.insert('rect', 'text.annotation-label:last-of-type')
          .attr('x', bbox.x - 4).attr('y', bbox.y - 1)
          .attr('width', bbox.width + 8).attr('height', bbox.height + 2)
          .attr('fill', chartColors.paper);
        textNode.raise();
      });
    } else {
      annotated.forEach((d, i) => {
        const xx = x(d.year);
        const yy = y(d.balance);
        const num = i + 1;
        g.append('circle')
          .attr('cx', xx).attr('cy', yy).attr('r', 7)
          .attr('fill', chartColors.audit).attr('stroke', chartColors.paper).attr('stroke-width', 1.6);
        g.append('text')
          .attr('x', xx).attr('y', yy).attr('dy', '0.34em').attr('text-anchor', 'middle')
          .attr('font-family', 'JetBrains Mono, ui-monospace, monospace')
          .attr('font-size', 9).attr('font-weight', 600)
          .attr('fill', chartColors.paper)
          .text(String(num));
      });
    }

    if (activeYear != null) {
      const point = data.find((d) => d.year === activeYear);
      if (point) {
        g.append('line')
          .attr('x1', x(point.year)).attr('x2', x(point.year))
          .attr('y1', 0).attr('y2', innerH)
          .attr('stroke', chartColors.audit).attr('stroke-width', 1.4).attr('stroke-dasharray', '2 3');
        g.append('circle')
          .attr('cx', x(point.year)).attr('cy', y(point.balance)).attr('r', 6)
          .attr('fill', 'none').attr('stroke', chartColors.audit).attr('stroke-width', 1.6);
        g.append('text').attr('class', 'annotation-label')
          .attr('x', x(point.year) + 8).attr('y', y(point.balance) - 8)
          .attr('text-anchor', 'start').attr('fill', chartColors.audit)
          .text(formatChartUSD(point.balance, 'precise'));
      }
    }

    if (!isCompact) {
      g.append('text').attr('class', 'label')
        .attr('x', -innerH / 2).attr('y', -50)
        .attr('transform', 'rotate(-90)').attr('text-anchor', 'middle')
        .attr('fill', chartColors.axis)
        .text('Year-end balance · USD');
    }

    g.append('line').attr('class', 'hover-guide')
      .attr('y1', 0).attr('y2', innerH)
      .attr('stroke', chartColors.balance).attr('stroke-width', 1).attr('stroke-dasharray', '2 3')
      .attr('opacity', 0);
    g.append('circle').attr('class', 'hover-dot')
      .attr('r', 4).attr('fill', chartColors.balance).attr('stroke', chartColors.paper).attr('stroke-width', 1.4)
      .attr('opacity', 0);

    function pickIdx(mx: number) {
      const yr = x.invert(mx - m.left);
      let bestI = 0;
      let bestD = Infinity;
      for (let i = 0; i < data.length; i++) {
        const dist = Math.abs(data[i].year - yr);
        if (dist < bestD) { bestD = dist; bestI = i; }
      }
      return bestI;
    }

    g.append('rect')
      .attr('class', 'hit')
      .attr('width', innerW).attr('height', innerH)
      .attr('fill', 'transparent').style('cursor', 'crosshair')
      .on('pointermove', (event: PointerEvent) => {
        const [mx] = d3.pointer(event, svgEl);
        const idx = pickIdx(mx);
        const point = data[idx];
        if (!point) return;
        d3.select(svgEl as SVGSVGElement).select<SVGLineElement>('line.hover-guide')
          .attr('x1', x(point.year)).attr('x2', x(point.year)).attr('opacity', 1);
        d3.select(svgEl as SVGSVGElement).select<SVGCircleElement>('circle.hover-dot')
          .attr('cx', x(point.year)).attr('cy', y(point.balance)).attr('opacity', 1);
        const ev = eventsByYear.get(point.year);
        const sticky = event.pointerType !== 'mouse';
        if (sticky) selectedIdx = idx;
        showTip(event.clientX, event.clientY, describePoint(point, ev), sticky);
      })
      .on('pointerdown', (event: PointerEvent) => {
        const [mx] = d3.pointer(event, svgEl);
        const idx = pickIdx(mx);
        const point = data[idx];
        if (!point) return;
        selectedIdx = idx;
        d3.select(svgEl as SVGSVGElement).select<SVGLineElement>('line.hover-guide')
          .attr('x1', x(point.year)).attr('x2', x(point.year)).attr('opacity', 1);
        d3.select(svgEl as SVGSVGElement).select<SVGCircleElement>('circle.hover-dot')
          .attr('cx', x(point.year)).attr('cy', y(point.balance)).attr('opacity', 1);
        const ev = eventsByYear.get(point.year);
        liveMsg = `${point.year}: ${formatChartUSD(point.balance, 'precise')} balance${ev ? `, ${ev.label}` : ''}`;
        showTip(event.clientX, event.clientY, describePoint(point, ev), true);
      })
      .on('pointerleave', (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        if (selectedIdx == null) {
          d3.select(svgEl as SVGSVGElement).select<SVGLineElement>('line.hover-guide').attr('opacity', 0);
          d3.select(svgEl as SVGSVGElement).select<SVGCircleElement>('circle.hover-dot').attr('opacity', 0);
        }
        hideTip();
      });

    // restore visible marker for any prior selection
    if (selectedIdx != null) updateMarkerForSelection(selectedIdx);
  }

  $effect(() => {
    void data;
    void events;
    void activeYear;
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
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? width;
      renderedW = Math.max(320, Math.floor(w));
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
    onkeydown={onHitKeyDown}
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
      <span class="chip-val">{formatChartUSD(selectedPoint.balance, 'precise')} balance</span>
      <span class="chip-sub">{formatChartUSD(selectedPoint.obligated, 'precise')} obligated</span>
      {#if selectedEvent}<span class="chip-sub">{selectedEvent.label}</span>{/if}
      <button class="chip-clear" onclick={clearSelection} aria-label="Clear selection">×</button>
    </p>
  {/if}

  {#if isCompact && annotated.length > 0}
    <ol class="chart-annotation-list" aria-label="Annotations on this chart">
      {#each annotated as point, i}
        {@const ev = eventsByYear.get(point.year)}
        <li>
          <span class="ann-num" aria-hidden="true">{i + 1}</span>
          <span class="ann-year">{point.year}</span>
          <span class="ann-label">{ev?.label ?? ''}</span>
          {#if ev?.body}<span class="ann-body">{ev.body}</span>{/if}
        </li>
      {/each}
    </ol>
  {/if}
</div>
