<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    children: import('svelte').Snippet;
    onstep?: (i: number) => void;
    offset?: number;
  }

  let { children, onstep, offset = 0.6 }: Props = $props();

  let container: HTMLDivElement | undefined = $state();

  onMount(async () => {
    if (!container) return;
    const scrollama = (await import('scrollama')).default;
    const scroller = scrollama();
    scroller
      .setup({ step: container.querySelectorAll('.step'), offset, progress: false })
      .onStepEnter(({ index }) => onstep?.(index));
    const onResize = () => scroller.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      scroller.destroy();
    };
  });
</script>

<div bind:this={container} class="scrolly">
  {@render children()}
</div>
