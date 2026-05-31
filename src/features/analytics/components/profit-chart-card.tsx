import { SectionTitle } from "@/src/components/ui/section-title";
import { getProfitHistory } from "../services/get-profit-history";
import { ProfitChart } from "./profit-chart";

export async function ProfitChartCard() {
  const profitHistory = await getProfitHistory();

  return (
    <div className="rounded-xl border border-zinc-800 bg-card p-4">
      <SectionTitle>Profit Performance</SectionTitle>

      <div className="h-72 rounded-lg border border-zinc-800 bg-[#101821] p-4">
        <ProfitChart data={profitHistory} />
      </div>
    </div>
  );
}
