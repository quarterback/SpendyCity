<script lang="ts">
  import { onMount } from 'svelte';
  import type { ScrollamaInstance, DecimalType } from 'scrollama';

  interface Props {
    children: import('svelte').Snippet;
    onstep?: (i: number) => void;
    offset?: DecimalType;
  }

  let { children, onstep, offset = 0.6 }: Props = $props();

  let container: HTMLDivElement | undefined = $state();

  onMount(() => {
    if (!container) return;

    let scroller: ScrollamaInstance | null = null;
    let cancelled = false;

    const onResize = () => scroller?.resize();

    void import('scrollama').then(({ default: scrollama }) => {
      if (cancelled || !container) return;
      scroller = scrollama();
      scroller
        .setup({
          step: container.querySelectorAll('.step'),
          offset,
          progress: false
        })
        .onStepEnter(({ index }) => onstep?.(index));
      window.addEventListener('resize', onResize);
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      scroller?.destroy();
    };
  });
</script>

<div bind:this={container} class="scrolly">
  {@render children()}
</div>
