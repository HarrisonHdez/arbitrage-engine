import { formatUsd } from "@/src/lib/formatters/format-usd";
import { getMarketOverview } from "../../arbitrage-engine/services/get-market-overview";
import { SectionTitle } from "@/src/components/ui/section-title";

export async function OpportunityDetails() {
  const { opportunities } = await getMarketOverview();

  const opportunity = opportunities[0];

  if (!opportunity) {
    return null;
  }
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800 bg-card p-4">
        <SectionTitle>Opportunity Details</SectionTitle>

        <div className="space-y-3 text-sm">
          <Row label="Buy Exchange" value={opportunity.buyExchange} />

          <Row label="Sell Exchange" value={opportunity.sellExchange} />

          <Row label="Volume" value={`${opportunity.volume.toFixed(4)} BTC`} />
          <Row
            label="Liquidity Score"
            value={`${opportunity.liquidityScore}/100`}
          />

          <Row label="Opportunity Score" value={`${opportunity.score}/100`} />

          <Row label="Decision" value={opportunity.decision} />
          <Row
            label="Gross Spread"
            value={formatUsd(opportunity.grossProfit)}
            positive
          />

          <Row
            label="Trading Fees"
            value={formatUsd(opportunity.fees)}
            negative
          />

          <Row
            label="Estimated Slippage"
            value={formatUsd(opportunity.slippage)}
            negative
          />
        </div>
      </div>

      <div
        className={`rounded-xl p-4 ${
          opportunity.netProfit > 0
            ? "border border-emerald-500/30 bg-emerald-500/10"
            : "border border-red-500/30 bg-red-500/10"
        }`}
      >
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Net Expected Profit
        </p>

        <p
          className={`mt-2 font-mono text-3xl font-bold ${
            opportunity.netProfit > 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {formatUsd(opportunity.netProfit)}
        </p>
      </div>

      <button
        className={`w-full rounded-lg px-4 py-3 font-semibold ${
          opportunity.decision === "EXECUTE"
            ? "bg-emerald-500 text-black"
            : "bg-zinc-700 text-slate-400"
        }`}
        type="button"
        disabled={opportunity.decision !== "EXECUTE"}
      >
        {opportunity.decision === "EXECUTE"
          ? "Execute Arbitrage"
          : "Opportunity Rejected"}
      </button>
    </div>
  );
}

type RowProps = {
  label: string;
  value: string;
  positive?: boolean;
  negative?: boolean;
};

function Row({ label, value, positive, negative }: RowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>

      <span
        className={`font-mono ${
          positive
            ? "text-emerald-400"
            : negative
              ? "text-red-400"
              : "text-slate-100"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
