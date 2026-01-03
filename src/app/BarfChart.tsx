"use client";

import { BarChartIcon, LineChartIcon } from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import {
  SegmentedControlItem,
  SegmentedControlRoot,
} from "@/components/segmented-control";

import { AreaChart } from "./area-chart";
import { BarChart } from "./bar-chart";

interface BarfChartProps {
  timestamps: string[];
}

export function BarfChart({ timestamps }: BarfChartProps) {
  const [chartType, setChartType] = useState<"bar" | "area">("bar");

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
    <div>
      <div className="flex items-center justify-end gap-1.5">
        <h2 className="mr-auto font-medium text-xl">Barf Chart</h2>
        <SegmentedControlRoot
          onValueChange={(value) => setChartType(value as "area" | "bar")}
        >
          <SegmentedControlItem aria-label="Bar chart" value="bar">
            <BarChartIcon className="size-4" />
          </SegmentedControlItem>
          <SegmentedControlItem aria-label="Area chart" value="area">
            <LineChartIcon className="size-4" />
          </SegmentedControlItem>
        </SegmentedControlRoot>
      </div>
      <ResponsiveContainer className="aspect-video w-full">
        {/* <BarChart data={chartData} /> */}
        {chartType === "area" ? (
          <AreaChart data={chartData} />
        ) : (
          <BarChart data={chartData} />
        )}
      </ResponsiveContainer>
    </div>
  );
}
