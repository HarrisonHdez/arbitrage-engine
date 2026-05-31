import { getRiskStatus } from "../services/risk-manager";

export async function getEngineStatus() {
  const risk = getRiskStatus();

  return {
    tradingEnabled: risk.tradingEnabled,
    consecutiveLosses: risk.consecutiveLosses,
  };
}