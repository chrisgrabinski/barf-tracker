"use client";

import { AreaChartIcon, BarChartIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/primitives/button";
import { AreaChart } from "./area-chart";
import { BarChart } from "./bar-chart";

const IconButton = (props: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      className={cn(
        "inline-grid size-8 cursor-pointer place-items-center rounded-lg ring-1 ring-neutral-800 ring-inset transition hover:bg-neutral-800 aria-pressed:bg-neutral-700 aria-pressed:ring-0 [&_svg]:size-4",
        props.className,
      )}
      {...props}
    />
  );
};

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
        <IconButton
          aria-pressed={chartType === "bar"}
          onClick={() => setChartType("bar")}
        >
          <BarChartIcon />
        </IconButton>
        <IconButton
          aria-pressed={chartType === "area"}
          onClick={() => setChartType("area")}
        >
          <AreaChartIcon />
        </IconButton>
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
