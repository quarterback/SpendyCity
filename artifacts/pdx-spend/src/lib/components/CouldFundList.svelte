<script lang="ts">
  import type { CouldFundItem } from '$lib/data/types';
  import { formatUSD, formatNumber } from '$lib/utils/format';

  interface Props {
    items: CouldFundItem[];
    balance: number;
  }
  let { items, balance }: Props = $props();
</script>

<section class="could-fund">
  <p class="hed-num">{formatUSD(balance)} could pay for any one of these:</p>
  <ul>
    {#each items as item}
      <li class="row">
        <div class="row-main">
          <p class="item">{item.item}</p>
          <p class="basis">Unit cost: {formatUSD(item.unitCost)} · Basis: {item.basis}</p>
        </div>
        <div class="row-right">
          <p class="units">{formatNumber(item.units)}<span class="x">×</span></p>
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
    border-bottom: 1px solid var(--rule);
    padding: 1.4rem 0 1.2rem;
    margin: 0 0 1.5rem;
  }
  .hed-num {
    font-family: var(--serif);
    font-weight: 460;
    font-size: clamp(1.15rem, 2.2vw, 1.5rem);
    line-height: 1.25;
    color: var(--ink);
    margin: 0 0 1rem;
    max-width: none;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.8rem 1.2rem;
    align-items: baseline;
    border-top: 1px solid var(--rule);
    padding: 0.7rem 0 0.6rem;
  }
  .row:first-child { border-top: 0; padding-top: 0.2rem; }
  .row-main { min-width: 0; }
  .item {
    font-family: var(--serif);
    font-size: 1.02rem;
    line-height: 1.35;
    color: var(--ink);
    margin: 0 0 0.2rem;
    max-width: none;
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
  .row-right {
    text-align: right;
    white-space: nowrap;
  }
  .units {
    font-family: var(--mono);
    font-size: 1rem;
    color: var(--ink);
    margin: 0;
  }
  .units .x {
    color: var(--ink-4);
    margin-left: 0.15em;
  }
  .total {
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--accent);
    margin: 0.1rem 0 0;
  }
  .footnote {
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ink-4);
    margin: 0.9rem 0 0;
    max-width: none;
  }
  @media (max-width: 480px) {
    .row { grid-template-columns: 1fr; gap: 0.3rem; }
    .row-right { text-align: left; }
  }
</style>
