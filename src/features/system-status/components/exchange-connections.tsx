import { SectionTitle } from "@/src/components/ui/section-title";
import { getExchangeStatus } from "../services/get-exchange-status";

export async function ExchangeConnections() {
  const exchanges = await getExchangeStatus();
  return (
    <div className="rounded-xl border border-zinc-800 bg-card p-4">
      <SectionTitle>Exchange Connections</SectionTitle>

      <div className="space-y-3">
        {exchanges.map((exchange) => (
          <div
            key={exchange.name}
            className="flex items-center justify-between rounded-lg border border-zinc-800 bg-[#101821] p-3"
          >
            <span>{exchange.name}</span>

            <div className="text-right">
              <p
                className={
                  exchange.status === "Connected"
                    ? "text-emerald-400"
                    : "text-red-400"
                }
              >
                {exchange.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
