<script lang="ts">
  import { base } from '$app/paths';
  import { FUNDS } from '$lib/data/funds';
  import SiteMeta from '$lib/components/SiteMeta.svelte';

  let selectedSlug = $state(FUNDS[0].slug);
  let lens = $state('financial-officer');
  let memo = $state(FUNDS[0].memo);
  let streaming = $state(false);
  let error = $state<string | null>(null);
  let liveOutput = $state('');

  const fund = $derived(FUNDS.find((f) => f.slug === selectedSlug)!);

  $effect(() => {
    memo = fund.memo;
    liveOutput = '';
    error = null;
  });

  const lenses = [
    { value: 'financial-officer', label: 'Public-finance officer' },
    { value: 'auditor', label: 'City auditor' },
    { value: 'voter', label: 'Voter who passed it' },
    { value: 'reporter', label: 'Investigative reporter' }
  ];

  async function regenerate() {
    streaming = true;
    error = null;
    liveOutput = '';
    try {
      const res = await fetch(`${base}/api/regenerate-memo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fundSlug: fund.slug, lens })
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const parsed = JSON.parse(payload);
            if (parsed.text) liveOutput += parsed.text;
            if (parsed.error) error = parsed.error;
          } catch {
            // ignore non-json lines
          }
        }
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Unknown error';
    } finally {
      streaming = false;
    }
  }

</script>

<SiteMeta
  title="Agent demo — PDX Spend"
  description="Pick a fund and a lens. The agent writes a short memo about that fund in the voice you choose."
  path="/agent/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">AGENT DEMO · WRITE A MEMO</p>
    <h1 class="article-title">Write a memo for any fund.</h1>
    <p class="article-deck">
      Pick a fund and pick a lens. The agent reads what we have on the fund and writes a short memo. Use it as a starting draft for your own letter or testimony.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>How it works</h2>
      <p>
        The agent gets the fund&rsquo;s ballot text, statute, balances, audit events, and recent memos. It writes a one-page memo in the voice you pick.
      </p>
      <p>
        The endpoint is rate-limited per IP. If it&rsquo;s busy, the saved memo for each fund is the version on the fund page itself.
      </p>
    </div>
    <aside class="margin-note">
      <h4>What the lens changes</h4>
      <p>
        The lens changes the voice, not the facts. <em>Auditor</em> cites code numbers. <em>Reporter</em> names the gap. <em>Voter</em> names what was promised and what arrived.
      </p>
    </aside>
  </section>

  <section class="container">
    <div class="agent-controls">
      <label>
        <span>Fund</span>
        <select bind:value={selectedSlug}>
          {#each FUNDS as f}
            <option value={f.slug}>{f.shortName} — {f.name}</option>
          {/each}
        </select>
      </label>
      <label>
        <span>Lens</span>
        <select bind:value={lens}>
          {#each lenses as l}
            <option value={l.value}>{l.label}</option>
          {/each}
        </select>
      </label>
      <button class="run-btn" onclick={regenerate} disabled={streaming}>
        {streaming ? 'Writing…' : 'Generate'}
      </button>
    </div>

    {#if error}
      <p class="agent-error">Live endpoint failed: {error}. The saved memo is shown below.</p>
    {/if}
  </section>

  <section class="container">
    <p class="kicker">{liveOutput ? 'LIVE OUTPUT' : 'SAVED MEMO'}</p>
    <pre class="memo">{liveOutput || memo}</pre>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Why a memo, not a press release</h2>
      <p>
        If you voted for one of these funds, you&rsquo;re owed a short, structured account of what your dollars now do. A memo — summary, findings, recommendations — gives you something you can hand to a council member or a reporter the same day.
      </p>
    </div>
    <aside class="margin-note">
      <h4>What runs this</h4>
      <p>
        Anthropic&rsquo;s Claude (Sonnet) via Replit&rsquo;s AI integration proxy. The system prompt and lens templates live in <code>src/routes/api/regenerate-memo/+server.ts</code>. The fund context is built server-side.
      </p>
      <p style="margin-top: 12px">See <a href="{base}/methodology/">methodology →</a></p>
    </aside>
  </section>
</article>
