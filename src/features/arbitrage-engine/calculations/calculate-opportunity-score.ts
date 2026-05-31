export function calculateOpportunityScore(
  netProfit: number,
  liquidityScore: number,
  latencyMs: number,
) {
  if (netProfit <= 0) {
    return 0;
  }

  const profitScore = Math.min(
    100,
    Math.round(netProfit),
  );

  const latencyScore = Math.max(
    0,
    100 - Math.round(latencyMs / 10),
  );

  return Math.round(
    profitScore * 0.6 +
    liquidityScore * 0.3 +
    latencyScore * 0.1,
  );
}