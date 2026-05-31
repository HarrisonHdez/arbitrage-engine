import { MarketSnapshot } from "./types";
import { updateSnapshot } from "./market-cache";

type OkxTickerMessage = {
  data?: {
    bidPx: string;
    askPx: string;

    bidSz: string;
    askSz: string;
  }[];
};

let socket: WebSocket | null = null;

export function startOkxWebSocket() {
  if (socket) {
    return;
  }

  socket = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");
  let lastMessageAt = Date.now();
  socket.onopen = () => {
    socket?.send(
      JSON.stringify({
        op: "subscribe",
        args: [
          {
            channel: "tickers",
            instId: "BTC-USDT",
          },
        ],
      }),
    );
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data) as OkxTickerMessage;

    if (!message.data?.length) {
      return;
    }
    const now = Date.now();

    const latencyMs = now - lastMessageAt;

    lastMessageAt = now;
    const ticker = message.data[0];

    const bid = Number(ticker.bidPx);
    const ask = Number(ticker.askPx);

    const snapshot: MarketSnapshot = {
      exchange: "OKX",
      bid,
      ask,
      bidSize: Number(ticker.bidSz),
      askSize: Number(ticker.askSz),
      spread: Number((ask - bid).toFixed(2)),
      latencyMs,
      timestamp: now,
    };

    updateSnapshot(snapshot);
  };

  socket.onerror = (error) => {
    console.error("[OKX ERROR]", error);
  };

  socket.onclose = () => {
    console.log("[OKX] Disconnected");

    socket = null;
  };
}
