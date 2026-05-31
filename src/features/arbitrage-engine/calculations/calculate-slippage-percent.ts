export function calculateSlippagePercent(
  volume: number,
  availableLiquidity: number,
) {
  const ratio = volume / availableLiquidity;

  if (ratio <= 0.1) {
    return 0.01;
  }

  if (ratio <= 0.25) {
    return 0.03;
  }

  if (ratio <= 0.5) {
    return 0.05;
  }

  return 0.1;
}
