import { MarketSnapshot } from "./types";

type KrakenResponse = {
  result: {
    XXBTZUSD: {
      a: string[];
      b: string[];
    };
  };
};

export async function getKrakenSnapshot(): Promise<MarketSnapshot> {
  const response = await fetch(
    "https://api.kraken.com/0/public/Ticker?pair=XBTUSD",
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Kraken data");
  }

  const data = (await response.json()) as KrakenResponse;

  const ask = Number(data.result.XXBTZUSD.a[0]);

  const bid = Number(data.result.XXBTZUSD.b[0]);

  return {
    exchange: "Kraken",
    bid,
    ask,
    bidSize: 0,
    askSize: 0,
    spread: Number((ask - bid).toFixed(2)),
    latencyMs: 0,
    timestamp: Date.now(),
  };
}
