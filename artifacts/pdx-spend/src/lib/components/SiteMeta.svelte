<script lang="ts">
  /**
   * Per-page Open Graph + Twitter card metadata. The 1200x630 OG image is a
   * single brand placeholder shipped under /static/og-default.svg; per-page
   * overrides are accepted via the `image` prop.
   */
  import { base } from '$app/paths';

  interface Props {
    title: string;
    description: string;
    path?: string;
    image?: string;
    type?: 'website' | 'article';
  }

  const {
    title,
    description,
    path = '/',
    image = `${base}/og-default.svg`,
    type = 'article'
  }: Props = $props();

  const SITE_URL = 'https://pdx-spend.example';
  const fullUrl = `${SITE_URL}${path}`;
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
  <meta property="og:image" content={`${SITE_URL}${image}`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={`${SITE_URL}${image}`} />
</svelte:head>
