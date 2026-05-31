// Simple circuit breaker:
// trading is automatically disabled after
// 3 consecutive losing trades.
let consecutiveLosses = 0;

export function registerTrade(
  netProfit: number,
) {
  if (netProfit > 0) {
    consecutiveLosses = 0;
    return;
  }

  consecutiveLosses++;
}

export function canTrade() {
  return consecutiveLosses < 3;
}

export function getRiskStatus() {
  return {
    consecutiveLosses,
    tradingEnabled:
      consecutiveLosses < 3,
  };
}