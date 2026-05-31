import { getOpportunities } from "../services/get-opportunities";
import { formatUsd } from "@/src/lib/formatters/format-usd";
export async function OpportunitiesTable() {
  const opportunities = await getOpportunities();
  return (
    <div className="rounded-xl border border-zinc-800 bg-card">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-sm font-semibold text-slate-100">
          Live Arbitrage Opportunities
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-left">
              <th className="p-3 text-xs uppercase text-slate-500">
                Timestamp
              </th>

              <th className="p-3 text-xs uppercase text-slate-500">Buy</th>

              <th className="p-3 text-xs uppercase text-slate-500">Sell</th>

              <th className="p-3 text-xs uppercase text-slate-500">
                Buy Price
              </th>

              <th className="p-3 text-xs uppercase text-slate-500">
                Sell Price
              </th>

              <th className="p-3 text-xs uppercase text-slate-500">Volume</th>

              <th className="p-3 text-xs uppercase text-slate-500">Gross</th>

              <th className="p-3 text-xs uppercase text-slate-500">Fees</th>

              <th className="p-3 text-xs uppercase text-slate-500">
                Net Profit
              </th>

              <th className="p-3 text-xs uppercase text-slate-500">Score</th>

              <th className="p-3 text-xs uppercase text-slate-500">Decision</th>
            </tr>
          </thead>

          <tbody>
            {opportunities.map((opportunity) => (
              <tr
                key={opportunity.id}
                className="border-b border-zinc-800 hover:bg-[#101821]"
              >
                <td className="p-3 font-mono text-sm">
                  {new Date(opportunity.created_at).toLocaleTimeString()}
                </td>

                <td className="p-3 text-sm">{opportunity.buy_exchange}</td>

                <td className="p-3 text-sm">{opportunity.sell_exchange}</td>

                <td className="p-3 font-mono text-sm">
                  {formatUsd(Number(opportunity.buy_price))}
                </td>

                <td className="p-3 font-mono text-sm">
                  {formatUsd(Number(opportunity.sell_price))}
                </td>
                <td className="p-3 font-mono text-sm">
                  {Number(opportunity.volume).toFixed(4)} BTC
                </td>

                <td className="p-3 font-mono text-emerald-400">
                  {formatUsd(Number(opportunity.gross_profit))}
                </td>

                <td className="p-3 font-mono text-red-400">
                  {formatUsd(Number(opportunity.fees))}
                </td>

                <td
                  className={`p-3 font-mono ${
                    Number(opportunity.net_profit) > 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {formatUsd(Number(opportunity.net_profit))}
                </td>

                <td className="p-3 font-mono text-sm">
                  {opportunity.score}/100
                </td>

                <td className="p-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      opportunity.decision === "EXECUTE"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {opportunity.decision}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
