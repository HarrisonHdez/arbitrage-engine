import { ArbitrageOpportunity } from "@/src/features/arbitrage-engine/types/arbitrage-opportunity";
import { getWallet } from "./wallet-store";

export function validateTrade(
  opportunity: ArbitrageOpportunity,
) {
  const buyWallet = getWallet(
    opportunity.buyExchange,
  );

  const sellWallet = getWallet(
    opportunity.sellExchange,
  );

  if (!buyWallet || !sellWallet) {
    return false;
  }

  const buyCost =
    opportunity.buyPrice *
    opportunity.volume;

  const hasEnoughUsd =
    buyWallet.usdBalance >= buyCost;

  const hasEnoughBtc =
    sellWallet.btcBalance >=
    opportunity.volume;

  return (
    hasEnoughUsd &&
    hasEnoughBtc
  );
}