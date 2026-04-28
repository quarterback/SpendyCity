<script lang="ts">
  interface Output {
    modelVersion: string;
    promptVersion: string;
    publishedAt: Date | null;
    createdAt: Date;
    attemptCount: number;
  }
  interface Props {
    kicker: string;
    title: string;
    deck?: string;
    html: string;
    output: Output | null;
  }
  let { kicker, title, deck, html, output }: Props = $props();

  const dt = $derived(output?.publishedAt ?? output?.createdAt ?? null);
  const dateLabel = $derived(
    dt
      ? new Date(dt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : null
  );
</script>

<section class="container memo-block">
  <p class="kicker">{kicker}</p>
  <h2 class="section-title">{title}</h2>
  {#if deck}<p class="section-deck">{deck}</p>{/if}

  <div class="memo-meta">
    <p class="byline">
      Ron Bronson · Public Capacity Lab · State Capacity AI
    </p>
    {#if output}
      <p class="run-meta">
        {#if dateLabel}<span>{dateLabel}</span> · {/if}
        <span>model {output.modelVersion}</span> ·
        <span>prompt {output.promptVersion}</span>
        {#if output.attemptCount > 1} · <span>{output.attemptCount} attempts</span>{/if}
      </p>
    {/if}
  </div>

  <div class="memo-prose">
    {@html html}
  </div>
</section>

<style>
  .memo-block {
    border-top: 1px solid var(--rule, #d4cfc4);
    padding-top: 32px;
    margin-top: 48px;
  }
  .memo-meta {
    margin: 8px 0 24px;
    font-size: 13px;
    color: var(--ink-muted, #6b6357);
  }
  .byline {
    font-weight: 600;
    color: var(--ink, #1a1714);
    margin: 0;
    letter-spacing: 0.01em;
  }
  .run-meta {
    margin: 4px 0 0;
    font-variant-numeric: tabular-nums;
  }
  .memo-prose :global(h2) {
    font-family: var(--font-serif, Georgia, serif);
    font-size: 22px;
    margin: 28px 0 10px;
  }
  .memo-prose :global(h3) {
    font-size: 17px;
    margin: 22px 0 8px;
  }
  .memo-prose :global(p) {
    margin: 0 0 14px;
    line-height: 1.6;
    max-width: 64ch;
  }
  .memo-prose :global(ul),
  .memo-prose :global(ol) {
    margin: 0 0 16px 24px;
    line-height: 1.55;
    max-width: 64ch;
  }
  .memo-prose :global(li) {
    margin-bottom: 6px;
  }
  .memo-prose :global(table) {
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 14px;
  }
  .memo-prose :global(th),
  .memo-prose :global(td) {
    border: 1px solid var(--rule, #d4cfc4);
    padding: 6px 10px;
    text-align: left;
  }
  .memo-prose :global(th) {
    background: var(--paper-shade, #f1ece2);
    font-weight: 600;
  }
  .memo-prose :global(blockquote) {
    border-left: 2px solid var(--accent, #c0501e);
    padding-left: 14px;
    color: var(--ink-muted, #6b6357);
    margin: 14px 0;
  }
  .memo-prose :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9em;
  }
</style>
