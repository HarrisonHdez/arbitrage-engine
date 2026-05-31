import { HiArrowLongRight } from "react-icons/hi2";
import { getExecutedTrades } from "../services/get-executed-trades";
import { formatUsd } from "@/src/lib/formatters/format-usd";
export async function TradeHistoryTable() {
  const trades = await getExecutedTrades();
  return (
    <div className="rounded-xl border border-zinc-800 bg-card">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-sm font-semibold">Trade History</h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="p-3 text-left text-xs text-slate-500">Time</th>

            <th className="p-3 text-left text-xs text-slate-500">Route</th>

            <th className="p-3 text-left text-xs text-slate-500">Buy Price</th>

            <th className="p-3 text-left text-xs text-slate-500">Sell Price</th>

            <th className="p-3 text-left text-xs text-slate-500">Net Profit</th>

            <th className="p-3 text-left text-xs text-slate-500">Score</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade) => (
            <tr
              key={trade.id}
              className="border-b border-zinc-800 hover:bg-[#101821]"
            >
              <td className="p-3 font-mono">
                {new Date(trade.executed_at).toLocaleTimeString()}
              </td>

              <td className="p-3">
                <div className="flex items-center gap-1">
                  <span>{trade.buy_exchange}</span>
                  <HiArrowLongRight className="text-slate-500" />
                  <span>{trade.sell_exchange}</span>
                </div>
              </td>

              <td className="p-3 font-mono">
                {formatUsd(Number(trade.buy_price))}
              </td>

              <td className="p-3 font-mono">
                {formatUsd(Number(trade.sell_price))}
              </td>

              <td
                className={`p-3 font-mono ${
                  Number(trade.net_profit) > 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {formatUsd(Number(trade.net_profit))}
              </td>

              <td className="p-3 font-mono">{trade.score}/100</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
