<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { PromiseVsHappened } from '$lib/data/types';

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
  let tip = $state({ vis: false, x: 0, y: 0, html: '' });

  const margin = { top: 28, right: 90, bottom: 36, left: 92 };

  function showTip(event: MouseEvent, html: string) {
    if (!containerEl) return;
    const r = containerEl.getBoundingClientRect();
    tip = { vis: true, x: event.clientX - r.left, y: event.clientY - r.top, html };
  }
  function hideTip() { tip = { ...tip, vis: false }; }

  function fmt(n: number) {
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
    if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
    return `$${n}`;
  }

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

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.cycle))
      .range([0, innerH])
      .padding(0.32);

    const maxVal = d3.max(data, (d) => Math.max(d.promised, d.delivered)) ?? 0;
    const x = d3.scaleLinear().domain([0, maxVal * 1.1]).range([0, innerW]);

    // grid
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisBottom(x).ticks(4).tickSize(innerH).tickFormat(() => '') as never
      )
      .attr('transform', `translate(0,0)`);

    // axes
    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(4).tickFormat((d) => fmt(+d)) as never);

    g.append('g').attr('class', 'axis').call(d3.axisLeft(y) as never);

    const barH = y.bandwidth() / 2 - 1;

    const tipFor = (d: PromiseVsHappened) =>
      `<strong>${d.cycle}</strong> · ${fmt(d.delivered)} delivered<span class="sub">of ${fmt(d.promised)} promised · gap ${fmt(d.promised - d.delivered)}</span>`;

    // promised bar (lighter)
    g.selectAll('rect.promised')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'promised')
      .attr('x', 0)
      .attr('y', (d) => (y(d.cycle) ?? 0) + 0)
      .attr('width', (d) => x(d.promised))
      .attr('height', barH)
      .attr('fill', '#c5bfae')
      .style('cursor', 'pointer')
      .on('mouseenter mousemove', (event: MouseEvent, d) => showTip(event, tipFor(d)))
      .on('mouseleave', hideTip);

    g.selectAll('rect.delivered')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'delivered')
      .attr('x', 0)
      .attr('y', (d) => (y(d.cycle) ?? 0) + barH + 2)
      .attr('width', (d) => x(d.delivered))
      .attr('height', barH)
      .attr('fill', '#161513')
      .style('cursor', 'pointer')
      .on('mouseenter mousemove', (event: MouseEvent, d) => showTip(event, tipFor(d)))
      .on('mouseleave', hideTip);

    // transparent hit row covering the full row height for easier hover
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
      .style('cursor', 'pointer')
      .on('mouseenter mousemove', (event: MouseEvent, d) => showTip(event, tipFor(d)))
      .on('mouseleave', hideTip);

    // gap labels
    g.selectAll('text.gap')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'annotation-label')
      .attr('x', (d) => x(d.promised) + 6)
      .attr('y', (d) => (y(d.cycle) ?? 0) + barH / 2)
      .attr('dy', '0.32em')
      .attr('fill', '#b23c1a')
      .text((d) => `gap ${fmt(d.promised - d.delivered)}`);

    // bar value labels at end of delivered bar
    g.selectAll('text.deliv-val')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'annotation-label')
      .attr('x', (d) => x(d.delivered) + 6)
      .attr('y', (d) => (y(d.cycle) ?? 0) + barH + 2 + barH / 2)
      .attr('dy', '0.32em')
      .attr('fill', '#161513')
      .text((d) => fmt(d.delivered));

    // legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - 10})`);
    legend.append('rect').attr('x', 0).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', '#c5bfae');
    legend
      .append('text')
      .attr('class', 'label')
      .attr('x', 16)
      .attr('y', -3)
      .attr('fill', '#54514a')
      .text('Promised');
    legend.append('rect').attr('x', 96).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', '#161513');
    legend
      .append('text')
      .attr('class', 'label')
      .attr('x', 112)
      .attr('y', -3)
      .attr('fill', '#54514a')
      .text('Delivered');
  }

  $effect(() => {
    void data;
    void renderedW;
    draw();
  });

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
  <svg bind:this={svgEl} role="img" aria-label="Promised vs delivered, by fiscal cycle"></svg>
  <div
    class="chart-tip"
    class:visible={tip.vis}
    style="left:{tip.x}px; top:{tip.y}px"
  >{@html tip.html}</div>
</div>
