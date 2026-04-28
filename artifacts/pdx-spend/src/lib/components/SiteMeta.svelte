<script lang="ts">
  /**
   * Per-page Open Graph + Twitter card metadata. The 1200x630 OG image is a
   * single brand placeholder shipped under /static/og-default.svg; per-page
   * overrides are accepted via the `image` prop.
   *
   * oembedIds: chart IDs for which to emit <link rel="alternate" type="application/json+oembed">
   * discovery tags, so platforms like Notion, Substack, and Ghost can auto-unfurl.
   */
  import { SITE_URL } from '$lib/config';
  import { CHART_REGISTRY, chartOembedUrl } from '$lib/charts/registry';

  interface Props {
    title: string;
    description: string;
    path?: string;
    image?: string;
    type?: 'website' | 'article';
    oembedIds?: string[];
  }

  const DEFAULT_OG_IMAGE = '/og-default.png';

  const {
    title,
    description,
    path = '/',
    image = DEFAULT_OG_IMAGE,
    type = 'article',
    oembedIds = []
  }: Props = $props();

  function toAbsoluteUrl(p: string): string {
    if (/^https?:\/\//i.test(p)) return p;
    const s = p.startsWith('/') ? p : `/${p}`;
    return `${SITE_URL}${s}`;
  }

  const fullUrl = $derived(toAbsoluteUrl(path));
  const fullImage = $derived(toAbsoluteUrl(image));

  const oembedLinks = $derived(
    oembedIds
      .map((id) => {
        const meta = CHART_REGISTRY.get(id);
        if (!meta) return null;
        return { href: chartOembedUrl(id), title: meta.title };
      })
      .filter(Boolean) as { href: string; title: string }[]
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={fullUrl} />

  <meta property="og:site_name" content="PDX Spend" />
  <meta property="og:type" content={type} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={fullUrl} />
  <meta property="og:image" content={fullImage} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={title} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={fullImage} />
  <meta name="twitter:image:alt" content={title} />

  {#each oembedLinks as link}
    <link rel="alternate" type="application/json+oembed" href={link.href} title={link.title} />
  {/each}
</svelte:head>
