<script lang="ts">
  import type { Blocker } from '$lib/data/types';

  interface Props {
    blocker: Blocker;
    index: number;
  }
  let { blocker, index }: Props = $props();
</script>

<article class="blocker">
  <p class="num">Blocker {index}</p>
  <h3>{blocker.name}</h3>
  <p class="mechanism">{blocker.mechanism}</p>

  <dl class="lever">
    <dt>Who controls the lever</dt>
    <dd>{blocker.controlledBy}</dd>
  </dl>

  <div class="defense">
    <p class="lbl">The defense</p>
    <p class="quote">&ldquo;{blocker.defense}&rdquo;</p>
  </div>

  <div class="rebuttal">
    <p class="lbl">Why it doesn&rsquo;t hold up</p>
    <p class="line">{blocker.rebuttal}</p>
  </div>
</article>

<style>
  .blocker {
    background: var(--paper);
    border: 1px solid var(--rule);
    border-left: 3px solid var(--accent);
    padding: 1.1rem 1.2rem 1rem;
    margin: 0 0 1rem;
  }
  .num {
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    margin: 0 0 0.3rem;
  }
  h3 {
    font-family: var(--serif);
    font-weight: 460;
    font-size: 1.18rem;
    line-height: 1.25;
    color: var(--ink);
    margin: 0 0 0.7rem;
    max-width: none;
  }
  .mechanism {
    font-family: var(--serif);
    font-size: 1rem;
    line-height: 1.5;
    color: var(--ink-2);
    margin: 0 0 0.9rem;
    max-width: none;
  }
  dl.lever {
    margin: 0 0 1rem;
    padding: 0.55rem 0 0.55rem;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
  }
  dl.lever dt {
    font-family: var(--mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-4);
    margin: 0 0 0.2rem;
  }
  dl.lever dd {
    font-family: var(--serif);
    font-size: 0.96rem;
    color: var(--ink);
    margin: 0;
    line-height: 1.3;
  }
  .defense, .rebuttal {
    margin-bottom: 0.7rem;
  }
  .lbl {
    font-family: var(--mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-4);
    margin: 0 0 0.25rem;
  }
  .quote {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.98rem;
    line-height: 1.4;
    color: var(--ink-3);
    margin: 0;
    max-width: none;
  }
  .line {
    font-family: var(--serif);
    font-size: 1rem;
    line-height: 1.45;
    color: var(--ink);
    margin: 0;
    max-width: none;
  }
  .rebuttal .line {
    font-weight: 460;
  }
  .rebuttal {
    margin-bottom: 0;
  }
</style>
