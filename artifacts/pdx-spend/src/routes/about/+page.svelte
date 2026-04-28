<script lang="ts">
  import { base } from '$app/paths';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
</script>

<SiteMeta
  title="About — PDX Spend"
  description="Who built PDX Spend, how to cite it, how to use it, and how to send corrections."
  path="/about/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">ABOUT</p>
    <h1 class="article-title">PDX Spend</h1>
    <p class="article-deck">
      A tool for showing what seven Portland-area voter funds could pay for, and the named rule that purports to stop them.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>What this is</h2>
      <p>
        PDX Spend is a single-issue tool. It documents seven public funds in one region. For each one it shows three things: what the fund could pay for at its current balance, what&rsquo;s blocking that, and who controls the lever.
      </p>
      <p>
        It&rsquo;s a static, citable site. Every chart downloads. The dashboard embeds. Each fund&rsquo;s memo ships with the page, prerendered alongside the interactive charts.
      </p>

      <h2>Who built it</h2>
      <p>
        Reporting and design by <strong>Ron Bronson</strong>, working under <strong>Public Capacity Lab</strong> and <strong>State Capacity AI</strong>.
      </p>
      <p>
        Editorial reference: <em>The Pudding</em> (chart-led longform), the <em>Financial Times</em> visual desk (chart language, restraint), <em>Reveal</em> and <em>ProPublica</em> (structural framing of public-money stories), <a href="https://plainlanguage.gov" rel="noopener">plainlanguage.gov</a> (writing standards).
      </p>

      <h2>How to use it</h2>
      <p>
        Pick a fund. Read what it could pay for. Read who controls the blocker. Send the page to that office. Every chart has download buttons for PNG and CSV.
      </p>

      <h2>Status of the figures</h2>
      <p>
        Every figure on this site is modeled until audited records replace it. As audited documents become available, the modeled series get swapped out and the chart loses its <code>MODELED</code> badge. See the <a href="{base}/methodology/">methodology</a>.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Send a correction</h4>
      <p>
        Send a source document, an audited figure, or a correction to:<br />
        <a href="mailto:hello@publiccapacitylab.org">hello@publiccapacitylab.org</a>
      </p>
      <h4 style="margin-top: 22px">Cite this</h4>
      <p>
        Bronson, R. (2026). <em>PDX Spend: Seven Portland-area voter funds, what they could pay for, and what&rsquo;s blocking it.</em> Public Capacity Lab / State Capacity AI.
      </p>
      <h4 style="margin-top: 22px">License</h4>
      <p>
        Charts and prose under CC BY 4.0. Code under MIT.
      </p>
    </aside>
  </section>
</article>
