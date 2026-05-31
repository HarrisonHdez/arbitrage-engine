import { ExchangesGrid } from "./exchanges-grid";
import { WalletBalances } from "./wallet-balances";

export function DashboardLeftColumn() {
  return (
    <div className="space-y-4">
      <ExchangesGrid />
      <WalletBalances />
    </div>
  );
}