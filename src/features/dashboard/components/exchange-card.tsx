import { formatUsd } from "@/src/lib/formatters/format-usd";
import { Exchange } from "../types/exchange";

type Props = {
  exchange: Exchange;
};

export function ExchangeCard({ exchange }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-100">{exchange.name}</h3>

        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              exchange.status === "connected" ? "bg-emerald-500" : "bg-red-500"
            }`}
          />

          <span className="text-xs text-slate-400">{exchange.status}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-slate-500">BTC PRICE</p>

          <p className="font-mono text-2xl font-semibold">
            {formatUsd(exchange.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500">ASK</p>

            <p className="font-mono text-sm">{formatUsd(exchange.ask)}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500">BID</p>

            <p className="font-mono text-sm">{formatUsd(exchange.bid)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500">LATENCY</p>

            <p className="font-mono text-sm">{exchange.latency}ms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
