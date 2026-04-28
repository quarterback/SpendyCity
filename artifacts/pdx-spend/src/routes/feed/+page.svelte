<script lang="ts">
  import { base } from '$app/paths';
  import { FUNDS } from '$lib/data/funds';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
</script>

<SiteMeta
  title="Feed — PDX Spend"
  description="Issue index for PDX Spend: every fund page, the dashboard, the agent demo, methodology, and implications. Subscribe via /feed.xml."
  path="/feed/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">FEED · ISSUE 01</p>
    <h1 class="article-title">PDX Spend, Issue 01</h1>
    <p class="article-deck">
      Seven fund pages, one dashboard, one agent demo, one methodology note, one implications essay. Listed in order of publication.
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
        <h2><a href="{base}/">Seven voter-passed funds, quietly redrawn around their balances</a></h2>
        <p>The cover essay and at-a-glance hero chart for the issue.</p>
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
        <h2><a href="{base}/dashboard/">Cross-fund dashboard — three views of all seven</a></h2>
        <p>Switch between absolute carry, share-restricted, and drift trajectory. Embed-friendly.</p>
      </li>
      <li class="feed-item">
        <p class="feed-meta">AGENT</p>
        <h2><a href="{base}/agent/">Generate a structured financial memo</a></h2>
        <p>Pick a fund and a lens. The agent re-runs the memo against the modeled record.</p>
      </li>
      <li class="feed-item">
        <p class="feed-meta">METHODOLOGY</p>
        <h2><a href="{base}/methodology/">How this site was built</a></h2>
        <p>What is modeled, why, and how the audited figures will be swapped in.</p>
      </li>
      <li class="feed-item">
        <p class="feed-meta">ESSAY</p>
        <h2><a href="{base}/implications/">What the seven funds, taken together, suggest</a></h2>
        <p>The structural pattern is consistent enough across instruments and stewards that it is worth naming.</p>
      </li>
      <li class="feed-item">
        <p class="feed-meta">ABOUT</p>
        <h2><a href="{base}/about/">PDX Spend</a></h2>
        <p>Authorship, license, citation, and contact.</p>
      </li>
    </ul>
  </section>
</article>
