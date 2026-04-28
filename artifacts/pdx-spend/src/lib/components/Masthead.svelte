<script lang="ts">
  import { base } from '$app/paths';

  let menuOpen = $state(false);
  function toggle() { menuOpen = !menuOpen; }
  function close() { menuOpen = false; }
</script>

<header class="masthead">
  <div class="container masthead-inner">
    <a class="brand" href="{base}/" onclick={close}>
      PDX&thinsp;<span class="dot">·</span>&thinsp;Spend
    </a>

    <button
      class="menu-btn"
      type="button"
      aria-expanded={menuOpen}
      aria-controls="primary-nav"
      aria-label="Toggle menu"
      onclick={toggle}
    >
      {menuOpen ? 'Close' : 'Menu'}
    </button>

    <nav id="primary-nav" class="nav" class:open={menuOpen} aria-label="Primary">
      <a href="{base}/dashboard/" onclick={close}>Dashboard</a>
      <a href="{base}/agent/" onclick={close}>Agent</a>
      <a href="{base}/methodology/" onclick={close}>Methodology</a>
      <a href="{base}/implications/" onclick={close}>Levers</a>
      <a href="{base}/about/" onclick={close}>About</a>
    </nav>
  </div>
</header>

<style>
  .menu-btn {
    display: none;
    font-family: var(--mono);
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: transparent;
    color: var(--ink);
    border: 1px solid var(--ink);
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    border-radius: 2px;
    min-height: 44px;
    min-width: 64px;
  }
  .menu-btn:hover { background: var(--ink); color: var(--paper); }

  @media (max-width: 1023px) {
    .menu-btn { display: inline-flex; align-items: center; justify-content: center; }
    :global(.masthead-inner) {
      flex-wrap: wrap;
      gap: 1rem;
    }
    :global(.masthead .nav) {
      display: none;
      flex-basis: 100%;
      flex-direction: column;
      gap: 0;
      border-top: 1px solid var(--rule);
      padding-top: 0.5rem;
    }
    :global(.masthead .nav.open) {
      display: flex;
    }
    :global(.masthead .nav.open a) {
      padding: 0.85rem 0;
      border-bottom: 1px solid var(--rule);
      min-height: 44px;
      display: flex;
      align-items: center;
    }
  }
</style>
