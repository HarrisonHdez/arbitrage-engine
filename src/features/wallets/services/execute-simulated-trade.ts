import { ArbitrageOpportunity } from "@/src/features/arbitrage-engine/types/arbitrage-opportunity";
import { getWallet, updateWallet } from "./wallet-store";

export function executeSimulatedTrade(opportunity: ArbitrageOpportunity) {
  const buyWallet = getWallet(opportunity.buyExchange);

  const sellWallet = getWallet(opportunity.sellExchange);

  if (!buyWallet || !sellWallet) {
    throw new Error("Wallet not found");
  }

  const volume = opportunity.volume;

  const buyCost = opportunity.buyPrice * volume;

  const sellRevenue = opportunity.sellPrice * volume;

  buyWallet.usdBalance -= buyCost;
  buyWallet.btcBalance += volume;

  sellWallet.usdBalance += sellRevenue;
  sellWallet.btcBalance -= volume;

  updateWallet(buyWallet);
  updateWallet(sellWallet);
}
