import { error } from '@sveltejs/kit';
import { FUND_BY_SLUG, FUNDS } from '$lib/data/funds';
import { loadMemo, loadRunHistory } from '$lib/server/agent';
import type { PageServerLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return FUNDS.map((f) => ({ slug: f.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  const fund = FUND_BY_SLUG[params.slug];
  if (!fund) throw error(404, 'Fund not found');

  const [weeklyMemo, monthlyCashFlow, runs] = await Promise.all([
    loadMemo(params.slug, 'weekly-memo'),
    loadMemo(params.slug, 'monthly-cash-flow'),
    loadRunHistory(params.slug, 8)
  ]);

  return {
    fund,
    weeklyMemo,
    monthlyCashFlow,
    runs
  };
};
