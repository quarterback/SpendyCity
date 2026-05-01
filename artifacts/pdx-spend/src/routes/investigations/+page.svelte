<script lang="ts">
  import { base } from '$app/paths';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import { INVESTIGATIONS } from '$lib/data/investigations';

  const items = INVESTIGATIONS.slice().sort((a, b) => b.number - a.number);

  function fmtDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
</script>

<SiteMeta
  title="Investigations — PDX Spend"
  description="Long-form structural reads of Portland and Multnomah County's quasi-governmental relationships — the contractor and delegated-administration layer between a public dollar and the outcome it was sold as funding."
  path="/investigations/"
  type="website"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">INVESTIGATIONS</p>
    <h1 class="article-title">The contractor layer is where the dollar disappears.</h1>
    <p class="article-deck">
      A new beat. Fund pages document a single revenue stream and what its balance has become. Investigations document a single quasi-governmental relationship — typically the contractor, nonprofit, or delegated-administration layer that sits between a public dollar and the outcome it was sold as funding.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>What lives here</h2>
      <p>
        Most of Portland and Multnomah County&rsquo;s public spending on housing, homelessness, climate, and benefits administration does not happen inside a city or county bureau. It happens inside a contracted nonprofit, a delegated joint office, or a quasi-public corporation. The legibility of the dollar drops sharply at the moment it crosses that boundary.
      </p>
      <p>
        These investigations follow the dollar across that boundary. They name the relationship, the contract, the deliverable, and what is and is not on the public record about whether the deliverable was met.
      </p>
    </div>
    <aside class="margin-note">
      <h4>How this differs from a fund page</h4>
      <p>
        A fund page reads a single revenue stream year by year and shows where its balance has drifted. An investigation reads a single relationship — the contractor, the joint office, the quasi-public board — and shows what the dollar buys, who absorbs the slack when it doesn&rsquo;t, and which parts of that arrangement are publicly answerable.
      </p>
    </aside>
  </section>

  <section class="container">
    <p class="kicker">INDEX</p>
    <h2 class="section-title">Investigations to date</h2>
    <div class="invest-grid">
      {#each items as item}
        <a class="invest-card" href="{base}/investigations/{item.slug}/">
          <p class="invest-meta">{item.kicker} · {fmtDate(item.publishedAt)}</p>
          <h3 class="invest-title">{item.title}</h3>
          <p class="invest-deck">{item.oneLineThesis}</p>
          <p class="invest-cta">Read the investigation →</p>
        </a>
      {/each}
    </div>
  </section>
</article>

<style>
  .invest-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 18px;
    margin-top: 18px;
  }
  .invest-card {
    display: block;
    padding: 22px 24px 18px;
    border: 1px solid var(--rule);
    background: var(--paper);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.15s ease, transform 0.15s ease;
  }
  .invest-card:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .invest-meta {
    margin: 0 0 8px;
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-4);
  }
  .invest-title {
    margin: 0 0 10px;
    font-family: var(--serif);
    font-size: 26px;
    line-height: 1.2;
  }
  .invest-deck {
    margin: 0 0 14px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-2);
  }
  .invest-cta {
    margin: 0;
    font-size: 13px;
    color: var(--accent);
    font-weight: 600;
  }
</style>
