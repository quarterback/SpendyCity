<script lang="ts">
  import { Chart, Svg, Area, Spline } from 'layerchart';
  import { curveMonotoneX } from 'd3';
  import type { CashPoint } from '$lib/data/types';
  import { chartColors } from '$lib/charts/colors';
  import { formatChartUSD } from '$lib/charts/format';

  interface Props {
    data: CashPoint[];
    width?: number;
    height?: number;
  }

  let { data, height = 56 }: Props = $props();

  const a11yLabel = $derived.by(() => {
    if (!data.length) return 'Balance trend sparkline';
    const first = data[0];
    const last = data[data.length - 1];
    return `Balance trend ${first.year}–${last.year}: ${formatChartUSD(first.balance, 'compact')} to ${formatChartUSD(last.balance, 'compact')}.`;
  });

  const last = $derived(data[data.length - 1]);
</script>

<div class="spark" style:height="{height}px" role="img" aria-label={a11yLabel}>
  {#if data.length > 0}
    <Chart
      {data}
      x="year"
      y="balance"
      yDomain={[0, null]}
      yNice
      padding={{ top: 4, bottom: 2, left: 2, right: 2 }}
    >
      {#snippet children({ xScale, yScale }: { xScale: (v: number) => number; yScale: (v: number) => number })}
        <Svg>
          <Area
            curve={curveMonotoneX}
            fill={chartColors.obligated}
            fillOpacity={0.55}
          />
          <Spline
            curve={curveMonotoneX}
            stroke={chartColors.balance}
            strokeWidth={1.2}
          />
          {#if last}
            <circle
              cx={xScale(last.year)}
              cy={yScale(last.balance)}
              r="2.4"
              fill={chartColors.audit}
            />
          {/if}
        </Svg>
      {/snippet}
    </Chart>
  {/if}
</div>

<style>
  .spark {
    width: 100%;
    display: block;
  }
</style>
