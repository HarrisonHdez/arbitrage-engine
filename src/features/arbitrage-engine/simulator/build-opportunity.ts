import { MarketSnapshot } from "@/src/lib/exchanges/types";
import { calculateNetProfit } from "../calculations/calculate-net-profit";
import { evaluateOpportunity } from "./evaluate-opportunity";
import { getExchangeFee } from "../services/get-exchange-fee";
import { calculateOpportunityScore } from "../calculations/calculate-opportunity-score";
import { ArbitrageOpportunity } from "../types/arbitrage-opportunity";
import { calculateLiquidityScore } from "../calculations/calculate-liquidity-score";
import { calculateSlippagePercent } from "../calculations/calculate-slippage-percent";
import { TRADING_CONFIG } from "@/src/config/trading";
import { getWithdrawalFee } from "../services/get-withdrawal-fee";
export function buildOpportunity(
  buyExchange: MarketSnapshot,
  sellExchange: MarketSnapshot,
): ArbitrageOpportunity | null {
  const volume = Math.min(
    TRADING_CONFIG.maxPositionSizeBtc,
    buyExchange.askSize,
    sellExchange.bidSize,
  );

  if (volume < TRADING_CONFIG.minimumVolumeBtc) {
    return null;
  }

  const availableLiquidity = Math.min(
    buyExchange.askSize,
    sellExchange.bidSize,
  );
  const slippagePercent = calculateSlippagePercent(volume, availableLiquidity);

  const result = calculateNetProfit({
    buyPrice: buyExchange.ask,
    sellPrice: sellExchange.bid,

    volume,

    withdrawalFeeUsd: getWithdrawalFee(buyExchange.exchange),

    buyFeePercent: getExchangeFee(buyExchange.exchange),

    sellFeePercent: getExchangeFee(sellExchange.exchange),

    estimatedSlippagePercent: slippagePercent,
  });

  const liquidityScore = calculateLiquidityScore(
    buyExchange.askSize,
    sellExchange.bidSize,
    TRADING_CONFIG.maxPositionSizeBtc,
  );

  const evaluation = evaluateOpportunity(result.netProfit, liquidityScore);
  const latencyMs = Math.max(buyExchange.latencyMs, sellExchange.latencyMs);

  const score = calculateOpportunityScore(
    result.netProfit,
    liquidityScore,
    latencyMs,
  );
  return {
    buyExchange: buyExchange.exchange,
    sellExchange: sellExchange.exchange,

    buyPrice: buyExchange.ask,
    sellPrice: sellExchange.bid,
    volume,

    grossProfit: result.grossProfit,
    fees: result.fees,
    withdrawalFee: result.withdrawalFee,
    slippage: result.slippage,

    netProfit: result.netProfit,
    score,
    liquidityScore,
    decision: evaluation.decision,
  };
}
