import { error } from "@sveltejs/kit";
import { F as FUNDS, d as FUND_BY_SLUG } from "../../../../chunks/funds.js";
const prerender = true;
const entries = () => {
  return FUNDS.map((f) => ({ slug: f.slug }));
};
const load = ({ params }) => {
  const fund = FUND_BY_SLUG[params.slug];
  if (!fund) throw error(404, "Fund not found");
  return { fund };
};
export {
  entries,
  load,
  prerender
};
