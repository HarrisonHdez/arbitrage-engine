import { ReactNode } from "react";

type Props = {
  leftColumn: ReactNode;
  centerColumn: ReactNode;
  rightColumn: ReactNode;
};

export function DashboardLayout({
  leftColumn,
  centerColumn,
  rightColumn,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-12">
      <div className="md:col-span-3">
        {leftColumn}
      </div>

      <div className="md:col-span-6">
        {centerColumn}
      </div>

      <div className="md:col-span-3">
        {rightColumn}
      </div>
    </div>
  );
}