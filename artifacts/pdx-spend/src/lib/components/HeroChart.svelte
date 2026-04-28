<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

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

  const margin = { top: 30, right: 30, bottom: 60, left: 30 };

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

    const x = d3.scaleBand().domain(rows.map((r) => r.shortName)).range([0, innerW]).padding(0.18);
    const yMax = d3.max(rows, (r) => r.balance) ?? 0;
    const y = d3.scaleLinear().domain([0, yMax * 1.12]).range([innerH, 0]);

    // baseline rule
    g.append('line').attr('x1', 0).attr('x2', innerW).attr('y1', innerH).attr('y2', innerH).attr('stroke', '#161513').attr('stroke-width', 1);

    rows.forEach((r) => {
      const rx = x(r.shortName) ?? 0;
      const bw = x.bandwidth();
      const restrictedH = innerH - y(r.restricted);
      const movableH = innerH - y(r.movable);

      // restricted base block
      g.append('rect')
        .attr('x', rx)
        .attr('y', innerH - restrictedH)
        .attr('width', bw)
        .attr('height', restrictedH)
        .attr('fill', '#161513');

      // movable on top, in accent
      g.append('rect')
        .attr('x', rx)
        .attr('y', innerH - restrictedH - movableH)
        .attr('width', bw)
        .attr('height', movableH)
        .attr('fill', '#b23c1a');

      // total label above bar
      g.append('text')
        .attr('class', 'annotation-label')
        .attr('x', rx + bw / 2)
        .attr('y', y(r.balance) - 8)
        .attr('text-anchor', 'middle')
        .attr('fill', '#161513')
        .attr('font-size', 11)
        .text(fmt(r.balance));

      // fund label below
      g.append('text')
        .attr('x', rx + bw / 2)
        .attr('y', innerH + 16)
        .attr('text-anchor', 'middle')
        .attr('fill', '#54514a')
        .attr('font-family', 'JetBrains Mono, monospace')
        .attr('font-size', 9.5)
        .attr('letter-spacing', '0.06em')
        .text(r.shortName.toUpperCase());
    });

    // top callout
    const total = rows.reduce((s, r) => s + r.balance, 0);
    const movableTotal = rows.reduce((s, r) => s + r.movable, 0);

    svg
      .append('text')
      .attr('x', w - margin.right)
      .attr('y', 18)
      .attr('text-anchor', 'end')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', 10.5)
      .attr('letter-spacing', '0.07em')
      .attr('fill', '#54514a')
      .text(`ALL SEVEN FUNDS · ${fmt(total)} TODAY · ${Math.round((movableTotal / total) * 100)}% RE-AIMED`);
  }

  $effect(() => {
    void rows;
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

<div bind:this={containerEl} style="width:100%">
  <svg bind:this={svgEl} role="img" aria-label="Money sitting in each of the seven funds today"></svg>
</div>
