<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    children: import('svelte').Snippet;
    onstep?: (i: number) => void;
    /**
     * Activation threshold expressed as a fraction of the viewport height.
     * 0.5 means a step is considered active when its top crosses 50% from
     * the top of the viewport. Larger numbers shift the trigger down.
     */
    offset?: number;
  }

  let { children, onstep, offset = 0.5 }: Props = $props();

  let container: HTMLDivElement | undefined = $state();

  onMount(() => {
    if (!container) return;

    let activeIdx = -1;

    function notify(idx: number) {
      if (idx === activeIdx) return;
      activeIdx = idx;
      onstep?.(idx);
    }

    // The activation rule: pick the step whose top is closest to (but at or
    // above) the offset line. This handles every direction reliably, fires
    // on first paint, and doesn't depend on the user crossing a threshold
    // from a particular direction.
    function recompute() {
      if (!container) return;
      const steps = container.querySelectorAll<HTMLElement>('.step');
      if (steps.length === 0) return;
      const triggerY = window.innerHeight * offset;

      let best = 0;
      let bestDelta = -Infinity;
      for (let i = 0; i < steps.length; i++) {
        const top = steps[i].getBoundingClientRect().top;
        const delta = triggerY - top;
        // Pick the largest non-negative delta — the deepest step whose top
        // has already crossed the trigger line. If no step has crossed yet
        // (we're above all of them), fall back to step 0.
        if (delta >= 0 && delta > bestDelta) {
          bestDelta = delta;
          best = i;
        }
      }
      notify(best);
    }

    let raf = 0;
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        recompute();
      });
    }

    // Run once after layout settles so the first paint has the correct
    // active step regardless of initial scroll position.
    requestAnimationFrame(recompute);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  });
</script>

<div bind:this={container} class="scrolly">
  {@render children()}
</div>
