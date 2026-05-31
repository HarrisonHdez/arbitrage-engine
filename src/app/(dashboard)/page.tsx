import { DashboardCenterColumn } from "@/src/features/dashboard/components/dashboard-center-column";
import { DashboardLayout } from "@/src/features/dashboard/components/dashboard-layout";
import { DashboardLeftColumn } from "@/src/features/dashboard/components/dashboard-left-column";
import { DashboardRightColumn } from "@/src/features/dashboard/components/dashboard-right-column";

export default function DashboardPage() {
  return (
    <DashboardLayout
      leftColumn={<DashboardLeftColumn />}
      centerColumn={<DashboardCenterColumn />}
      rightColumn={<DashboardRightColumn />}
    />
  );
}
