"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type ProfitChartProps = {
  data: {
    executedAt: string;
    cumulativeProfit: number;
  }[];
};

export function ProfitChart({ data }: ProfitChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis
          dataKey="executedAt"
          tick={false}
          axisLine={false}
          tickLine={false}
        />

        <YAxis axisLine={false} tickLine={false} />

        <Tooltip
          contentStyle={{
            backgroundColor: "#101821",
            border: "1px solid #27272a",
            color: "#fff",
          }}
          labelStyle={{
            color: "#fff",
          }}
        />

        <Line
          type="monotone"
          dataKey="cumulativeProfit"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
