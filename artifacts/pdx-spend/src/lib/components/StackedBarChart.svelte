<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

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

  const margin = { top: 28, right: 60, bottom: 36, left: 168 };

  function fmt(n: number) {
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
    return `$${n}`;
  }

  function draw() {
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const w = renderedW;
    const innerW = w - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${w} ${height}`).attr('width', w).attr('height', height);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const sorted = [...rows].sort((a, b) => b.balance - a.balance);
    const y = d3.scaleBand().domain(sorted.map((r) => r.shortName)).range([0, innerH]).padding(0.22);

    if (mode === 'dollars') {
      const xMax = d3.max(sorted, (r) => r.balance) ?? 0;
      const x = d3.scaleLinear().domain([0, xMax * 1.06]).range([0, innerW]);

      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisBottom(x).ticks(4).tickSize(innerH).tickFormat(() => '') as never);

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(4).tickFormat((d) => fmt(+d)) as never);

      g.append('g').attr('class', 'axis').call(d3.axisLeft(y) as never);

      // restricted
      g.selectAll('rect.r')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'r')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', 0)
        .attr('width', (d) => x(d.restricted))
        .attr('height', y.bandwidth())
        .attr('fill', '#161513');

      // movable
      g.selectAll('rect.m')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'm')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', (d) => x(d.restricted))
        .attr('width', (d) => x(d.movable))
        .attr('height', y.bandwidth())
        .attr('fill', '#b23c1a');

      // total label
      g.selectAll('text.t')
        .data(sorted)
        .enter()
        .append('text')
        .attr('class', 'annotation-label')
        .attr('x', (d) => x(d.balance) + 6)
        .attr('y', (d) => (y(d.shortName) ?? 0) + y.bandwidth() / 2)
        .attr('dy', '0.32em')
        .attr('fill', '#161513')
        .text((d) => fmt(d.balance));
    } else if (mode === 'percent') {
      const x = d3.scaleLinear().domain([0, 1]).range([0, innerW]);

      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisBottom(x).ticks(5).tickSize(innerH).tickFormat(() => '') as never);

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format('.0%')) as never);

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
        .attr('fill', '#161513');

      g.selectAll('rect.m')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'm')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', (d) => x(d.restricted / d.balance))
        .attr('width', (d) => x(d.movable / d.balance))
        .attr('height', y.bandwidth())
        .attr('fill', '#b23c1a');

      g.selectAll('text.t')
        .data(sorted)
        .enter()
        .append('text')
        .attr('class', 'annotation-label')
        .attr('x', innerW + 6)
        .attr('y', (d) => (y(d.shortName) ?? 0) + y.bandwidth() / 2)
        .attr('dy', '0.32em')
        .attr('fill', '#b23c1a')
        .text((d) => `${Math.round((d.movable / d.balance) * 100)}% movable`);
    } else {
      // trajectory: drift % vs years since enactment
      const x = d3.scaleLinear().domain([0, 100]).range([0, innerW]);

      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisBottom(x).ticks(4).tickSize(innerH).tickFormat(() => '') as never);

      g.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(4).tickFormat((d) => `${d}%`) as never);

      g.append('g').attr('class', 'axis').call(d3.axisLeft(y) as never);

      // intent reference
      g.append('line')
        .attr('x1', x(100))
        .attr('x2', x(100))
        .attr('y1', 0)
        .attr('y2', innerH)
        .attr('stroke', '#54514a')
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
        .attr('fill', '#2c4a52');

      g.selectAll('rect.gap')
        .data(sorted)
        .enter()
        .append('rect')
        .attr('class', 'gap')
        .attr('y', (d) => y(d.shortName) ?? 0)
        .attr('x', (d) => x(d.drift))
        .attr('width', (d) => x(100 - d.drift))
        .attr('height', y.bandwidth())
        .attr('fill', '#b23c1a')
        .attr('opacity', 0.18);

      g.selectAll('text.t')
        .data(sorted)
        .enter()
        .append('text')
        .attr('class', 'annotation-label')
        .attr('x', innerW + 6)
        .attr('y', (d) => (y(d.shortName) ?? 0) + y.bandwidth() / 2)
        .attr('dy', '0.32em')
        .attr('fill', '#b23c1a')
        .text((d) => `${100 - Math.round(d.drift)}% drift`);
    }

    // legend
    const legend = svg.append('g').attr('transform', `translate(${margin.left}, ${height - 12})`);
    if (mode === 'trajectory') {
      legend.append('rect').attr('width', 12).attr('height', 8).attr('y', -10).attr('fill', '#2c4a52');
      legend.append('text').attr('class', 'label').attr('x', 16).attr('y', -3).text('On voter intent');
      legend.append('rect').attr('x', 130).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', '#b23c1a').attr('opacity', 0.18);
      legend.append('text').attr('class', 'label').attr('x', 146).attr('y', -3).text('Drift from voter intent');
    } else {
      legend.append('rect').attr('width', 12).attr('height', 8).attr('y', -10).attr('fill', '#161513');
      legend.append('text').attr('class', 'label').attr('x', 16).attr('y', -3).text('Restricted to voter intent');
      legend.append('rect').attr('x', 200).attr('y', -10).attr('width', 12).attr('height', 8).attr('fill', '#b23c1a');
      legend.append('text').attr('class', 'label').attr('x', 216).attr('y', -3).text('Movable / reclassified');
    }
  }

  $effect(() => {
    void rows;
    void mode;
    void renderedW;
    draw();
  });

  onMount(() => {
    if (svgEl && register) register(svgEl);
    if (!containerEl) return;
    const ro = new ResizeObserver((e) => {
      const w = e[0]?.contentRect.width ?? width;
      renderedW = Math.max(420, Math.floor(w));
    });
    ro.observe(containerEl);
    return () => ro.disconnect();
  });
</script>

<div bind:this={containerEl} style="width:100%">
  <svg bind:this={svgEl} role="img" aria-label="Cross-fund stacked bar chart"></svg>
</div>
