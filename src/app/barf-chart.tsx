"use client";

import { isSameDay } from "date-fns";
import { BarChartIcon, LineChartIcon } from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import { Card } from "@/components/card";
import {
  SegmentedControlItem,
  SegmentedControlRoot,
} from "@/components/segmented-control";
import type { BarfEntry } from "@/lib/types";
import { AreaChart } from "./area-chart";
import { BarChart } from "./bar-chart";

interface BarfChartProps {
  entries: BarfEntry[];
}

export function BarfChart({ entries }: BarfChartProps) {
  const [chartType, setChartType] = useState<"bar" | "area">("bar");

  const timestamps = entries.map((entry) => entry.created_at);

  const daysDuration = 14;

  const dates = Array.from({ length: daysDuration }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).sort((a, b) => a.getTime() - b.getTime());

  const datesWithEntries = dates.map((date) => {
    const entriesForDate = entries.filter((entry) => {
      const entryDate = new Date(entry.created_at);
      return isSameDay(entryDate, date);
    });

    return {
      date,
      displayDate: new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
      dry: entriesForDate.filter((entry) => entry.food_type === "dry").length,
      wet: entriesForDate.filter((entry) => entry.food_type === "wet").length,
    };
  });

  if (timestamps.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-500">
        <p>No barf data to display</p>
      </div>
    );
  }

  return (
    <Card>
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
            <AreaChart data={datesWithEntries} />
          ) : (
            <BarChart data={datesWithEntries} />
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
