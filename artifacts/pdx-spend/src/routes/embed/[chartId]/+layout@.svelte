<script lang="ts">
  import '../../../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

{@render children()}

<style>
  :global(body) {
    background: var(--paper, #fbf8f1);
    margin: 0;
    padding: 0;
  }
</style>
