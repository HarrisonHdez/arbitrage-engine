import { DashboardPanel } from "@/src/components/ui/dashboard-panel";

import { getWalletBalances } from "@/src/features/wallets/services/get-wallet-balances";

export async function WalletBalances() {
  const wallets = getWalletBalances();
  return (
    <DashboardPanel title="Wallet Balances">
      <div className="space-y-3">
        {wallets.map((wallet) => (
          <div
            key={wallet.exchange}
            className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0"
          >
            <span>{wallet.exchange}</span>

            <div className="text-right">
              <div className="font-mono text-sm">
                <p>{wallet.btcBalance.toFixed(4)}</p>
              </div>

              <div className="font-mono text-xs text-slate-500">
                <p>{wallet.usdBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}
