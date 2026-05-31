import { createClient } from "@/src/lib/supabase/server";

export async function getSystemEvents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("opportunities")
    .select(`
      buy_exchange,
      sell_exchange,
      net_profit,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(10);

  if (error) {
    throw error;
  }

  return data;
}