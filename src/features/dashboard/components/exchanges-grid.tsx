import { getMarketOverview } from "../../arbitrage-engine/services/get-market-overview";
import { Exchange } from "../types/exchange";
import { ExchangeCard } from "./exchange-card";

export async function ExchangesGrid() {
  const { snapshots } =
    await getMarketOverview();

const exchanges: Exchange[] =
  snapshots.map((snapshot) => ({
    name: snapshot.exchange,

    price: snapshot.bid,

    ask: snapshot.ask,

    bid: snapshot.bid,


    status: "connected",

    latency: snapshot.latencyMs,
  }));

  return (
    <div className="space-y-4">
      {exchanges.map((exchange) => (
        <ExchangeCard
          key={exchange.name}
          exchange={exchange}
        />
      ))}
    </div>
  );
}