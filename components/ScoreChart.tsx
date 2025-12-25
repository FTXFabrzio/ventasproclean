"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatScore } from "@/lib/format";

type ScoreDatum = {
  name: string;
  score: number;
};

type ScoreChartProps = {
  data: ScoreDatum[];
};

export default function ScoreChart({ data }: ScoreChartProps) {
  const formatTooltipValue = (value?: number | string) => {
    if (typeof value === "number") {
      return [formatScore(value), "Puntaje"];
    }
    return value ?? "";
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(4, 165, 204, 0.12)" }}
            formatter={formatTooltipValue}
            contentStyle={{
              background: "hsl(var(--background))",
              borderRadius: 12,
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          />
          <Bar dataKey="score" fill="#04a5cc" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
