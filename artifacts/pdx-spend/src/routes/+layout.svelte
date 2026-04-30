<script lang="ts">
  import '../app.css';
  import Masthead from '$lib/components/Masthead.svelte';
  import Colophon from '$lib/components/Colophon.svelte';
  let { children } = $props();
</script>

<svelte:head>
  <meta name="theme-color" content="#f4efe6" />
  <meta name="author" content="Ron Bronson — Public Capacity Lab / State Capacity AI" />
</svelte:head>

<Masthead />
<main>{@render children()}</main>
<Colophon />
