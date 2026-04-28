import { error } from '@sveltejs/kit';
import { CHART_REGISTRY, allChartIds } from '$lib/charts/registry';
import { FUND_BY_SLUG } from '$lib/data/funds';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
  return allChartIds().map((id) => ({ chartId: id }));
}

export const load: PageLoad = ({ params }) => {
  const meta = CHART_REGISTRY.get(params.chartId);
  if (!meta) throw error(404, `No embed found for chart "${params.chartId}"`);

  let fund = null;
  if (meta.fundSlug) {
    fund = FUND_BY_SLUG[meta.fundSlug] ?? null;
  }

  return { meta, fund };
};
