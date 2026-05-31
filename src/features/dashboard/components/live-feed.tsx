import { DashboardPanel } from "@/src/components/ui/dashboard-panel";
import { getRecentOpportunities } from "@/src/features/arbitrage-engine/services/get-recent-opportunities";
import { formatUsd } from "@/src/lib/formatters/format-usd";
import { HiArrowLongRight } from "react-icons/hi2";

export async function LiveFeed() {
  const opportunities = await getRecentOpportunities();
  return (
    <DashboardPanel title="Live Feed">
      <div className="space-y-2">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="rounded-lg border border-zinc-800 bg-[#101821] p-3"
          >
            <p className="text-[10px] text-slate-500">
              {new Date(opportunity.created_at).toLocaleString()}
            </p>

            <p className="mt-1 flex items-center gap-1 text-sm text-slate-300">
              <span>Spread detected:</span>
              <span>{opportunity.buy_exchange}</span>
              <HiArrowLongRight className="text-slate-500 mx-1" />
              <span>{opportunity.sell_exchange}</span>
            </p>
            <p
              className={`mt-1 font-mono text-xs ${
                opportunity.decision === "EXECUTE"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {formatUsd(Number(opportunity.net_profit))}
            </p>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}
