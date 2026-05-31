import { EXCHANGES } from "@/src/config/exchanges";

export function getExchangeFee(
  exchange: string
): number {
  const config =
    EXCHANGES[
      exchange as keyof typeof EXCHANGES
    ];

  if (!config) {
    return 0.1;
  }

  return config.tradingFeePercent;
}