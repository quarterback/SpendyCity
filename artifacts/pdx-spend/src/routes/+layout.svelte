<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import Masthead from '$lib/components/Masthead.svelte';
  import Colophon from '$lib/components/Colophon.svelte';
  let { children } = $props();

  const isEmbedChart = $derived(
    page.route.id?.startsWith('/embed/[') === true
  );
</script>

<svelte:head>
  <meta name="theme-color" content="#f4efe6" />
  <meta name="author" content="Ron Bronson — Public Capacity Lab / State Capacity AI" />
</svelte:head>

{#if isEmbedChart}
  {@render children()}
{:else}
  <Masthead />
  <main>{@render children()}</main>
  <Colophon />
{/if}
