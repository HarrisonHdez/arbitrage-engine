// Trading strategy parameters:
// - maxPositionSizeBtc: maximum BTC volume the bot can use in a single arbitrage operation.
// - minimumNetProfitUsd: minimum net profit required before executing a trade.
// - minimumVolumeBtc: minimum available BTC liquidity required to consider an opportunity executable.
export const TRADING_CONFIG = {
  maxPositionSizeBtc: 0.1,
  minimumNetProfitUsd: 25,
  minimumVolumeBtc: 0.01,
};