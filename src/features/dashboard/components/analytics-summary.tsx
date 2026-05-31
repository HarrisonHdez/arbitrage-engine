import { DashboardPanel } from "@/src/components/ui/dashboard-panel";
import { getTradingPerformance } from "@/src/features/arbitrage-engine/services/get-trading-performance";
import { formatUsd } from "@/src/lib/formatters/format-usd";
import { getPortfolioSummary } from "@/src/features/wallets/services/get-portfolio-summary";
export async function AnalyticsSummary() {
  const performance = await getTradingPerformance();
  const portfolio = getPortfolioSummary();
  return (
    <DashboardPanel title="Analytics">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-zinc-800 bg-[#101821] p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Portfolio Summary
          </p>

          <div className="mt-3 space-y-3">
            <MetricRow
              label="Portfolio Value"
              value={formatUsd(portfolio.portfolioValue)}
              highlight
            />

            <MetricRow
              label="Total USD"
              value={formatUsd(portfolio.totalUsd)}
            />

            <MetricRow
              label="Total BTC"
              value={portfolio.totalBtc.toFixed(4)}
            />
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-[#101821] p-4">
          <div className="space-y-4">
            <MetricRow
              label="Net P&L"
              value={formatUsd(performance.netPnl)}
              highlight
            />

            <MetricRow label="Win Rate" value={`${performance.winRate}%`} />

            <MetricRow
              label="Trades Executed"
              value={performance.totalTrades.toString()}
            />

            <MetricRow
              label="Winning Trades"
              value={performance.winningTrades.toString()}
            />

            <MetricRow
              label="Losing Trades"
              value={performance.losingTrades.toString()}
            />

            <MetricRow
              label="Average Profit"
              value={formatUsd(performance.averageProfit)}
            />
          </div>
        </div>
      </div>
    </DashboardPanel>
  );
}

type MetricRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function MetricRow({ label, value, highlight }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <span
        className={`font-mono ${
          highlight ? "text-emerald-400" : "text-slate-100"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
