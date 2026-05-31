import { getEngineStatus } from "../../arbitrage-engine/services/get-risk-status";

export async function OpportunitiesSidebar() {
  const engine = await getEngineStatus();

  return (
    <aside className="space-y-4">
      <SidebarItem
        title="Risk Status"
        value={engine.tradingEnabled ? "NORMAL" : "CIRCUIT BREAKER"}
      />

      <SidebarItem
        title="Consecutive Losses"
        value={String(engine.consecutiveLosses)}
      />

      <SidebarItem title="Strategy" value="Cross-Exchange" />
    </aside>
  );
}

type SidebarItemProps = {
  title: string;
  value: string;
};

function SidebarItem({ title, value }: SidebarItemProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>

      <p className="mt-2 text-sm text-slate-100">{value}</p>
    </div>
  );
}
