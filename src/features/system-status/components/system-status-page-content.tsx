import { EngineHealth } from "./engine-health";
import { ExchangeConnections } from "./exchange-connections";
import { SystemEvents } from "./system-events";

export function SystemStatusPageContent() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <EngineHealth />
        <ExchangeConnections />
      </div>

      <SystemEvents />
    </div>
  );
}
