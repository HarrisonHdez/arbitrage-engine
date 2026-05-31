export type NetProfitInput = {
  buyPrice: number;
  sellPrice: number;
  volume: number;
  withdrawalFeeUsd: number;
  buyFeePercent: number;
  sellFeePercent: number;
  estimatedSlippagePercent: number;
};

export type NetProfitResult = {
  grossProfit: number;
  fees: number;
  withdrawalFee: number;
  slippage: number;
  netProfit: number;
};

export function calculateNetProfit(input: NetProfitInput): NetProfitResult {
  const withdrawalFee = input.withdrawalFeeUsd;
  const grossProfit = (input.sellPrice - input.buyPrice) * input.volume;

  const buyFee = input.buyPrice * input.volume * (input.buyFeePercent / 100);

  const sellFee = input.sellPrice * input.volume * (input.sellFeePercent / 100);

  const fees = buyFee + sellFee;

  const tradedValue = input.buyPrice * input.volume;

  const slippage = tradedValue * (input.estimatedSlippagePercent / 100);

  const netProfit = grossProfit - fees - withdrawalFee - slippage;

  return {
    grossProfit: Number(grossProfit.toFixed(2)),
    fees: Number(fees.toFixed(2)),
    slippage: Number(slippage.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    withdrawalFee: Number(withdrawalFee.toFixed(2)),
  };
}
