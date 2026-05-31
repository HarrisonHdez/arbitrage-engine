import { MarketSnapshot } from "./types";

type OkxResponse = {
  data: {
    bidPx: string;
    askPx: string;
  }[];
};

export async function getOkxSnapshot(): Promise<MarketSnapshot> {
  const response = await fetch(
    "https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT",
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch OKX data");
  }

  const data = (await response.json()) as OkxResponse;

  const ticker = data.data[0];

  const bid = Number(ticker.bidPx);
  const ask = Number(ticker.askPx);

  return {
    exchange: "OKX",
    bid,
    ask,

    bidSize: 0,
    askSize: 0,

    spread: Number((ask - bid).toFixed(2)),

    latencyMs: 0,

    timestamp: Date.now(),
  };
}
