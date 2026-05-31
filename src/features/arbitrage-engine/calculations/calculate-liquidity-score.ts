export function calculateLiquidityScore(
  buyLiquidity: number,
  sellLiquidity: number,
  requiredVolume: number,
) {
  const availableLiquidity = Math.min(buyLiquidity, sellLiquidity);

  const ratio = availableLiquidity / requiredVolume;

  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
}
