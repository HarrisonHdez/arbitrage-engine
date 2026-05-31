import { HiArrowRight } from "react-icons/hi";
import { getMarketOverview } from "../../arbitrage-engine/services/get-market-overview";

export async function BestOpportunityCard() {
  const { bestOpportunity } = await getMarketOverview();

  if (!bestOpportunity) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-card p-6">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Best Arbitrage Opportunity
        </p>

        <h2 className="mt-4 text-xl font-semibold text-slate-100">
          No executable opportunities
        </h2>

        <p className="mt-2 text-slate-400">
          The engine is monitoring Binance, Kraken and OKX in real time and is
          waiting for a profitable arbitrage opportunity.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-card p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Best Arbitrage Opportunity
        </p>

        <h2 className="mt-2 flex items-center gap-2 text-2xl font-semibold text-slate-100">
          <span>{bestOpportunity.buyExchange}</span>

          <HiArrowRight className="text-slate-500" />

          <span>{bestOpportunity.sellExchange}</span>
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <p className="text-xs text-slate-500">Buy Exchange</p>

          <p className="mt-1 text-lg font-medium">
            {bestOpportunity.buyExchange}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Sell Exchange</p>

          <p className="mt-1 text-lg font-medium">
            {bestOpportunity.sellExchange}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Net Profit</p>

          <p
            className={`mt-1 font-mono text-3xl font-bold ${
              bestOpportunity.netProfit > 0
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            ${bestOpportunity.netProfit}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        <MetricCard
          label="Volume"
          value={`${bestOpportunity.volume.toFixed(4)} BTC`}
        />
        <MetricCard
          label="Opportunity Score"
          value={`${bestOpportunity.score}/100`}
        />

        <MetricCard
          label="Liquidity Score"
          value={`${bestOpportunity.liquidityScore}/100`}
        />

        <MetricCard label="Fees" value={`$${bestOpportunity.fees}`} />

        <MetricCard label="Slippage" value={`$${bestOpportunity.slippage}`} />
      </div>

      <div
        className={`mt-6 flex items-center justify-between rounded-lg px-4 py-3 ${
          bestOpportunity.decision === "EXECUTE"
            ? "border border-emerald-500/20 bg-emerald-500/10"
            : "border border-red-500/20 bg-red-500/10"
        }`}
      >
        <span
          className={`text-sm ${
            bestOpportunity.decision === "EXECUTE"
              ? "text-emerald-300"
              : "text-red-300"
          }`}
        >
          Engine Decision
        </span>

        <span
          className={`font-mono text-sm ${
            bestOpportunity.decision === "EXECUTE"
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {bestOpportunity.decision}
        </span>
      </div>
    </section>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
};

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-[#101821] p-4">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-2 font-mono text-xl font-semibold">{value}</p>
    </div>
  );
}
