<script lang="ts">
  import { base } from '$app/paths';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
</script>

<SiteMeta
  title="Methodology &amp; glossary — PDX Spend"
  description="What the figures are, where they come from, and a plain-language glossary of every term used on the site."
  path="/methodology/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">METHODOLOGY &amp; GLOSSARY</p>
    <h1 class="article-title">How this site was built, in plain words</h1>
    <p class="article-deck">
      What the figures mean, where they come from, and what every term on the site stands for.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <h2>What the figures are</h2>
      <p>
        Every dollar amount on the site is <em>modeled</em> until audited records replace it. That means: the shape and order of magnitude come from real audits, ordinances, and bureau reports, but the exact year-end numbers were reconstructed.
      </p>
      <p>
        Every chart on the site currently carries a <code>MODELED</code> badge. The methodology page defines the term once, and the badge handles the disclosure on the page. Each chart loses its badge as soon as audited figures replace the modeled ones.
      </p>
      <p>
        Audited figures land as the underlying documents become available. Replacing a modeled series with an audited one is a one-file edit per fund, and the chart loses its badge on the next deploy.
      </p>

      <h2>Why model</h2>
      <p>
        The actual figures are not in one place. Each fund&rsquo;s record is spread across an enabling code, a ballot pamphlet, an annual financial report, bureau memos, and council resolutions. No one dashboard shows all seven on the same axes. This site is that dashboard.
      </p>

      <h2>How the figures were constructed</h2>
      <ul>
        <li>
          <strong>Balance over time.</strong> Built from a starting inflow, a yearly inflow growth rate, and a spend ratio that ramps up after the fund passes. The unspent share each year is held at a fund-specific fraction.
        </li>
        <li>
          <strong>Key events.</strong> Each annotated event maps to a real category of audit finding: collection-cost overrun, scope expansion, surplus carryover, compliance gap. Source lines name the institution rather than a specific document number.
        </li>
        <li>
          <strong>Share still on-mission.</strong> A 0–100 score from reading post-enactment ordinances against the original ballot text. 100 means every dollar still maps to what voters passed. Each scope-broadening vote pulls the score down.
        </li>
        <li>
          <strong>Promised vs. delivered.</strong> Promised dollars are what the bureau said it would spend in a published plan. Delivered dollars are what shipped. The gap becomes carryover.
        </li>
        <li>
          <strong>Could-fund items.</strong> Unit counts × published unit costs (city grant scales, BPS retrofit cost, EnergyTrust HVAC cost, NABCEP tuition, federal HOME averages). The point is the order of magnitude — real procurement and ramp time would shape exact numbers.
        </li>
        <li>
          <strong>Blockers.</strong> Each blocker is a mechanism in the statute or in bureau reporting practice. The defense paraphrases positions actually published in audit responses, council minutes, and bureau reports. The rebuttal is the site&rsquo;s editorial position.
        </li>
      </ul>
    </div>
    <aside class="margin-note">
      <h4>Tech</h4>
      <p>
        SvelteKit (static adapter, fully prerendered). D3 for charts. Scrollama for chart-driven scroll. Fund records live in TypeScript modules.
      </p>
      <p style="margin-top: 14px">
        <strong>Type · </strong>Fraunces (display + body), JetBrains Mono (eyebrow, axis, annotation).
      </p>
      <p style="margin-top: 14px">
        <strong>Voice guide · </strong><a href="{base}/voice.md">voice.md</a>
      </p>
    </aside>
  </section>

  <section class="container">
    <p class="section-eyebrow">Glossary</p>
    <h2 class="section-title">Every term on the site, in plain words</h2>
    <dl class="glossary">
      <dt>Voter-restricted fund</dt>
      <dd>Money collected from a specific tax or fee that voters approved for a specific purpose. The fund is supposed to spend on that purpose only.</dd>

      <dt>Charter-restricted fund</dt>
      <dd>Money collected under the city or county charter for a specific purpose. The charter, not a ballot measure, is the rule.</dd>

      <dt>Statute-restricted (enabling-act-restricted) fund</dt>
      <dd>Money collected under a state law or city ordinance for a specific purpose. The ordinance is the rule, and a council vote can change it.</dd>

      <dt>Ordinance</dt>
      <dd>A rule passed by a city council that has the force of law inside that city. Council can amend or repeal an ordinance with a later vote, which is how a fund&rsquo;s eligible uses get widened.</dd>

      <dt>Voter intent (voter mandate)</dt>
      <dd>What the ballot text actually said the fund was for, when voters passed it. The site treats the ballot text as the binding mandate, and reads later changes against it.</dd>

      <dt>Redirected</dt>
      <dd>A dollar that was approved at the ballot for one purpose, then later spent on a different purpose. The redirection happens through a council vote, a budget rewrite, or a broadened eligible-uses list.</dd>

      <dt>Sitting today / balance</dt>
      <dd>The amount of money in the fund right now that hasn&rsquo;t been spent yet.</dd>

      <dt>Re-aimed / movable</dt>
      <dd>The share of the fund that has been redirected away from what voters originally approved, through later council votes or rule changes.</dd>

      <dt>Still on-mission / restricted</dt>
      <dd>The share of the fund still aimed at what voters originally approved.</dd>

      <dt>Money sitting unspent / unobligated reserve</dt>
      <dd>Money in the fund that hasn&rsquo;t been promised to a contract or grant yet. This is the pool any future scope-broadening vote draws on.</dd>

      <dt>Promised vs. delivered</dt>
      <dd>What a budget cycle planned to spend, against what actually shipped that year. The gap becomes next year&rsquo;s carryover.</dd>

      <dt>Carryover</dt>
      <dd>Money left in the fund at the end of a year because it wasn&rsquo;t spent. It rolls into next year&rsquo;s balance and grows the headroom for redirection.</dd>

      <dt>Eligible uses</dt>
      <dd>The list of things the statute says the fund is allowed to pay for. Council can broaden this list with a vote.</dd>

      <dt>Could fund</dt>
      <dd>What the current balance could pay for, expressed as concrete units (homes weatherized, teachers funded, units built) at published unit costs.</dd>

      <dt>Blocker</dt>
      <dd>A specific mechanism — in statute, in budget process, or in reporting practice — that prevents the fund from spending against the original mandate.</dd>

      <dt>Lever</dt>
      <dd>The office, vote, or document change that would remove a blocker. Each blocker on this site names who controls its lever.</dd>

      <dt>Ballot text</dt>
      <dd>The official wording on the ballot when voters passed the measure. The site treats this as the binding voter mandate.</dd>

      <dt>Modeled</dt>
      <dd>A figure reconstructed from public reporting rather than pulled directly from an audited financial document. Charts carrying a <code>MODELED</code> badge use modeled figures.</dd>
    </dl>
  </section>

  <section class="container two-col">
    <div class="prose">
      <h2>Design choices</h2>
      <p>
        Charts are wide and prose is narrow on purpose. Margin notes carry the auxiliary read on desktop and tuck under the body on phones. Color is restrained — a single accent on the share that has been re-aimed.
      </p>

      <h2>Provenance</h2>
      <p>
        Every chart names its source. Charts carry a <code>MODELED</code> badge until the swap. When audited figures are wired in, the source line names the financial document the figure comes from, and the badge is removed.
      </p>

      <h2>Download and reuse</h2>
      <p>
        Each chart has download buttons for the rendered PNG and the underlying CSV. Use the "Share / Embed" button on any chart to get an iframe snippet and a direct embed link. Every embed carries a non-removable credit line linking back to the source page on PDX Spend.
      </p>
      <p>
        See the <a href="{base}/embed/">embeddable charts index</a> for a full list of what's embeddable and the attribution policy. Code under MIT, prose under CC BY 4.0.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Pages</h4>
      <p>
        <a href="{base}/">Home</a><br />
        <a href="{base}/dashboard/">Dashboard</a><br />
        <a href="{base}/implications/">Levers</a><br />
        <a href="{base}/about/">About</a><br />
        <a href="{base}/embed/">Embeddable charts</a>
      </p>
    </aside>
  </section>
</article>
