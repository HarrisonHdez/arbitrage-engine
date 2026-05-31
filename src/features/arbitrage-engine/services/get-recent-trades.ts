import { createClient } from "@/src/lib/supabase/server";

export async function getRecentTrades() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("executed_trades")
    .select(`
      id,
      buy_exchange,
      sell_exchange,
      net_profit,
      executed_at
    `)
    .order("executed_at", {
      ascending: false,
    })
    .limit(10);

  if (error) {
    throw error;
  }

  return data;
}