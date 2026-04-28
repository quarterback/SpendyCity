import { json, error } from '@sveltejs/kit';
import { CHART_REGISTRY, chartEmbedUrl, chartIframeSnippet } from '$lib/charts/registry';
import { SITE_URL } from '$lib/config';
import type { RequestHandler } from './$types';

export const prerender = true;

export function entries() {
  return Array.from(CHART_REGISTRY.keys()).map((id) => ({ chartId: id }));
}

export const GET: RequestHandler = ({ params }) => {
  const meta = CHART_REGISTRY.get(params.chartId);
  if (!meta) throw error(404, `No oEmbed found for chart "${params.chartId}"`);

  const embedUrl = chartEmbedUrl(params.chartId);
  const sourceUrl = `${SITE_URL}${meta.sourcePage}`;

  const payload = {
    version: '1.0',
    type: 'rich',
    provider_name: 'PDX Spend',
    provider_url: SITE_URL,
    author_name: 'PDX Spend',
    author_url: SITE_URL,
    title: meta.title,
    url: sourceUrl,
    html: chartIframeSnippet(params.chartId, meta),
    width: meta.defaultWidth,
    height: meta.defaultHeight
  };

  return json(payload, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
