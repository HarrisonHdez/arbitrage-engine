import { getWallets } from "./wallet-store";

const BTC_PRICE = 73000;

export function getPortfolioSummary() {
  const wallets = getWallets();

  let totalUsd = 0;
  let totalBtc = 0;

  for (const wallet of wallets) {
    totalUsd += wallet.usdBalance;
    totalBtc += wallet.btcBalance;
  }

  const portfolioValue =
    totalUsd +
    totalBtc * BTC_PRICE;

  return {
    totalUsd: Number(
      totalUsd.toFixed(2),
    ),

    totalBtc: Number(
      totalBtc.toFixed(8),
    ),

    portfolioValue: Number(
      portfolioValue.toFixed(2),
    ),
  };
}