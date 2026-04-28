<script lang="ts">
  import { base } from '$app/paths';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const { charts } = $derived(data);

  let copiedId = $state<string | null>(null);
  async function copySnippet(id: string, snippet: string) {
    try {
      await navigator.clipboard.writeText(snippet);
      copiedId = id;
      setTimeout(() => (copiedId = null), 1800);
    } catch {
      copiedId = null;
    }
  }
</script>

<SiteMeta
  title="Embeddable charts — PDX Spend"
  description="Every chart on PDX Spend is freely embeddable. Copy an iframe snippet to add it to your newsletter, blog, or civic page. All embeds carry visible credit back to PDX Spend."
  path="/embed/"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">EMBED · PDX SPEND</p>
    <h1 class="article-title">Embeddable charts</h1>
    <p class="article-deck">
      Every chart on PDX Spend is freely embeddable. Paste any snippet into your newsletter, blog, or civic page. All embeds carry a visible credit line linking back to the source page on PDX Spend.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>Attribution policy</h2>
      <p>
        PDX Spend's charts are produced from modeled reconstructions of public audit and budget records. You may embed them freely in non-commercial and civic contexts. Each embed renders a non-removable credit footer — "PDX Spend · pdxspend.replit.app" — linking to the originating page. We ask that you do not strip the credit footer or hotlink the embed page inside a frame that obscures it.
      </p>
      <p>
        All figures are modeled. Chart frames carry a MODELED badge. See <a href="{base}/methodology/">Methodology</a> for how they were built.
      </p>
    </div>
    <aside class="margin-note">
      <h4>How to embed</h4>
      <p>
        Click "Copy snippet" next to any chart below. Paste the <code>&lt;iframe&gt;</code> into your HTML. The chart renders responsively at 100% of the container width.
      </p>
      <p style="margin-top:12px">
        Each snippet sets <code>loading="lazy"</code> for performance and includes a <code>title</code> attribute for accessibility.
      </p>
    </aside>
  </section>

  {#each charts as chart}
    <section class="container embed-card">
      <div class="embed-card-header">
        <div class="embed-card-info">
          <p class="embed-card-id">{chart.id}</p>
          <p class="embed-card-title">{chart.meta.title}</p>
          <p class="embed-card-sub">{chart.meta.sub}</p>
          <p class="embed-card-source">Source · {chart.meta.source}</p>
        </div>
        <div class="embed-card-actions">
          <a class="embed-preview-link" href="{base}/embed/{chart.id}" target="_blank" rel="noopener noreferrer">
            Preview embed ↗
          </a>
          <a class="embed-source-link" href="{base}{chart.meta.sourcePage}">
            Source page →
          </a>
        </div>
      </div>
      <div class="embed-snippet-row">
        <pre class="embed-snippet">{chart.snippet}</pre>
        <button
          class="copy-btn"
          onclick={() => copySnippet(chart.id, chart.snippet)}
        >
          {copiedId === chart.id ? 'Copied!' : 'Copy snippet'}
        </button>
      </div>
    </section>
  {/each}
</article>

<style>
  .embed-card {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--rule, #d4cfc4);
  }
  .embed-card-header {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .embed-card-info {
    flex: 1;
    min-width: 0;
  }
  .embed-card-id {
    margin: 0 0 4px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10px;
    letter-spacing: 0.08em;
    color: var(--ink-muted, #6b6357);
    text-transform: uppercase;
  }
  .embed-card-title {
    margin: 0 0 4px;
    font-family: var(--font-serif, Georgia, serif);
    font-size: 17px;
    font-weight: 700;
    line-height: 1.25;
    color: var(--ink, #1a1714);
  }
  .embed-card-sub {
    margin: 0 0 4px;
    font-size: 13px;
    color: var(--ink, #1a1714);
    line-height: 1.4;
  }
  .embed-card-source {
    margin: 0;
    font-size: 11px;
    color: var(--ink-muted, #6b6357);
  }
  .embed-card-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
    flex-shrink: 0;
  }
  .embed-preview-link,
  .embed-source-link {
    font-size: 13px;
    color: var(--accent, #c0501e);
    text-decoration: none;
    font-weight: 600;
    white-space: nowrap;
  }
  .embed-preview-link:hover,
  .embed-source-link:hover {
    text-decoration: underline;
  }
  .embed-source-link {
    color: var(--ink-muted, #6b6357);
  }
  .embed-snippet-row {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .embed-snippet {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 10px 12px;
    background: var(--paper-alt, #f4efe6);
    border: 1px solid var(--rule, #d4cfc4);
    border-radius: 3px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10.5px;
    line-height: 1.5;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .copy-btn {
    flex-shrink: 0;
    padding: 8px 14px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 11px;
    letter-spacing: 0.05em;
    background: var(--ink, #1a1714);
    color: var(--paper, #fbf8f1);
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.15s ease;
  }
  .copy-btn:hover {
    background: var(--accent, #c0501e);
  }
</style>
