export function calculateLatencyCost(
  latencyMs: number,
) {
  if (latencyMs <= 100) {
    return 0;
  }

  if (latencyMs <= 300) {
    return 1;
  }

  if (latencyMs <= 500) {
    return 3;
  }

  return 5;
}