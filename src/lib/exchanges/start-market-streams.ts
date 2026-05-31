import { startBinanceWebSocket } from "./binance-ws";
import { startKrakenWebSocket } from "./kraken-ws";
import { startOkxWebSocket } from "./okx-ws";

let started = false;

export function startMarketStreams() {
  if (started) {
    return;
  }

  started = true;

  startBinanceWebSocket();
  startKrakenWebSocket();
  startOkxWebSocket();
}