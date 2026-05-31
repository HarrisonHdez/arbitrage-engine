import { detectArbitrage } from "./detect-arbitrage";
import { MarketSnapshot } from "@/src/lib/exchanges/types";

export function findBestOpportunity(snapshots: MarketSnapshot[]) {
  const opportunities = [];

  for (let i = 0; i < snapshots.length; i++) {
    for (let j = i + 1; j < snapshots.length; j++) {
      const opportunity = detectArbitrage(snapshots[i], snapshots[j]);

      if (opportunity) {
        opportunities.push(opportunity);
      }
    }
  }

  if (opportunities.length === 0) {
    return null;
  }

  return opportunities.sort((a, b) => b.netProfit - a.netProfit)[0];
}
