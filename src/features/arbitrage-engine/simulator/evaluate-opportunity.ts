import { TRADING_CONFIG } from "@/src/config/trading";

type OpportunityDecision = "EXECUTE" | "REJECT";

export function evaluateOpportunity(
  netProfit: number,
  liquidityScore: number,
): {
  decision: OpportunityDecision;
} {
  const profitable = netProfit >= TRADING_CONFIG.minimumNetProfitUsd;

  const liquid = liquidityScore >= 50;

  return {
    decision: profitable && liquid ? "EXECUTE" : "REJECT",
  };
}
