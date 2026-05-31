export type Exchange = {
  name: string;
  price: number;
  ask: number;
  bid: number;
  status: "connected" | "disconnected";
  latency: number;
};