export type NetProfitInput = {
  buyPrice: number;
  sellPrice: number;
  volume: number;
  buyFeePercent: number;
  sellFeePercent: number;
  estimatedSlippagePercent: number;
};

export type NetProfitResult = {
  grossProfit: number;
  fees: number;
  slippage: number;
  netProfit: number;
};

export function calculateNetProfit(input: NetProfitInput): NetProfitResult {
  const grossProfit = (input.sellPrice - input.buyPrice) * input.volume;

  const buyFee = input.buyPrice * input.volume * (input.buyFeePercent / 100);

  const sellFee = input.sellPrice * input.volume * (input.sellFeePercent / 100);

  const fees = buyFee + sellFee;

  const tradedValue = input.buyPrice * input.volume;

  const slippage = tradedValue * (input.estimatedSlippagePercent / 100);

  const netProfit = grossProfit - fees - slippage;

  return {
    grossProfit: Number(grossProfit.toFixed(2)),
    fees: Number(fees.toFixed(2)),
    slippage: Number(slippage.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
  };
}
