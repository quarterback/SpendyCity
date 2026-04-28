import { error } from '@sveltejs/kit';
import { FUND_BY_SLUG, FUNDS } from '$lib/data/funds';
import type { PageLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return FUNDS.map((f) => ({ slug: f.slug }));
};

export const load: PageLoad = ({ params }) => {
  const fund = FUND_BY_SLUG[params.slug];
  if (!fund) throw error(404, 'Fund not found');
  return { fund };
};
