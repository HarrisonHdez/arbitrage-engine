import { detectArbitrage } from "./detect-arbitrage";
import { MarketSnapshot } from "@/src/lib/exchanges/types";
import { ArbitrageOpportunity } from "../types/arbitrage-opportunity";

export function findOpportunities(
  snapshots: MarketSnapshot[],
): ArbitrageOpportunity[] {
  const opportunities = [];

  for (let i = 0; i < snapshots.length; i++) {
    for (let j = i + 1; j < snapshots.length; j++) {
      const opportunity = detectArbitrage(snapshots[i], snapshots[j]);

      if (opportunity) {
        opportunities.push(opportunity);
      }
    }
  }

  return opportunities.sort((a, b) => b.netProfit - a.netProfit);
}
