<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    children: import('svelte').Snippet;
    onstep?: (i: number) => void;
    /** Retained for API compatibility; ignored. */
    offset?: number;
  }

  let { children, onstep }: Props = $props();

  let container: HTMLDivElement | undefined = $state();

  onMount(() => {
    if (!container) return;
    const steps = Array.from(container.querySelectorAll<HTMLElement>('.step'));
    if (steps.length === 0) return;

    let current = -1;
    let frame = 0;
    let visible = new Set<HTMLElement>();

    const computeActive = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let bestIdx = current >= 0 ? current : 0;
      let bestDist = Infinity;
      const pool = visible.size > 0 ? steps.filter((s) => visible.has(s)) : steps;
      for (const el of pool) {
        const i = steps.indexOf(el);
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - mid);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      if (bestIdx !== current) {
        current = bestIdx;
        onstep?.(bestIdx);
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(computeActive);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target as HTMLElement);
          else visible.delete(e.target as HTMLElement);
        }
        schedule();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    for (const s of steps) io.observe(s);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  });
</script>

<div bind:this={container} class="scrolly">
  {@render children()}
</div>
