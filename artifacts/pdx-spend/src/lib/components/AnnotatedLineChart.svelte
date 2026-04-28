<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { CashPoint, AuditEvent } from '$lib/data/types';

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
  let tip = $state({ vis: false, x: 0, y: 0, html: '' });

  const margin = { top: 24, right: 28, bottom: 36, left: 64 };

  function fmt(n: number) {
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
    if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
    return `$${n}`;
  }

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
      .domain(d3.extent(data, (d) => d.year) as [number, number])
      .range([0, innerW]);
    const yMax = d3.max(data, (d) => d.balance) ?? 0;
    const y = d3.scaleLinear().domain([0, yMax * 1.08]).range([innerH, 0]);

    // grid
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(y).ticks(5).tickSize(-innerW).tickFormat(() => '') as never
      );

    // axes
    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(Math.min(data.length, 10)).tickFormat(d3.format('d')) as never);

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(5).tickFormat((d) => fmt(+d)) as never);

    // obligated area (lighter underlay)
    const area = d3
      .area<CashPoint>()
      .x((d) => x(d.year))
      .y0(innerH)
      .y1((d) => y(d.obligated))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', '#c5bfae')
      .attr('opacity', 0.45)
      .attr('d', area as never);

    // balance line
    const line = d3
      .line<CashPoint>()
      .x((d) => x(d.year))
      .y((d) => y(d.balance))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#161513')
      .attr('stroke-width', 1.6)
      .attr('d', line as never);

    g.selectAll('circle.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d) => x(d.year))
      .attr('cy', (d) => y(d.balance))
      .attr('r', 2.2)
      .attr('fill', '#161513');

    // annotations
    const eventsByYear = new Map(events.map((e) => [e.year, e]));
    const annotated = data.filter((d) => eventsByYear.has(d.year));

    annotated.forEach((d, i) => {
      const ev = eventsByYear.get(d.year)!;
      const xx = x(d.year);
      const yy = y(d.balance);

      // Stagger label offsets
      const labelY = -10 - (i % 3) * 14;

      g.append('line')
        .attr('class', 'annotation-line')
        .attr('x1', xx)
        .attr('x2', xx)
        .attr('y1', yy)
        .attr('y2', labelY + 6);

      g.append('circle').attr('cx', xx).attr('cy', yy).attr('r', 4.2).attr('fill', '#b23c1a').attr('stroke', '#f7f5f0').attr('stroke-width', 1.4);

      const labelText = ev.label.toUpperCase();
      const textNode = g
        .append('text')
        .attr('class', 'annotation-label')
        .attr('x', xx)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .text(labelText);

      const bbox = (textNode.node() as SVGTextElement).getBBox();
      g.insert('rect', 'text.annotation-label:last-of-type')
        .attr('x', bbox.x - 4)
        .attr('y', bbox.y - 1)
        .attr('width', bbox.width + 8)
        .attr('height', bbox.height + 2)
        .attr('fill', '#f7f5f0');
      textNode.raise();
    });

    // active year highlight
    if (activeYear != null) {
      const point = data.find((d) => d.year === activeYear);
      if (point) {
        g.append('line')
          .attr('x1', x(point.year))
          .attr('x2', x(point.year))
          .attr('y1', 0)
          .attr('y2', innerH)
          .attr('stroke', '#b23c1a')
          .attr('stroke-width', 1.4)
          .attr('stroke-dasharray', '2 3');
        g.append('circle')
          .attr('cx', x(point.year))
          .attr('cy', y(point.balance))
          .attr('r', 6)
          .attr('fill', 'none')
          .attr('stroke', '#b23c1a')
          .attr('stroke-width', 1.6);
        g.append('text')
          .attr('class', 'annotation-label')
          .attr('x', x(point.year) + 8)
          .attr('y', y(point.balance) - 8)
          .attr('text-anchor', 'start')
          .attr('fill', '#b23c1a')
          .text(fmt(point.balance));
      }
    }

    // axis labels
    g.append('text')
      .attr('class', 'label')
      .attr('x', -innerH / 2)
      .attr('y', -50)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('fill', '#54514a')
      .text('Year-end balance · USD');

    // hover layer: bisect by year on mousemove, snap a guide line + dot to
    // the nearest data point, and show a tooltip with balance + obligated.
    const guide = g.append('line')
      .attr('class', 'hover-guide')
      .attr('y1', 0)
      .attr('y2', innerH)
      .attr('stroke', '#161513')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2 3')
      .attr('opacity', 0);
    const dot = g.append('circle')
      .attr('class', 'hover-dot')
      .attr('r', 4)
      .attr('fill', '#161513')
      .attr('stroke', '#f7f5f0')
      .attr('stroke-width', 1.4)
      .attr('opacity', 0);

    g.append('rect')
      .attr('class', 'hit')
      .attr('width', innerW)
      .attr('height', innerH)
      .attr('fill', 'transparent')
      .style('cursor', 'crosshair')
      .on('mousemove', (event: MouseEvent) => {
        const [mx] = d3.pointer(event, svgEl);
        const yr = x.invert(mx - margin.left);
        const point = data.reduce((best, p) =>
          Math.abs(p.year - yr) < Math.abs(best.year - yr) ? p : best, data[0]);
        if (!point) return;
        guide.attr('x1', x(point.year)).attr('x2', x(point.year)).attr('opacity', 1);
        dot.attr('cx', x(point.year)).attr('cy', y(point.balance)).attr('opacity', 1);
        const ev = eventsByYear.get(point.year);
        const evLine = ev ? `<span class="sub">${ev.label}</span>` : '';
        showTip(event, `<strong>${point.year}</strong> · ${fmt(point.balance)} balance<span class="sub">${fmt(point.obligated)} obligated</span>${evLine}`);
      })
      .on('mouseleave', () => {
        guide.attr('opacity', 0);
        dot.attr('opacity', 0);
        hideTip();
      });
  }

  $effect(() => {
    // re-run on changes
    void data;
    void events;
    void activeYear;
    void renderedW;
    draw();
  });

  onMount(() => {
    if (svgEl && register) register(svgEl);
    if (!containerEl) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? width;
      renderedW = Math.max(360, Math.floor(w));
    });
    ro.observe(containerEl);
    return () => ro.disconnect();
  });
</script>

<div bind:this={containerEl} style="width:100%; position:relative;">
  <svg bind:this={svgEl} role="img" aria-label="Annotated cash position over time"></svg>
  <div
    class="chart-tip"
    class:visible={tip.vis}
    style="left:{tip.x}px; top:{tip.y}px"
  >{@html tip.html}</div>
</div>
