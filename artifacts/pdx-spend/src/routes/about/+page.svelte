<script lang="ts">
  import { base } from '$app/paths';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
</script>

<SiteMeta
  title="About — PDX Spend"
  description="Authorship, license, citation, and contact for PDX Spend."
  path="/about/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">ABOUT</p>
    <h1 class="article-title">PDX Spend</h1>
    <p class="article-deck">
      Seven voter-restricted funds in Portland and Multnomah County, drawn in plain view.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>The work</h2>
      <p>
        PDX Spend is a single-issue publication. It documents a structural pattern across seven public funds in one jurisdiction: how voter-passed restricted dollars accumulate, get redefined, and end up doing something other than what they were passed for.
      </p>
      <p>
        It is a static, citable, embed-friendly site organized around chart-driven scrollytelling, with a small agent endpoint that can rewrite each fund's structured memo on demand.
      </p>

      <h2>Authorship</h2>
      <p>
        Reporting and design by <strong>Ron Bronson</strong>, working under <strong>Public Capacity Lab</strong> and <strong>State Capacity AI</strong>. The agent endpoint runs Anthropic's Claude (Sonnet) via Replit's AI integration proxy.
      </p>
      <p>
        Editorial reference: <em>The Pudding</em> (single-narrative, chart-led longform), the <em>Financial Times</em> visual desk (chart language, restraint), <em>Reveal</em> and <em>ProPublica</em> (structural framing of public-money stories).
      </p>

      <h2>Use</h2>
      <p>
        Every chart has download buttons for PNG and CSV. The dashboard is embeddable. The site is structured so modeled figures can be swapped for audited figures with a one-file edit per fund.
      </p>

      <h2>Data status</h2>
      <p>
        All figures in Issue 01 are modeled reconstructions. See the <a href="{base}/methodology/">methodology</a> page for the construction choices.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Contact</h4>
      <p>
        For corrections, source documents, or to provide an audited figure that should replace a modeled one:<br />
        <a href="mailto:hello@publiccapacitylab.org">hello@publiccapacitylab.org</a>
      </p>
      <h4 style="margin-top: 22px">Cite this</h4>
      <p>
        Bronson, R. (2026). <em>PDX Spend, Issue 01: Seven voter-restricted funds, modeled in plain view.</em> Public Capacity Lab / State Capacity AI.
      </p>
      <h4 style="margin-top: 22px">License</h4>
      <p>
        Charts and prose released under CC BY 4.0. Code released under MIT.
      </p>
    </aside>
  </section>
</article>
