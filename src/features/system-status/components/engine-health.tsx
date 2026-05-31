import { SectionTitle } from "@/src/components/ui/section-title";
import { getRiskStatus } from "@/src/features/arbitrage-engine/services/risk-manager";

export function EngineHealth() {
  const risk = getRiskStatus();

  const metrics = [
    ["Consecutive Losses", String(risk.consecutiveLosses)],
    ["Circuit Breaker", risk.tradingEnabled ? "Inactive" : "Active"],
    ["Trading Mode", "Simulation"],
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-card p-4">
      <SectionTitle>Engine Health</SectionTitle>

      <div className="space-y-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-slate-400">{label}</span>

            <span className="font-mono">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
