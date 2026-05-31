import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function DashboardPanel({ title, children }: Props) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-card p-5">
      <div className="mb-4 border-b border-zinc-800 pb-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}
