"use client";

import {
  endOfWeek,
  format,
  getISOWeek,
  isWithinInterval,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { BarChartIcon, LineChartIcon } from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import { AreaChart } from "@/app/(dashboard)/area-chart";
import { BarChart } from "@/app/(dashboard)/bar-chart";
import { Card } from "@/components/card";
import {
  SegmentedControlItem,
  SegmentedControlRoot,
} from "@/components/segmented-control";
import type { BarfEntry } from "@/lib/types";

interface BarfChartProps {
  entries: BarfEntry[];
}

export function BarfChart({ entries }: BarfChartProps) {
  const [chartType, setChartType] = useState<"bar" | "area">("bar");

  const timestamps = entries.map((entry) => entry.created_at);

  const weeksDuration = 6;

  const weeks = Array.from({ length: weeksDuration }, (_, i) => {
    const weekStartDate = startOfWeek(subWeeks(new Date(), i), {
      weekStartsOn: 1,
    });
    const weekEndDate = endOfWeek(weekStartDate, { weekStartsOn: 1 });
    return { weekEndDate, weekStartDate };
  }).sort((a, b) => a.weekStartDate.getTime() - b.weekStartDate.getTime());

  const datesWithEntries = weeks.map(({ weekStartDate, weekEndDate }) => {
    const entriesForWeek = entries.filter((entry) => {
      const entryDate = new Date(entry.created_at);
      return isWithinInterval(entryDate, {
        end: weekEndDate,
        start: weekStartDate,
      });
    });

    return {
      date: weekStartDate,
      displayDate: `W${getISOWeek(weekStartDate)}: ${format(
        weekStartDate,
        "MMM d",
      )} - ${format(weekEndDate, "MMM d")}`,
      dry: entriesForWeek.filter((entry) => entry.food.type.name === "Dry")
        .length,
      wet: entriesForWeek.filter((entry) => entry.food.type.name === "Wet")
        .length,
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
          <SegmentedControlRoot
            defaultValue="bar"
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
        <ResponsiveContainer className="aspect-2/1 w-full">
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
