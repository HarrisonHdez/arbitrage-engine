import { formatUsd } from "@/src/lib/formatters/format-usd";
import { getTradingPerformance } from "../../arbitrage-engine/services/get-trading-performance";
import { SectionTitle } from "@/src/components/ui/section-title";

export async function SystemMetrics() {
  const performance = await getTradingPerformance();

  const rows = [
    ["Winning Trades", String(performance.winningTrades)],
    ["Losing Trades", String(performance.losingTrades)],
    ["Total Trades", String(performance.totalTrades)],
    ["Win Rate", `${performance.winRate}%`],
    ["Average Profit", formatUsd(performance.averageProfit)],
    ["Net P&L", formatUsd(performance.netPnl)],
  ];
  return (
    <div className="h-full rounded-xl border border-zinc-800 bg-card p-4">
      <SectionTitle>System Metrics</SectionTitle>

      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-slate-400">{label}</span>

            <span className="font-mono">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
