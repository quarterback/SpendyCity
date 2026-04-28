// @ts-nocheck
import { FUNDS } from '$lib/data/funds';
import { loadLatestWeeklyAcrossFunds } from '$lib/server/agent';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = async () => {
  const latestWeekly = await loadLatestWeeklyAcrossFunds(FUNDS.map((f) => f.slug));
  return { latestWeekly };
};
;null as any as PageServerLoad;