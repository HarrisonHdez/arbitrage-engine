import { createClient } from "@/src/lib/supabase/server";
import { ArbitrageOpportunity } from "../types/arbitrage-opportunity";

export async function saveOpportunity(opportunity: ArbitrageOpportunity) {
  const supabase = await createClient();

  const { error } = await supabase.from("opportunities").insert({
    buy_exchange: opportunity.buyExchange,
    sell_exchange: opportunity.sellExchange,

    buy_price: opportunity.buyPrice,
    sell_price: opportunity.sellPrice,
    volume: opportunity.volume,
    withdrawal_fee: opportunity.withdrawalFee,

    gross_profit: opportunity.grossProfit,

    fees: opportunity.fees,
    slippage: opportunity.slippage,

    net_profit: opportunity.netProfit,

    score: opportunity.score,
    liquidity_score: opportunity.liquidityScore,

    decision: opportunity.decision,
  });

  if (error) {
    throw error;
  }
}
