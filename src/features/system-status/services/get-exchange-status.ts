import { getBinanceSnapshot } from "@/src/lib/exchanges/binance";
import { getKrakenSnapshot } from "@/src/lib/exchanges/kraken";
import { getOkxSnapshot } from "@/src/lib/exchanges/okx";

export async function getExchangeStatus() {
  const exchanges = [
    {
      name: "Binance",
      snapshot: getBinanceSnapshot,
    },
    {
      name: "Kraken",
      snapshot: getKrakenSnapshot,
    },
    {
      name: "OKX",
      snapshot: getOkxSnapshot,
    },
  ];

  return Promise.all(
    exchanges.map(async (exchange) => {
      try {
        await exchange.snapshot();

        return {
          name: exchange.name,
          status: "Connected" as const,
        };
      } catch {
        return {
          name: exchange.name,
          status: "Disconnected" as const,
        };
      }
    }),
  );
}
