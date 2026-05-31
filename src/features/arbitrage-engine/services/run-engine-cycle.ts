import { getMarketOverview } from "./get-market-overview";
import { saveOpportunity } from "./save-opportunity";
import { saveExecutedTrade } from "./save-executed-trade";
import { canTrade } from "./risk-manager";

export async function runEngineCycle() {
  const { opportunities } = await getMarketOverview();

  for (const opportunity of opportunities) {
    await saveOpportunity(opportunity);
  }

  const bestOpportunity = opportunities.find(
    (opportunity) => opportunity.decision === "EXECUTE",
  );
  if (bestOpportunity && canTrade()) {
    await saveExecutedTrade(bestOpportunity);
  }

  return {
    detected: opportunities.length,

    executed: bestOpportunity ? 1 : 0,
  };
}
