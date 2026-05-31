import { MarketSnapshot } from "./types";
import { updateSnapshot } from "./market-cache";

type BinanceBookTickerMessage = {
  b: string;
  a: string;

  B: string;
  A: string;
};

let socket: WebSocket | null = null;

export function startBinanceWebSocket() {
  if (socket) {
    return;
  }
  socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@bookTicker");

  let lastMessageAt = Date.now();

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data) as BinanceBookTickerMessage;

    const bid = Number(data.b);
    const ask = Number(data.a);

    const now = Date.now();

    const latencyMs = now - lastMessageAt;

    lastMessageAt = now;
    const snapshot: MarketSnapshot = {
      exchange: "Binance",
      bid,
      ask,
      bidSize: Number(data.B),
      askSize: Number(data.A),
      spread: Number((ask - bid).toFixed(2)),
      latencyMs,
      timestamp: now,
    };

    updateSnapshot(snapshot);
  };

  socket.onerror = (error) => {
    console.error(error);
  };

  socket.onclose = () => {
    socket = null;
  };
}
