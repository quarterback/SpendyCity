<script lang="ts">
  /**
   * Pre-formatted social copy with a copy-to-clipboard button. Renders the
   * sharing affordance specified in the project brief: short post copy a
   * reader can lift verbatim to Bluesky / Mastodon / X / LinkedIn.
   */

  interface Props {
    headline: string;
    summary: string;
    url: string;
  }

  const { headline, summary, url }: Props = $props();

  const social = $derived(`${headline}

${summary}

${url}`);

  let copied = $state(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try {
      await navigator.clipboard.writeText(social);
      copied = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => (copied = false), 1800);
    } catch {
      copied = false;
    }
  }
</script>

<aside class="share">
  <p class="kicker">SHARE THIS STORY</p>
  <pre class="share-copy">{social}</pre>
  <button type="button" onclick={copy} class="share-copy-btn">
    {copied ? 'Copied' : 'Copy social text'}
  </button>
</aside>
