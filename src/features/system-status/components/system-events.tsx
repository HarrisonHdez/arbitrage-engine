import { HiArrowRight } from "react-icons/hi";
import { getSystemEvents } from "../services/get-system-events";
import { formatUsd } from "@/src/lib/formatters/format-usd";
import { SectionTitle } from "@/src/components/ui/section-title";

export async function SystemEvents() {
  const events = await getSystemEvents();

  return (
    <div className="rounded-xl border border-zinc-800 bg-card p-4">
      <SectionTitle>System Events</SectionTitle>

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.created_at}
            className="rounded border border-zinc-800 bg-[#101821] p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-100">
                <span>{event.buy_exchange}</span>

                <HiArrowRight size={14} className="text-slate-500" />

                <span>{event.sell_exchange}</span>
              </div>

              <p
                className={`text-sm font-mono ${
                  Number(event.net_profit) > 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {formatUsd(Number(event.net_profit))}
              </p>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {new Date(event.created_at).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
