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

interface BarfChartProps {
  timestamps: string[];
}

export function BarfChart({ timestamps }: BarfChartProps) {
  // Group timestamps by day and count occurrences
  const dataByDay = timestamps.reduce(
    (acc, timestamp) => {
      const date = new Date(timestamp);
      const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format

      if (!acc[dayKey]) {
        acc[dayKey] = 0;
      }
      acc[dayKey] += 1;

      return acc;
    },
    {} as Record<string, number>,
  );

  // Convert to array format for Recharts
  const chartData = Object.entries(dataByDay)
    .map(([date, count]) => ({
      count,
      date,
      // Format date for display (e.g., "Jan 15")
      displayDate: new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
    }))
    .sort((a, b) => a.date.localeCompare(b.date)); // Sort by date

  if (timestamps.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-500">
        <p>No barf data to display</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer height={300} width="100%">
        <BarChart
          data={chartData}
          margin={{
            bottom: 5,
            left: 20,
            right: 30,
            top: 5,
          }}
        >
          <CartesianGrid stroke="#404040" strokeDasharray="3 3" />
          <XAxis
            dataKey="displayDate"
            stroke="#a3a3a3"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="#a3a3a3" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              border: "1px solid #404040",
              borderRadius: "6px",
              color: "#fff",
            }}
            labelStyle={{ color: "#a3a3a3" }}
          />
          <Bar dataKey="count" fill="#84cc16" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
