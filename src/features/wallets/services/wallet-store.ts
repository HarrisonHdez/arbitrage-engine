import { Wallet } from "../types/wallet";

const wallets = new Map<string, Wallet>();

wallets.set("Binance", {
  exchange: "Binance",
  usdBalance: 100000,
  btcBalance: 1,
});

wallets.set("Kraken", {
  exchange: "Kraken",
  usdBalance: 100000,
  btcBalance: 1,
});

wallets.set("OKX", {
  exchange: "OKX",
  usdBalance: 100000,
  btcBalance: 1,
});

export function getWallet(exchange: string) {
  return wallets.get(exchange);
}

export function getWallets() {
  return Array.from(wallets.values());
}

export function updateWallet(wallet: Wallet) {
  wallets.set(wallet.exchange, wallet);
}