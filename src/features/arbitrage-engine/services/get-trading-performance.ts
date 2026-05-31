import { createClient } from "@/src/lib/supabase/server";

export async function getTradingPerformance() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("executed_trades")
    .select("net_profit");

  if (error) {
    throw error;
  }

  const totalTrades = data.length;

  const netPnl = data.reduce((sum, trade) => sum + Number(trade.net_profit), 0);

  const winningTrades = data.filter(
    (trade) => Number(trade.net_profit) > 0,
  ).length;

  const losingTrades = data.filter(
    (trade) => Number(trade.net_profit) <= 0,
  ).length;

  const winRate = totalTrades === 0 ? 0 : (winningTrades / totalTrades) * 100;

  const averageProfit = totalTrades === 0 ? 0 : netPnl / totalTrades;

  return {
    totalTrades,
    netPnl: Number(netPnl.toFixed(2)),
    winningTrades,
    losingTrades,
    winRate: Number(winRate.toFixed(2)),
    averageProfit: Number(averageProfit.toFixed(2)),
  };
}
