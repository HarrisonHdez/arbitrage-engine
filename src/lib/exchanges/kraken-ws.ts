import { MarketSnapshot } from "./types";
import { updateSnapshot } from "./market-cache";

type KrakenTickerMessage = {
  channel: string;
  data?: {
    bid: number;
    ask: number;
    bid_qty: number;
    ask_qty: number;
  }[];
};

let socket: WebSocket | null = null;

export function startKrakenWebSocket() {
  if (socket) {
    return;
  }

  socket = new WebSocket("wss://ws.kraken.com/v2");
  let lastMessageAt = Date.now();
  socket.onopen = () => {
    socket?.send(
      JSON.stringify({
        method: "subscribe",
        params: {
          channel: "ticker",
          symbol: ["BTC/USD"],
        },
      }),
    );
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data) as KrakenTickerMessage;

    if (message.channel !== "ticker" || !message.data?.length) {
      return;
    }
    const now = Date.now();

    const latencyMs = now - lastMessageAt;

    lastMessageAt = now;

    const ticker = message.data[0];

    const snapshot: MarketSnapshot = {
      exchange: "Kraken",
      bid: ticker.bid,
      ask: ticker.ask,
      bidSize: ticker.bid_qty,
      askSize: ticker.ask_qty,
      spread: Number((ticker.ask - ticker.bid).toFixed(2)),
      latencyMs,
      timestamp: now,
    };

    updateSnapshot(snapshot);
  };

  socket.onerror = (error) => {
    console.error("[KRAKEN ERROR]", error);
  };

  socket.onclose = () => {
    console.log("[KRAKEN] Disconnected");

    socket = null;
  };
}
