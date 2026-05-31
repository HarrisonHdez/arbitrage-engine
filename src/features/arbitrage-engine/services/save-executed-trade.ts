import { createClient } from "@/src/lib/supabase/server";
import { ArbitrageOpportunity } from "../types/arbitrage-opportunity";
import { executeSimulatedTrade } from "@/src/features/wallets/services/execute-simulated-trade";
import { validateTrade } from "@/src/features/wallets/services/validate-trade";
import { registerTrade } from "./risk-manager";

export async function saveExecutedTrade(opportunity: ArbitrageOpportunity) {
  if (!validateTrade(opportunity)) {
    return;
  }

  executeSimulatedTrade(opportunity);

  registerTrade(opportunity.netProfit);

  console.log("EXECUTED VOLUME:", opportunity.volume);

  const supabase = await createClient();

  const { error } = await supabase.from("executed_trades").insert({
    buy_exchange: opportunity.buyExchange,
    sell_exchange: opportunity.sellExchange,

    buy_price: opportunity.buyPrice,
    sell_price: opportunity.sellPrice,

    volume: opportunity.volume,

    gross_profit: opportunity.grossProfit,

    fees: opportunity.fees,
    slippage: opportunity.slippage,

    net_profit: opportunity.netProfit,

    score: opportunity.score,
  });

  if (error) {
    throw error;
  }
}
