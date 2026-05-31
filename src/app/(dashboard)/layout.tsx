import { AppHeader } from "@/src/components/layout/app-header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#070b10] text-slate-100">
      <AppHeader />

      <main className="p-4">
        {children}
      </main>
    </div>
  );
}