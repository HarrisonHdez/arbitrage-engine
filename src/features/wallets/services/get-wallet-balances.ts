import { getWallets } from "./wallet-store";

export function getWalletBalances() {
  return getWallets();
}