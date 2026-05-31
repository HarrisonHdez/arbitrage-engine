import { formatUsd } from "@/src/lib/formatters/format-usd";
import { getTradingPerformance } from "../../arbitrage-engine/services/get-trading-performance";

export async function PerformanceOverview() {
  const performance = await getTradingPerformance();

  const metrics = [
    {
      label: "Net P&L",
      value: formatUsd(performance.netPnl),
    },
    {
      label: "Win Rate",
      value: `${performance.winRate}%`,
    },
    {
      label: "Trades Executed",
      value: String(performance.totalTrades),
    },
    {
      label: "Winning Trades",
      value: String(performance.winningTrades),
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-zinc-800 bg-card p-4"
        >
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {metric.label}
          </p>

          <p className="mt-3 font-mono text-2xl font-semibold">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}
