import { MarketSnapshot } from "@/src/lib/exchanges/types";
import { buildOpportunity } from "./build-opportunity";

export function detectArbitrage(
  exchangeA: MarketSnapshot,
  exchangeB: MarketSnapshot,
) {
  const opportunities = [];

  if (exchangeA.ask < exchangeB.bid) {
    const opportunity =
      buildOpportunity(exchangeA, exchangeB);

    if (opportunity) {
      opportunities.push(opportunity);
    }
  }

  if (exchangeB.ask < exchangeA.bid) {
    const opportunity =
      buildOpportunity(exchangeB, exchangeA);

    if (opportunity) {
      opportunities.push(opportunity);
    }
  }

  if (opportunities.length === 0) {
    return null;
  }

  return opportunities.sort(
    (a, b) => b.netProfit - a.netProfit,
  )[0];
}