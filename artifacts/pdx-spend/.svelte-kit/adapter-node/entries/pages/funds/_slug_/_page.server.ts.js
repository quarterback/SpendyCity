import { error } from "@sveltejs/kit";
import { a as FUNDS, F as FUND_BY_SLUG } from "../../../../chunks/funds.js";
import { a as loadMemo, b as loadRunHistory } from "../../../../chunks/agent.js";
const prerender = true;
const entries = () => {
  return FUNDS.map((f) => ({ slug: f.slug }));
};
const load = async ({ params }) => {
  const fund = FUND_BY_SLUG[params.slug];
  if (!fund) throw error(404, "Fund not found");
  const [weeklyMemo, monthlyCashFlow, runs] = await Promise.all([
    loadMemo(params.slug, "weekly-memo"),
    loadMemo(params.slug, "monthly-cash-flow"),
    loadRunHistory(params.slug, 8)
  ]);
  return {
    fund,
    weeklyMemo,
    monthlyCashFlow,
    runs
  };
};
export {
  entries,
  load,
  prerender
};
