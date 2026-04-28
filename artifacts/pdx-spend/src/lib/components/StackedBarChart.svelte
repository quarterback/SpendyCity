<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import { formatChartUSD } from '$lib/charts/format';
  import { chartColors, chartPatternDefs, CHART_COMPACT_BREAKPOINT } from '$lib/charts/colors';

  export type Mode = 'dollars' | 'percent' | 'trajectory';

  interface FundRow {
    slug: string;
    shortName: string;
    balance: number;
    restricted: number;
    movable: number;
    cumulativeCollected: number;
    enacted: number;
    drift: number;
  }

  interface Props {
    rows: FundRow[];
    mode?: Mode;
    width?: number;
    height?: number;
    register?: (svg: SVGSVGElement) => void;
  }

  let { rows, mode = 'dollars', width = 900, height = 460, register }: Props = $props();

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
      ? { top: 22, right: 16, bottom: 56, left: 96 }
      : { top: 28, right: 60, bottom: 36, left: 168 }
  );

  const a11yLabel = $derived.by(() => {
    if (mode === 'dollars') {
      const total = rows.reduce((s, r) => s + r.balance, 0);
      return `Balance by fund. ${rows.length} funds, totaling ${formatChartUSD(total, 'precise')}.`;
    }
    if (mode === 'percent') {
      const totalB = rows.reduce((s, r) => s + r.balance, 0);
      const totalM = rows.reduce((s, r) => s + r.movable, 0);
      const pct = totalB > 0 ? Math.round((totalM / totalB) * 100) : 0;
      return `Share re-aimed, by fund. ${pct}% across the ${rows.length} funds.`;
    }
    const avg = Math.round(rows.reduce((s, r) => s + r.drift, 0) / Math.max(rows.length, 1));
    return `Share still on voter intent, by fund. Average ${avg}%.`;
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
  function tipFor(d: FundRow) {
    const pct = d.balance > 0 ? Math.round((d.movable / d.balance) * 100) : 0;
    return `<strong>${d.shortName}</strong> · ${formatChartUSD(d.balance, 'precise')} sitting<span class="sub">${formatChartUSD(d.movable, 'precise')} re-aimed (${pct}%) · ${formatChartUSD(d.restricted, 'precise')} on-mission · ${100 - Math.round(d.drift)}% drift</span>`;
  }

  const patternUid = `stack-${Math.random().toString(36).slice(2, 7)}`;

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

    const sorted = [...rows].sort((a, b) => b.balance - a.balance);
    const y = d3.scaleBand().domain(sorted.map((r) => r.shortName)).range([0, innerH]).padding(0.22);

    if (mode === 'dollars') {
      const xMax = d3.max(sorted, (r) => r.balance) ?? 0;
      const x = d3.scaleLinear().domain([0, xMax * 1.06]).range([0, innerW]);

      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisBottom(x).ticks(isCompact ? 3 : 4).tickSize(innerH).tickFormat(() => '') as never);

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(isCompact ? 3 : 4).tickFormat((d) => formatChartUSD(+d, 'compact')) as never);

      g.append('g').attr('class', 'axis').call(d3.axisLeft(y) as never);

      g.selectAll('rect.r')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'r')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', 0)
        .attr('width', (d) => x(d.restricted))
        .attr('height', y.bandwidth())
        .attr('fill', chartColors.restricted);

      g.selectAll('rect.m')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'm')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', (d) => x(d.restricted))
        .attr('width', (d) => x(d.movable))
        .attr('height', y.bandwidth())
        .attr('fill', `url(#${pats.movableId})`);

      if (!isCompact) {
        g.selectAll('text.t')
          .data(sorted)
          .enter()
          .append('text')
          .attr('class', 'annotation-label')
          .attr('x', (d) => x(d.balance) + 6)
          .attr('y', (d) => (y(d.shortName) ?? 0) + y.bandwidth() / 2)
          .attr('dy', '0.32em')
          .attr('fill', chartColors.balance)
          .text((d) => formatChartUSD(d.balance, 'precise'));
      }
    } else if (mode === 'percent') {
      const x = d3.scaleLinear().domain([0, 1]).range([0, innerW]);

      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisBottom(x).ticks(isCompact ? 3 : 5).tickSize(innerH).tickFormat(() => '') as never);

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(isCompact ? 3 : 5).tickFormat(d3.format('.0%')) as never);

      g.append('g').attr('class', 'axis').call(d3.axisLeft(y) as never);

      g.selectAll('rect.r')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'r')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', 0)
        .attr('width', (d) => x(d.restricted / d.balance))
        .attr('height', y.bandwidth())
        .attr('fill', chartColors.restricted);

      g.selectAll('rect.m')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'm')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', (d) => x(d.restricted / d.balance))
        .attr('width', (d) => x(d.movable / d.balance))
        .attr('height', y.bandwidth())
        .attr('fill', `url(#${pats.movableId})`);

      if (!isCompact) {
        g.selectAll('text.t')
          .data(sorted)
          .enter()
          .append('text')
          .attr('class', 'annotation-label')
          .attr('x', innerW + 6)
          .attr('y', (d) => (y(d.shortName) ?? 0) + y.bandwidth() / 2)
          .attr('dy', '0.32em')
          .attr('fill', chartColors.movable)
          .text((d) => `${Math.round((d.movable / d.balance) * 100)}% movable`);
      }
    } else {
      const x = d3.scaleLinear().domain([0, 100]).range([0, innerW]);

      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisBottom(x).ticks(isCompact ? 3 : 4).tickSize(innerH).tickFormat(() => '') as never);

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(isCompact ? 3 : 4).tickFormat((d) => `${d}%`) as never);

      g.append('g').attr('class', 'axis').call(d3.axisLeft(y) as never);

      g.append('line')
        .attr('x1', x(100))
        .attr('x2', x(100))
        .attr('y1', 0)
        .attr('y2', innerH)
        .attr('stroke', chartColors.intent)
        .attr('stroke-dasharray', '3 3');

      g.selectAll('rect.d')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'd')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', 0)
        .attr('width', (d) => x(d.drift))
        .attr('height', y.bandwidth())
        .attr('fill', chartColors.reserve);

      g.selectAll('rect.gap')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'gap')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', (d) => x(d.drift))
        .attr('width', (d) => x(100 - d.drift))
        .attr('height', y.bandwidth())
        .attr('fill', `url(#${pats.driftId})`);

      if (!isCompact) {
        g.selectAll('text.t')
          .data(sorted)
          .enter()
          .append('text')
          .attr('class', 'annotation-label')
          .attr('x', innerW + 6)
          .attr('y', (d) => (y(d.shortName) ?? 0) + y.bandwidth() / 2)
          .attr('dy', '0.32em')
          .attr('fill', chartColors.movable)
          .text((d) => `${100 - Math.round(d.drift)}% drift`);
      }
    }

    // hover/tap hit area: one rect per row covering the full band, also focusable
    g.selectAll('rect.hit')
      .data(sorted)
      .enter()
      .append('rect')
      .attr('class', 'hit')
      .attr('x', 0)
      .attr('y', (d) => y(d.shortName) ?? 0)
      .attr('width', innerW)
      .attr('height', y.bandwidth())
      .attr('fill', 'transparent')
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', (d) => {
        if (mode === 'percent') {
          const pct = d.balance > 0 ? Math.round((d.movable / d.balance) * 100) : 0;
          return `${d.shortName}: ${pct}% movable`;
        }
        if (mode === 'trajectory') {
          return `${d.shortName}: ${Math.round(d.drift)}% on intent, ${100 - Math.round(d.drift)}% drift`;
        }
        return `${d.shortName}: ${formatChartUSD(d.balance, 'precise')} sitting`;
      })
      .style('cursor', 'pointer')
      .on('pointerenter pointermove', (event: PointerEvent, d) => {
        const sticky = event.pointerType !== 'mouse';
        showTip(event.clientX, event.clientY, tipFor(d), sticky);
      })
      .on('pointerdown', (event: PointerEvent, d) => {
        selectedSlug = d.shortName;
        const pct = d.balance > 0 ? Math.round((d.movable / d.balance) * 100) : 0;
        liveMsg = `${d.shortName}: ${formatChartUSD(d.balance, 'precise')} sitting, ${pct}% re-aimed`;
        showTip(event.clientX, event.clientY, tipFor(d), true);
      })
      .on('pointerleave', (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        hideTip();
      })
      .on('focus', function (this: SVGRectElement, _e, d) {
        const r = this.getBoundingClientRect();
        selectedSlug = d.shortName;
        const pct = d.balance > 0 ? Math.round((d.movable / d.balance) * 100) : 0;
        liveMsg = `${d.shortName}: ${formatChartUSD(d.balance, 'precise')} sitting, ${pct}% re-aimed`;
        showTip(r.left + r.width / 2, r.top + r.height / 2, tipFor(d), true);
      })
      .on('blur', () => hideTip(true));

    // legend (always below)
    const legend = svg.append('g').attr('transform', `translate(${m.left}, ${height - (isCompact ? 24 : 12)})`);
    if (mode === 'trajectory') {
      legend.append('rect').attr('width', 12).attr('height', 8).attr('y', -10).attr('fill', chartColors.reserve);
      legend.append('text').attr('class', 'label').attr('x', 16).attr('y', -3).attr('fill', chartColors.axis).text('On voter intent');
      if (isCompact) {
        legend.append('rect').attr('x', 0).attr('y', 6).attr('width', 12).attr('height', 8).attr('fill', `url(#${pats.driftId})`);
        legend.append('text').attr('class', 'label').attr('x', 16).attr('y', 13).attr('fill', chartColors.axis).text('Drift');
      } else {
        legend.append('rect').attr('x', 130).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', `url(#${pats.driftId})`);
        legend.append('text').attr('class', 'label').attr('x', 146).attr('y', -3).attr('fill', chartColors.axis).text('Drift from voter intent');
      }
    } else {
      legend.append('rect').attr('width', 12).attr('height', 8).attr('y', -10).attr('fill', chartColors.restricted);
      legend.append('text').attr('class', 'label').attr('x', 16).attr('y', -3).attr('fill', chartColors.axis).text('On-mission');
      if (isCompact) {
        legend.append('rect').attr('x', 0).attr('y', 6).attr('width', 12).attr('height', 8).attr('fill', `url(#${pats.movableId})`);
        legend.append('text').attr('class', 'label').attr('x', 16).attr('y', 13).attr('fill', chartColors.axis).text('Re-aimed');
      } else {
        legend.append('rect').attr('x', 200).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', `url(#${pats.movableId})`);
        legend.append('text').attr('class', 'label').attr('x', 216).attr('y', -3).attr('fill', chartColors.axis).text('Re-aimed');
      }
    }
  }

  $effect(() => {
    void rows;
    void mode;
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
      <span class="chip-sub">{pct}% re-aimed · {100 - Math.round(selectedRow.drift)}% drift</span>
      <button class="chip-clear" onclick={clearSelection} aria-label="Clear selection">×</button>
    </p>
  {/if}
</div>
