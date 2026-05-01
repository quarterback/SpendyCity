<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { PromiseVsHappened } from '$lib/data/types';
  import { formatChartUSD } from '$lib/charts/format';
  import { chartColors, CHART_COMPACT_BREAKPOINT } from '$lib/charts/colors';

  interface Props {
    data: PromiseVsHappened[];
    width?: number;
    height?: number;
    register?: (svg: SVGSVGElement) => void;
  }

  let { data, width = 820, height = 360, register }: Props = $props();

  let svgEl: SVGSVGElement | undefined = $state();
  let containerEl: HTMLDivElement | undefined = $state();
  // svelte-ignore state_referenced_locally
  let renderedW = $state(width);
  let tip = $state({ vis: false, x: 0, y: 0, html: '', sticky: false });
  let selectedCycle = $state<string | null>(null);
  let liveMsg = $state('');
  const selectedRow = $derived(data.find((d) => d.cycle === selectedCycle) ?? null);
  function clearSelection() { selectedCycle = null; hideTip(true); }

  const isCompact = $derived(renderedW < CHART_COMPACT_BREAKPOINT);
  // On mobile we drive the height from the row count so each cycle has
  // ~56px of vertical space — enough for the bar pair plus its label and
  // gap callout to be legible without horizontal scrolling.
  const compactHeight = $derived(Math.max(420, data.length * 64 + 96));
  const renderHeight = $derived(isCompact ? compactHeight : height);
  const margin = $derived(
    isCompact
      ? { top: 22, right: 14, bottom: 56, left: 64 }
      : { top: 28, right: 90, bottom: 36, left: 92 }
  );

  const a11yLabel = $derived.by(() => {
    if (!data.length) return 'Promised vs delivered, by fiscal cycle';
    const totalP = data.reduce((s, d) => s + d.promised, 0);
    const totalD = data.reduce((s, d) => s + d.delivered, 0);
    return `Promised vs delivered across ${data.length} cycles. Total promised ${formatChartUSD(totalP, 'precise')}, delivered ${formatChartUSD(totalD, 'precise')}.`;
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

  function draw() {
    if (!svgEl) return;
    hideTip(true);
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const w = renderedW;
    const m = margin;
    const h = renderHeight;
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

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.cycle))
      .range([0, innerH])
      .padding(0.32);

    const maxVal = d3.max(data, (d) => Math.max(d.promised, d.delivered)) ?? 0;
    const x = d3.scaleLinear().domain([0, maxVal * 1.1]).range([0, innerW]);

    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisBottom(x).ticks(isCompact ? 3 : 4).tickSize(innerH).tickFormat(() => '') as never)
      .attr('transform', `translate(0,0)`);

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(isCompact ? 3 : 4).tickFormat((d) => formatChartUSD(+d, 'compact')) as never);

    g.append('g').attr('class', 'axis').call(d3.axisLeft(y) as never);

    const barH = y.bandwidth() / 2 - 1;

    const tipFor = (d: PromiseVsHappened) =>
      `<strong>${d.cycle}</strong> · ${formatChartUSD(d.delivered, 'precise')} delivered<span class="sub">of ${formatChartUSD(d.promised, 'precise')} promised · gap ${formatChartUSD(d.promised - d.delivered, 'precise')}</span>`;

    // promised bar (lighter)
    g.selectAll('rect.promised')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'promised')
      .attr('x', 0)
      .attr('y', (d) => (y(d.cycle) ?? 0))
      .attr('width', (d) => x(d.promised))
      .attr('height', barH)
      .attr('fill', chartColors.obligated)
      .attr('stroke', chartColors.obligated)
      .attr('stroke-width', 0.5);

    g.selectAll('rect.delivered')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'delivered')
      .attr('x', 0)
      .attr('y', (d) => (y(d.cycle) ?? 0) + barH + 2)
      .attr('width', (d) => x(d.delivered))
      .attr('height', barH)
      .attr('fill', chartColors.balance);

    // transparent hit row covering the full row height for easier hover/tap
    g.selectAll('rect.hit')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'hit')
      .attr('x', 0)
      .attr('y', (d) => y(d.cycle) ?? 0)
      .attr('width', innerW)
      .attr('height', y.bandwidth())
      .attr('fill', 'transparent')
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', (d) =>
        `${d.cycle}: promised ${formatChartUSD(d.promised, 'precise')}, delivered ${formatChartUSD(d.delivered, 'precise')}`
      )
      .style('cursor', 'pointer')
      .on('pointerenter pointermove', (event: PointerEvent, d) => {
        const sticky = event.pointerType !== 'mouse';
        showTip(event.clientX, event.clientY, tipFor(d), sticky);
      })
      .on('pointerdown', (event: PointerEvent, d) => {
        selectedCycle = d.cycle;
        liveMsg = `${d.cycle}: ${formatChartUSD(d.delivered, 'precise')} delivered of ${formatChartUSD(d.promised, 'precise')} promised`;
        showTip(event.clientX, event.clientY, tipFor(d), true);
      })
      .on('pointerleave', (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        hideTip();
      })
      .on('focus', function (this: SVGRectElement, _e, d) {
        const r = this.getBoundingClientRect();
        selectedCycle = d.cycle;
        liveMsg = `${d.cycle}: ${formatChartUSD(d.delivered, 'precise')} delivered of ${formatChartUSD(d.promised, 'precise')} promised`;
        showTip(r.left + r.width / 2, r.top + r.height / 2, tipFor(d), true);
      })
      .on('blur', () => hideTip(true));

    // gap labels (omit on compact for space)
    if (!isCompact) {
      g.selectAll('text.gap')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'annotation-label')
        .attr('x', (d) => Math.min(x(d.promised) + 6, innerW - 4))
        .attr('y', (d) => (y(d.cycle) ?? 0) + barH / 2)
        .attr('dy', '0.32em')
        .attr('fill', chartColors.movable)
        .text((d) => `gap ${formatChartUSD(d.promised - d.delivered, 'compact')}`);

      g.selectAll('text.deliv-val')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'annotation-label')
        .attr('x', (d) => Math.min(x(d.delivered) + 6, innerW - 4))
        .attr('y', (d) => (y(d.cycle) ?? 0) + barH + 2 + barH / 2)
        .attr('dy', '0.32em')
        .attr('fill', chartColors.balance)
        .text((d) => formatChartUSD(d.delivered, 'compact'));
    }

    // legend (bottom on all sizes, but in compact stacks vertically)
    const legend = svg
      .append('g')
      .attr('transform', `translate(${m.left}, ${h - (isCompact ? 24 : 10)})`);
    legend.append('rect').attr('x', 0).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', chartColors.obligated);
    legend
      .append('text')
      .attr('class', 'label')
      .attr('x', 16)
      .attr('y', -3)
      .attr('fill', chartColors.axis)
      .text('Promised');
    if (isCompact) {
      legend.append('rect').attr('x', 0).attr('y', 6).attr('width', 12).attr('height', 8).attr('fill', chartColors.balance);
      legend.append('text').attr('class', 'label').attr('x', 16).attr('y', 13).attr('fill', chartColors.axis).text('Delivered');
    } else {
      legend.append('rect').attr('x', 96).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', chartColors.balance);
      legend.append('text').attr('class', 'label').attr('x', 112).attr('y', -3).attr('fill', chartColors.axis).text('Delivered');
    }
  }

  $effect(() => {
    void data;
    void renderedW;
    void renderHeight;
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
    <p class="chart-selection-chip">
      <span class="chip-year">{selectedRow.cycle}</span>
      <span class="chip-val">{formatChartUSD(selectedRow.delivered, 'precise')} delivered</span>
      <span class="chip-sub">of {formatChartUSD(selectedRow.promised, 'precise')} promised · gap {formatChartUSD(selectedRow.promised - selectedRow.delivered, 'precise')}</span>
      <button class="chip-clear" onclick={clearSelection} aria-label="Clear selection">×</button>
    </p>
  {/if}
</div>
