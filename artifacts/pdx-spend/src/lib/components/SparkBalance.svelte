<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { CashPoint } from '$lib/data/types';
  import { chartColors } from '$lib/charts/colors';
  import { formatChartUSD } from '$lib/charts/format';

  interface Props {
    data: CashPoint[];
    width?: number;
    height?: number;
  }

  let { data, width = 220, height = 56 }: Props = $props();

  let svgEl: SVGSVGElement | undefined = $state();

  const a11yLabel = $derived.by(() => {
    if (!data.length) return 'Balance trend sparkline';
    const first = data[0];
    const last = data[data.length - 1];
    return `Balance trend ${first.year}–${last.year}: ${formatChartUSD(first.balance, 'compact')} to ${formatChartUSD(last.balance, 'compact')}.`;
  });

  function draw() {
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();
    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'none')
      .attr('width', '100%')
      .attr('height', height)
      .attr('role', 'img')
      .attr('aria-label', a11yLabel);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year) as [number, number])
      .range([2, width - 2]);
    const yMax = d3.max(data, (d) => d.balance) ?? 0;
    const y = d3.scaleLinear().domain([0, yMax * 1.1]).range([height - 2, 4]);

    const area = d3
      .area<CashPoint>()
      .x((d) => x(d.year))
      .y0(height - 2)
      .y1((d) => y(d.balance))
      .curve(d3.curveMonotoneX);

    const line = d3
      .line<CashPoint>()
      .x((d) => x(d.year))
      .y((d) => y(d.balance))
      .curve(d3.curveMonotoneX);

    svg.append('path').datum(data).attr('fill', chartColors.obligated).attr('opacity', 0.55).attr('d', area as never);
    svg.append('path').datum(data).attr('fill', 'none').attr('stroke', chartColors.balance).attr('stroke-width', 1.2).attr('d', line as never);

    const last = data[data.length - 1];
    if (last) {
      svg.append('circle').attr('cx', x(last.year)).attr('cy', y(last.balance)).attr('r', 2.4).attr('fill', chartColors.audit);
    }
  }

  $effect(() => { void data; draw(); });
  onMount(() => draw());
</script>

<svg bind:this={svgEl}></svg>
