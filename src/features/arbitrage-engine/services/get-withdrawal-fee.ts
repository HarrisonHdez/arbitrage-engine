import { EXCHANGES } from "@/src/config/exchanges";

export function getWithdrawalFee(
  exchange: string,
): number {
  const config =
    EXCHANGES[
      exchange as keyof typeof EXCHANGES
    ];

  if (!config) {
    return 0;
  }

  return config.withdrawalFeeUsd;
}