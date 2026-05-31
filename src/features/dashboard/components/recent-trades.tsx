import { DashboardPanel } from "@/src/components/ui/dashboard-panel";
import { getRecentTrades } from "@/src/features/arbitrage-engine/services/get-recent-trades";
import { formatUsd } from "@/src/lib/formatters/format-usd";
import { HiArrowLongRight } from "react-icons/hi2";

export async function RecentTrades() {
  const trades = await getRecentTrades();
  return (
    <DashboardPanel title="Recent Trades">
      <div className="space-y-2">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between rounded-lg border border-zinc-800 bg-[#101821] p-3"
          >
            <div>
              <p className="flex items-center gap-1 text-sm">
                <span>{trade.buy_exchange}</span>
                <HiArrowLongRight className="text-slate-500" />
                <span>{trade.sell_exchange}</span>
              </p>

              <p className="text-xs text-slate-500">
                {new Date(trade.executed_at).toLocaleString()}
              </p>
            </div>

            <span
              className={`font-mono ${
                Number(trade.net_profit) < 0
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {formatUsd(Number(trade.net_profit))}
            </span>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}
