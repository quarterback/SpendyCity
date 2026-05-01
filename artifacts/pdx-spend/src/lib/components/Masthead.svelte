<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  let disclosure: HTMLDetailsElement | undefined = $state();

  // Close the menu after any client-side navigation so a tap on a nav link
  // doesn't leave the panel open over the next page.
  afterNavigate(() => {
    if (disclosure) disclosure.open = false;
  });

  onMount(() => {
    function onDocClick(e: MouseEvent) {
      if (!disclosure?.open) return;
      if (disclosure.contains(e.target as Node)) return;
      disclosure.open = false;
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  });
</script>

<header class="masthead">
  <div class="container masthead-inner">
    <a class="brand" href="{base}/">
      PDX&thinsp;<span class="dot">·</span>&thinsp;Spend
    </a>

    <details class="nav-disclosure" bind:this={disclosure}>
      <summary class="menu-btn" aria-label="Toggle menu">
        <span class="label-closed">Menu</span>
        <span class="label-open">Close</span>
      </summary>

      <nav class="nav" aria-label="Primary">
        <a href="{base}/dashboard/">Dashboard</a>
        <a href="{base}/investigations/">Investigations</a>
        <a href="{base}/methodology/">Methodology</a>
        <a href="{base}/implications/">Levers</a>
        <a href="{base}/about/">About</a>
      </nav>
    </details>
  </div>
</header>

<style>
  .nav-disclosure {
    /* Reset default disclosure styling so we can lay it out ourselves. */
    display: contents;
  }

  /* Kill the default triangle marker on every engine. */
  .menu-btn::-webkit-details-marker { display: none; }
  .menu-btn { list-style: none; }

  .menu-btn {
    display: none;
    font-family: var(--mono);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: transparent;
    color: var(--ink);
    border: 1px solid var(--ink);
    padding: 0.5rem 0.9rem;
    cursor: pointer;
    border-radius: 2px;
    min-height: 44px;
    min-width: 64px;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .label-open { display: none; }
  .nav-disclosure[open] .label-closed { display: none; }
  .nav-disclosure[open] .label-open { display: inline; }

  /* Only apply hover styling on devices that actually support hover, so
     iOS Safari doesn't leave the dark hover state painted after a tap. */
  @media (hover: hover) {
    .menu-btn:hover { background: var(--ink); color: var(--paper); }
  }

  /* Phone: disclosure menu */
  @media (max-width: 639px) {
    .menu-btn { display: inline-flex; }
    :global(.masthead-inner) {
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    }
    :global(.masthead .nav) {
      display: none !important;
      flex-basis: 100%;
      flex-direction: column;
      gap: 0;
      border-top: 1px solid var(--rule);
      padding-top: 0.5rem;
    }
    :global(.nav-disclosure[open] .nav) {
      display: flex !important;
    }
    :global(.nav-disclosure[open] .nav a) {
      padding: 0.85rem 0;
      border-bottom: 1px solid var(--rule);
      min-height: 44px;
      display: flex;
      align-items: center;
    }
  }

  /* Tablet: keep horizontal but allow wrap if needed */
  @media (min-width: 640px) and (max-width: 1023px) {
    :global(.masthead .nav) {
      display: flex;
      flex-wrap: wrap;
      gap: 1.1rem;
    }
  }
</style>
