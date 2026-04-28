<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { DriftEntry } from '$lib/data/types';

  interface Props {
    drift: DriftEntry[];
    width?: number;
    height?: number;
    register?: (svg: SVGSVGElement) => void;
  }

  let { drift, width = 820, height = 240, register }: Props = $props();

  let svgEl: SVGSVGElement | undefined = $state();
  let containerEl: HTMLDivElement | undefined = $state();
  // svelte-ignore state_referenced_locally
  let renderedW = $state(width);
  let tip = $state({ vis: false, x: 0, y: 0, html: '' });

  const margin = { top: 24, right: 36, bottom: 36, left: 60 };

  function showTip(event: MouseEvent, html: string) {
    if (!containerEl) return;
    const r = containerEl.getBoundingClientRect();
    tip = { vis: true, x: event.clientX - r.left, y: event.clientY - r.top, html };
  }
  function hideTip() { tip = { ...tip, vis: false }; }

  function draw() {
    if (!svgEl) return;
    hideTip();
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const w = renderedW;
    const innerW = w - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${w} ${height}`).attr('width', w).attr('height', height);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(drift, (d) => d.year) as [number, number])
      .range([0, innerW]);
    const y = d3.scaleLinear().domain([0, 100]).range([innerH, 0]);

    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y).ticks(4).tickSize(-innerW).tickFormat(() => '') as never);

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(Math.min(drift.length, 8)).tickFormat(d3.format('d')) as never);

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(4).tickFormat((d) => `${d}%`) as never);

    // intent line at 100
    g.append('line')
      .attr('x1', 0).attr('x2', innerW)
      .attr('y1', y(100)).attr('y2', y(100))
      .attr('stroke', '#54514a').attr('stroke-width', 1).attr('stroke-dasharray', '3 3');

    g.append('text')
      .attr('class', 'annotation-label')
      .attr('x', innerW)
      .attr('y', y(100) - 6)
      .attr('text-anchor', 'end')
      .attr('fill', '#54514a')
      .text('VOTER INTENT — 100%');

    // shaded area between intent and actual
    const area = d3
      .area<DriftEntry>()
      .x((d) => x(d.year))
      .y0(y(100))
      .y1((d) => y(d.actualUse))
      .curve(d3.curveMonotoneX);

    g.append('path').datum(drift).attr('fill', '#b23c1a').attr('opacity', 0.16).attr('d', area as never);

    // actual use line
    const line = d3
      .line<DriftEntry>()
      .x((d) => x(d.year))
      .y((d) => y(d.actualUse))
      .curve(d3.curveMonotoneX);

    g.append('path').datum(drift).attr('fill', 'none').attr('stroke', '#b23c1a').attr('stroke-width', 1.6).attr('d', line as never);

    g.selectAll('circle.point')
      .data(drift)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d) => x(d.year))
      .attr('cy', (d) => y(d.actualUse))
      .attr('r', 2.4)
      .attr('fill', '#b23c1a');

    // notes
    drift
      .filter((d) => d.note)
      .forEach((d, i) => {
        const xx = x(d.year);
        const yy = y(d.actualUse);
        const labelY = yy + 14 + (i % 2) * 12;
        g.append('line')
          .attr('class', 'annotation-line')
          .attr('x1', xx).attr('x2', xx)
          .attr('y1', yy).attr('y2', labelY - 4);
        g.append('text')
          .attr('class', 'annotation-label')
          .attr('x', xx + 4)
          .attr('y', labelY)
          .text((d.note ?? '').toUpperCase());
      });

    // hover layer
    const guide = g.append('line')
      .attr('y1', 0).attr('y2', innerH)
      .attr('stroke', '#161513').attr('stroke-width', 1).attr('stroke-dasharray', '2 3')
      .attr('opacity', 0);
    const dot = g.append('circle')
      .attr('r', 4).attr('fill', '#b23c1a').attr('stroke', '#f7f5f0').attr('stroke-width', 1.4)
      .attr('opacity', 0);

    g.append('rect')
      .attr('width', innerW).attr('height', innerH)
      .attr('fill', 'transparent').style('cursor', 'crosshair')
      .on('mousemove', (event: MouseEvent) => {
        const [mx] = d3.pointer(event, svgEl);
        const yr = x.invert(mx - margin.left);
        const point = drift.reduce((best, p) =>
          Math.abs(p.year - yr) < Math.abs(best.year - yr) ? p : best, drift[0]);
        if (!point) return;
        guide.attr('x1', x(point.year)).attr('x2', x(point.year)).attr('opacity', 1);
        dot.attr('cx', x(point.year)).attr('cy', y(point.actualUse)).attr('opacity', 1);
        const noteLine = point.note ? `<span class="sub">${point.note}</span>` : '';
        showTip(event, `<strong>${point.year}</strong> · ${Math.round(point.actualUse)}% on voter intent<span class="sub">${100 - Math.round(point.actualUse)}% drifted</span>${noteLine}`);
      })
      .on('mouseleave', () => {
        guide.attr('opacity', 0);
        dot.attr('opacity', 0);
        hideTip();
      });
  }

  $effect(() => { void drift; void renderedW; draw(); });

  onMount(() => {
    if (svgEl && register) register(svgEl);
    if (!containerEl) return;
    const ro = new ResizeObserver((e) => {
      const w = e[0]?.contentRect.width ?? width;
      renderedW = Math.max(360, Math.floor(w));
    });
    ro.observe(containerEl);
    return () => ro.disconnect();
  });
</script>

<div bind:this={containerEl} style="width:100%; position:relative;">
  <svg bind:this={svgEl} role="img" aria-label="Drift between voter intent and actual disposition"></svg>
  <div
    class="chart-tip"
    class:visible={tip.vis}
    style="left:{tip.x}px; top:{tip.y}px"
  >{@html tip.html}</div>
</div>
