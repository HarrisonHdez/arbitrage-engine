import { MarketSnapshot } from "./types";

type BinanceBookTickerResponse = {
  bidPrice: string;
  askPrice: string;
};

export async function getBinanceSnapshot(): Promise<MarketSnapshot> {
  const response = await fetch(
    "https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT",
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Binance data");
  }

  const data = (await response.json()) as BinanceBookTickerResponse;

  const bid = Number(data.bidPrice);
  const ask = Number(data.askPrice);

  return {
    exchange: "Binance",
    bid,
    ask,
    bidSize: 0,
    askSize: 0,
    spread: Number((ask - bid).toFixed(2)),
    latencyMs: 0,
    timestamp: Date.now(),
  };
}
