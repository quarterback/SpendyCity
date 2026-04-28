<script lang="ts">
  import { base } from '$app/paths';
  import { FUNDS } from '$lib/data/funds';

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
    { value: 'voter', label: 'Voter who passed the measure' },
    { value: 'reporter', label: 'Investigative reporter' }
  ];

  async function regenerate() {
    streaming = true;
    error = null;
    liveOutput = '';
    try {
      const res = await fetch('/api/regenerate-memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fundSlug: fund.slug, lens, fund: serializeFundForPrompt(fund) })
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

  function serializeFundForPrompt(f: typeof FUNDS[number]) {
    return {
      name: f.name,
      enacted: f.enacted,
      ballotMeasure: f.ballotMeasure,
      enablingCode: f.enablingCode,
      voterIntent: f.voterIntent,
      modeledBalance: f.modeledBalance,
      modeledRestrictedShare: f.modeledRestrictedShare,
      modeledMovableShare: f.modeledMovableShare,
      cumulativeCollected: f.cumulativeCollected,
      auditEvents: f.auditEvents.map((e) => ({ year: e.year, label: e.label, body: e.body })),
      drift: f.drift,
      promiseVsHappened: f.promiseVsHappened
    };
  }
</script>

<svelte:head>
  <title>Agent demo — PDX Spend</title>
</svelte:head>

<article>
  <header class="container fund-header">
    <p class="kicker">AGENT DEMO · STRUCTURED MEMO</p>
    <h1 class="article-title">Generate a structured financial memo</h1>
    <p class="article-deck">
      Pick a fund and a lens. The agent reads the fund's modeled record and writes a brief in the voice you select. Each page of this site already ships with a pre-generated memo; this view re-runs it live.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>How this works</h2>
      <p>
        The agent receives the fund's enabling code, voter intent, modeled balances, audit-event log, drift index, and promise-vs-delivered series. It is asked to produce a single-page structured memo: summary, structural findings, recommendations. No editorial framing.
      </p>
      <p>
        The endpoint is rate-limited per IP and the modeled-data caveat is enforced in the system prompt. If the live endpoint is unavailable, the pre-generated memo on each fund's page is the canonical version.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Lenses</h4>
      <p>
        The lens parameter changes the voice but not the structure. A "voter" lens explains what they were sold and what arrived. An "auditor" lens cites code and resolution numbers. A "reporter" lens names the structural gap.
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
        {streaming ? 'Generating…' : 'Regenerate live'}
      </button>
    </div>

    {#if error}
      <p class="agent-error">Live endpoint failed: {error}. Pre-generated memo shown below.</p>
    {/if}
  </section>

  <section class="container">
    <p class="kicker">{liveOutput ? 'LIVE OUTPUT' : 'PRE-GENERATED MEMO'}</p>
    <pre class="memo">{liveOutput || memo}</pre>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Why a memo, not an opinion</h2>
      <p>
        Voters who pass restricted-fund measures are entitled to a structured accounting of what their dollars now do. The form of that accounting is not a press release or a feature story; it is a memo. The agent is asked to produce that memo and nothing else.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Provenance</h4>
      <p>
        The model behind this endpoint is Anthropic's Claude (Sonnet generation) accessed through Replit's AI integration proxy. The system prompt and structure live in <code>artifacts/api-server/src/routes/regenerate-memo.ts</code>.
      </p>
      <p style="margin-top: 12px">See <a href="{base}/methodology/">methodology →</a></p>
    </aside>
  </section>
</article>
