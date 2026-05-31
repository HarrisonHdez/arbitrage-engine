import { runEngineCycle } from "@/src/features/arbitrage-engine/services/run-engine-cycle";
import { DashboardCenterColumn } from "@/src/features/dashboard/components/dashboard-center-column";
import { DashboardLayout } from "@/src/features/dashboard/components/dashboard-layout";
import { DashboardLeftColumn } from "@/src/features/dashboard/components/dashboard-left-column";
import { DashboardRightColumn } from "@/src/features/dashboard/components/dashboard-right-column";

export default async function DashboardPage() {
  await runEngineCycle();
  return (
    <DashboardLayout
      leftColumn={<DashboardLeftColumn />}
      centerColumn={<DashboardCenterColumn />}
      rightColumn={<DashboardRightColumn />}
    />
  );
}
