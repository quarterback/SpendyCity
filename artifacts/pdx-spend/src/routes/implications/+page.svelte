<script lang="ts">
  import { base } from '$app/paths';
  import SiteMeta from '$lib/components/SiteMeta.svelte';
  import ShareBlock from '$lib/components/ShareBlock.svelte';
  import { siteUrl } from '$lib/config';

  const levers = [
    {
      n: 1,
      name: 'Put a sunset on every restricted fund',
      who: 'Council, by ordinance amendment',
      body: 'Each fund should have an end date. If the work is done, return the surplus. If the work isn\u2019t done, return to voters. Sunsets close the door that scope-broadening votes open.'
    },
    {
      n: 2,
      name: 'Cap carryover at one year of operations',
      who: 'Council; County Board for tri-county funds',
      body: 'Anything above one year of operating cost gets disbursed against the published plan within the next two budget cycles. A reserve is for volatility. A multi-year balance is undeployed capacity.'
    },
    {
      n: 3,
      name: 'Require a binding multi-year deployment plan',
      who: 'Bureau steward, ratified by Council',
      body: 'Every fund publishes a five-year plan with quarterly reconciliation between awards and delivery. \u201CAwarded\u201D doesn\u2019t equal weatherized, trained, built, or housed. The plan and the report use the same units.'
    },
    {
      n: 4,
      name: 'Send any change in eligible uses back to voters',
      who: 'Council; County Board; Metro Council',
      body: 'A simple-majority vote should not be enough to redefine what voter-restricted dollars can be spent on. New uses go on the next ballot, or come from a different source.'
    },
    {
      n: 5,
      name: 'Require third-party verification of beneficiary outcomes',
      who: 'City Auditor, County Auditor, Metro Auditor',
      body: 'A bureau reporting on its own delivery is not the same as an auditor verifying it. Annual outcome verification — units occupied, kids enrolled, retrofits completed, jobs placed — should be a precondition for next year\u2019s appropriation.'
    }
  ];
</script>

<SiteMeta
  title="Levers — PDX Spend"
  description="Five named structural changes that would loosen the rules across the seven Portland-area voter funds. Each names who controls the lever."
  path="/implications/"
  type="article"
/>

<article>
  <header class="container fund-header">
    <p class="kicker">LEVERS · ISSUE 01</p>
    <h1 class="article-title">Five levers across the seven funds</h1>
    <p class="article-deck">
      Each lever is mechanical, not rhetorical. Each one names the office that controls it.
    </p>
  </header>

  <section class="container two-col">
    <div class="prose">
      <p>
        The pattern across the seven funds is consistent enough to fix structurally. The five changes below each loosen one of the named rules across the whole portfolio. None require a ballot measure. All require a vote.
      </p>
    </div>
    <aside class="margin-note">
      <h4>Why these five</h4>
      <p>
        Each lever appears in audit recommendations across multiple funds. None has been adopted as a portfolio-wide standard.
      </p>
    </aside>
  </section>

  <section class="container">
    <ol class="lever-list">
      {#each levers as l}
        <li class="lever">
          <p class="lever-n">Lever {l.n}</p>
          <h2 class="lever-name">{l.name}</h2>
          <dl class="lever-meta">
            <dt>Who controls it</dt>
            <dd>{l.who}</dd>
          </dl>
          <p class="lever-body">{l.body}</p>
        </li>
      {/each}
    </ol>
  </section>

  <section class="container">
    <ShareBlock
      headline="Five named levers across seven Portland-area voter funds. None requires a ballot measure."
      summary="Sunset, carryover cap, deployment plan, no-redefinition-without-voters, third-party outcome verification. PDX Spend."
      url={siteUrl('/implications/')}
    />
  </section>

  <section class="container fund-nav">
    <a class="nav-back" href="{base}/methodology/">← Methodology</a>
    <a class="nav-back" href="{base}/about/">About →</a>
  </section>
</article>

<style>
  .lever-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0 2rem;
  }
  .lever {
    border-top: 1px solid var(--ink);
    padding: 1.4rem 0 1.4rem;
  }
  .lever:last-child {
    border-bottom: 1px solid var(--ink);
  }
  .lever-n {
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    margin: 0 0 0.3rem;
  }
  .lever-name {
    font-family: var(--serif);
    font-weight: 460;
    font-size: clamp(1.3rem, 2.4vw, 1.65rem);
    line-height: 1.2;
    color: var(--ink);
    margin: 0 0 0.7rem;
    max-width: none;
  }
  .lever-meta {
    margin: 0 0 0.7rem;
    padding: 0.5rem 0;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
  }
  .lever-meta dt {
    font-family: var(--mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-4);
    margin: 0 0 0.2rem;
  }
  .lever-meta dd {
    font-family: var(--serif);
    font-size: 0.96rem;
    color: var(--ink);
    margin: 0;
  }
  .lever-body {
    font-family: var(--serif);
    font-size: 1.02rem;
    line-height: 1.5;
    color: var(--ink-2);
    margin: 0;
    max-width: 60ch;
  }
</style>
