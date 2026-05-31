import { createClient } from "@/src/lib/supabase/server";

export async function getProfitHistory() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("executed_trades")
    .select(
      `
      executed_at,
      net_profit
    `
    )
    .order("executed_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  let cumulativeProfit = 0;

  return data.map((trade) => {
    cumulativeProfit += Number(
      trade.net_profit
    );

    return {
      executedAt: trade.executed_at,
      cumulativeProfit: Number(
        cumulativeProfit.toFixed(2)
      ),
    };
  });
}