import { AnalyticsSummary } from "./analytics-summary";
import { BestOpportunityCard } from "./best-opportunity-card";
import { RecentTrades } from "./recent-trades";

export function DashboardCenterColumn() {
  return (
    <div className="space-y-4">
      <BestOpportunityCard />
      <AnalyticsSummary />
      <RecentTrades />
    </div>
  );
}