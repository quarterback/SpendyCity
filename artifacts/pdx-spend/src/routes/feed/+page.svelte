<script lang="ts">
  import { base } from '$app/paths';
  import { FUNDS } from '$lib/data/funds';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
</script>

<SiteMeta
  title="Issue index — PDX Spend"
  description="Every page in PDX Spend Issue 01: seven fund pages, the dashboard, the agent demo, methodology, and implications."
  path="/feed/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">ISSUE 01 · INDEX</p>
    <h1 class="article-title">PDX Spend, Issue 01</h1>
    <p class="article-deck">
      Seven funds, one dashboard, one agent demo, one methodology note, one implications essay.
    </p>
    <p class="rss-link">
      Subscribe via RSS:
      <a href="{base}/feed.xml">{base || ''}/feed.xml</a>
    </p>
  </header>

  <section class="container">
    <ul class="feed">
      <li class="feed-item">
        <p class="feed-meta">FRONT · ISSUE 01</p>
        <h2><a href="{base}/">Seven Portland-area voter funds, in plain view</a></h2>
        <p>The hero chart and fund grid for the issue.</p>
      </li>
      {#each FUNDS as f}
        <li class="feed-item">
          <p class="feed-meta">FUND · {f.enacted} · {f.ballotMeasure ?? f.enablingCode}</p>
          <h2><a href="{base}/funds/{f.slug}/">{f.name}</a></h2>
          <p>{f.scandal}</p>
        </li>
      {/each}
      <li class="feed-item">
        <p class="feed-meta">DASHBOARD</p>
        <h2><a href="{base}/dashboard/">Cross-fund dashboard</a></h2>
        <p>All seven funds in one frame: dollars, share restricted, and drift trajectory.</p>
      </li>
      <li class="feed-item">
        <p class="feed-meta">AGENT</p>
        <h2><a href="{base}/agent/">Generate a structured financial memo</a></h2>
        <p>Pick a fund and a lens. The agent writes a brief in the voice you select.</p>
      </li>
      <li class="feed-item">
        <p class="feed-meta">METHODOLOGY</p>
        <h2><a href="{base}/methodology/">How this site was built</a></h2>
        <p>What figures are constructed, what modeling choices were made, and how audited numbers will replace them.</p>
      </li>
      <li class="feed-item">
        <p class="feed-meta">ESSAY</p>
        <h2><a href="{base}/implications/">What the seven funds suggest</a></h2>
        <p>The pattern is consistent across instruments and stewards. It is worth naming.</p>
      </li>
      <li class="feed-item">
        <p class="feed-meta">ABOUT</p>
        <h2><a href="{base}/about/">PDX Spend</a></h2>
        <p>Authorship, license, citation, and contact.</p>
      </li>
    </ul>
  </section>
</article>
