export type MarketSnapshot = {
  exchange: string;
  bid: number;
  bidSize: number;
  ask: number;
  askSize: number;
  spread: number;
  latencyMs: number;
  timestamp: number;
};
