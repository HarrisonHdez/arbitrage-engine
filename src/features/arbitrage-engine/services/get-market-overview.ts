import { ArbitrageOpportunity } from "../types/arbitrage-opportunity";
import { findOpportunities } from "../simulator/find-opportunities";
import { getSnapshots } from "@/src/lib/exchanges/market-cache";
import { startMarketStreams } from "@/src/lib/exchanges/start-market-streams";
export async function getMarketOverview() {
  startMarketStreams();

  const snapshots = getSnapshots();

  if (snapshots.length < 2) {
    return {
      snapshots,
      opportunities: [],
      bestOpportunity: null,
    };
  }
  const opportunities: ArbitrageOpportunity[] = findOpportunities(snapshots);

  return {
    snapshots,
    opportunities,

    bestOpportunity: opportunities[0] ?? null,
  };
}
