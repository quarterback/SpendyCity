import { CHART_REGISTRY, allChartIds, chartIframeSnippet, chartEmbedUrl } from '$lib/charts/registry';

export const prerender = true;

export function load() {
  const charts = allChartIds().map((id) => {
    const meta = CHART_REGISTRY.get(id)!;
    return {
      id,
      meta,
      snippet: chartIframeSnippet(id, meta),
      embedUrl: chartEmbedUrl(id)
    };
  });
  return { charts };
}
