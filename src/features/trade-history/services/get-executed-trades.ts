import { createClient } from "@/src/lib/supabase/server";

export async function getExecutedTrades() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("executed_trades")
    .select("*")
    .order("executed_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}