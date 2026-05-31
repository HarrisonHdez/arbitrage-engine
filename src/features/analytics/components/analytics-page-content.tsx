import { PerformanceOverview } from "./performance-overview";
import { ProfitChartCard } from "./profit-chart-card";
import { SystemMetrics } from "./system-metrics";

export function AnalyticsPageContent() {
  return (
    <div className="space-y-4">
      <PerformanceOverview />

      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <ProfitChartCard />
        </div>

        <div className="md:col-span-4">
          <div className="h-full">
            <SystemMetrics />
          </div>
        </div>
      </div>
    </div>
  );
}
