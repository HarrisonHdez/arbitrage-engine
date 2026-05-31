export type ArbitrageOpportunity = {
  buyExchange: string;
  sellExchange: string;

  buyPrice: number;
  sellPrice: number;

  volume: number;

  grossProfit: number;
  fees: number;
  slippage: number;

  netProfit: number;

  score: number;
  liquidityScore: number;

  decision: "EXECUTE" | "REJECT";
};
