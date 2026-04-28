<script lang="ts">
  import '../app.css';
  import Masthead from '$lib/components/Masthead.svelte';
  import Colophon from '$lib/components/Colophon.svelte';
  let { children } = $props();
</script>

<Masthead />
<main>{@render children()}</main>
<Colophon />
