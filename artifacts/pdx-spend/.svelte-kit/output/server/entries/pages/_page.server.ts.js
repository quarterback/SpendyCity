import { a as FUNDS } from "../../chunks/funds.js";
import { l as loadLatestWeeklyAcrossFunds } from "../../chunks/agent.js";
const prerender = true;
const load = async () => {
  const latestWeekly = await loadLatestWeeklyAcrossFunds(FUNDS.map((f) => f.slug));
  return { latestWeekly };
};
export {
  load,
  prerender
};
