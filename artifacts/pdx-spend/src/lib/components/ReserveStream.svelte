<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

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

  const margin = { top: 18, right: 24, bottom: 28, left: 56 };

  function fmt(n: number) {
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
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

    const x = d3
      .scaleLinear()
      .domain(d3.extent(series, (d) => d.year) as [number, number])
      .range([0, innerW]);

    const yMax = d3.max(series, (d) => d.reserve) ?? 0;
    const y = d3.scaleLinear().domain([0, yMax * 1.1]).range([innerH, 0]);

    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y).ticks(3).tickSize(-innerW).tickFormat(() => '') as never);

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(Math.min(series.length, 8)).tickFormat(d3.format('d')) as never);

    g.append('g').attr('class', 'axis').call(d3.axisLeft(y).ticks(3).tickFormat((d) => fmt(+d)) as never);

    const area = d3
      .area<{ year: number; reserve: number }>()
      .x((d) => x(d.year))
      .y0(innerH)
      .y1((d) => y(d.reserve))
      .curve(d3.curveMonotoneX);

    g.append('path').datum(series).attr('fill', '#2c4a52').attr('opacity', 0.85).attr('d', area as never);

    // last value label
    const lastPoint = series[series.length - 1];
    if (lastPoint) {
      g.append('text')
        .attr('class', 'annotation-label')
        .attr('x', x(lastPoint.year))
        .attr('y', y(lastPoint.reserve) - 6)
        .attr('text-anchor', 'end')
        .attr('fill', '#2c4a52')
        .text(fmt(lastPoint.reserve));
    }
  }

  $effect(() => {
    void series;
    void renderedW;
    draw();
  });

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

<div bind:this={containerEl} style="width:100%">
  <svg bind:this={svgEl} role="img" aria-label="Money sitting unspent in this fund by year"></svg>
</div>
