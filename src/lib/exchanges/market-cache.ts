import { MarketSnapshot } from "./types";

const snapshots = new Map<
  string,
  MarketSnapshot
>();

export function updateSnapshot(
  snapshot: MarketSnapshot
) {
  snapshots.set(
    snapshot.exchange,
    snapshot
  );
}

export function getSnapshots() {
  return Array.from(
    snapshots.values()
  );
}

export function getSnapshot(
  exchange: string
) {
  return snapshots.get(exchange);
}