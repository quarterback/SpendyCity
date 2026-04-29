<script lang="ts">
  import type { CouldFundItem } from '$lib/data/types';
  import { formatUSD, formatNumber } from '$lib/utils/format';

  interface Props {
    items: CouldFundItem[];
    balance: number;
  }
  let { items, balance }: Props = $props();

  const max = $derived(items.reduce((m, i) => Math.max(m, i.total), 0) || 1);
</script>

<section class="could-fund">
  <p class="hed-num">
    <span class="usd">{formatUSD(balance)}</span>
    <span class="lede">sitting today. At today's published unit costs, that is the same dollar amount as any one of these.</span>
  </p>
  <ul>
    {#each items as item}
      <li class="row">
        <div class="row-text">
          <p class="item">
            <span class="units">{formatNumber(item.units)}</span>
            <span class="x">×</span>
            <span class="thing">{item.item}</span>
          </p>
          <p class="basis">
            {formatUSD(item.unitCost)} per unit · {item.basis}
          </p>
        </div>
        <div class="row-bar" aria-hidden="true">
          <div class="bar" style="width: {(item.total / max) * 100}%"></div>
          <p class="total">{formatUSD(item.total)}</p>
        </div>
      </li>
    {/each}
  </ul>
  <p class="footnote">
    Unit counts are rounded against published references. Real procurement and ramp time would shape the exact numbers. The point is the order of magnitude.
  </p>
</section>

<style>
  .could-fund {
    border-top: 2px solid var(--ink);
    padding: 1.4rem 0 1.2rem;
    margin: 0 0 1.5rem;
  }
  .hed-num {
    font-family: var(--serif);
    font-size: clamp(1.05rem, 2vw, 1.35rem);
    line-height: 1.35;
    color: var(--ink);
    margin: 0 0 1.2rem;
    max-width: none;
  }
  .hed-num .usd {
    font-weight: 600;
    color: var(--ink);
  }
  .hed-num .lede {
    color: var(--ink-2);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.6fr);
    gap: 1.4rem;
    align-items: center;
    border-top: 1px solid var(--rule);
    padding: 0.95rem 0 0.85rem;
  }
  .row:first-child { border-top: 0; }
  .row-text { min-width: 0; }
  .item {
    font-family: var(--serif);
    font-size: 1.02rem;
    line-height: 1.35;
    color: var(--ink);
    margin: 0 0 0.25rem;
    max-width: none;
  }
  .item .units {
    font-family: var(--mono);
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--accent);
    margin-right: 0.05em;
  }
  .item .x {
    color: var(--ink-4);
    font-family: var(--mono);
    margin: 0 0.2em 0 0.05em;
  }
  .item .thing {
    color: var(--ink);
  }
  .basis {
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-4);
    margin: 0;
    max-width: none;
  }
  .row-bar {
    position: relative;
    min-width: 0;
  }
  .bar {
    height: 14px;
    background: var(--accent);
    opacity: 0.85;
    border-radius: 1px;
    transition: width 0.3s ease;
  }
  .total {
    margin: 0.35rem 0 0;
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--ink-3);
    font-variant-numeric: tabular-nums;
  }
  .footnote {
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ink-4);
    margin: 1rem 0 0;
    max-width: none;
  }
  @media (max-width: 639px) {
    .row { grid-template-columns: 1fr; gap: 0.4rem; }
  }
</style>
