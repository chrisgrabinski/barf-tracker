"use client";

import { format, isSameDay, subDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";

import { BarfChart } from "@/app/(dashboard)/barf-chart";
import { Form } from "@/app/(dashboard)/form";

import { Stat } from "@/components/stat";
import { WidgetRoot, WidgetTitle } from "@/components/widget";
import { supabase } from "@/lib/supabase";
import type { BarfEntry } from "@/lib/types";

const today = new Date();

const formatDay = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

const getDays = (count: number) => {
  return [
    formatDay(today),
    ...Array.from({ length: count - 1 }, (_, index) =>
      formatDay(subDays(today, index + 1)),
    ),
  ];
};

export default function RootPage() {
  const [entries, setEntries] = useState<BarfEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("data")
        .select("*")
        .not("hidden", "is", true)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setEntries(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch entries");
      console.error("Error fetching entries:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const foodType = formData.get("food_type") as string;
    const notes = formData.get("notes") as string;

    try {
      // Add food type to database (upsert to avoid duplicates)
      if (foodType) {
        const { error: foodTypeError } = await supabase
          .from("food_types")
          .upsert(
            { name: foodType },
            { ignoreDuplicates: false, onConflict: "name" },
          );

        if (foodTypeError) {
          // If food_types table doesn't exist, continue anyway
          console.warn("Could not upsert food type:", foodTypeError);
        }
      }

      // Create new entry with food_type
      const { data, error: insertError } = await supabase
        .from("data")
        .insert([{ food_type: foodType || null, notes: notes || null }])
        .select()
        .single();

      if (insertError) throw insertError;

      if (data) {
        setEntries((currentEntries) => [data, ...currentEntries]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add entry");
      console.error("Error adding entry:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const oneWeekData = getDays(7)
    .map((value) => {
      return entries.filter((entry) =>
        isSameDay(new Date(value), new Date(entry.created_at)),
      );
    })
    .map((entries) => entries.length)
    .reverse();

  return (
    <div className="grid gap-4">
      {error && (
        <div className="rounded-lg border border-red-500 bg-red-950/20 p-4 text-red-400">
          Error: {error}
        </div>
      )}
      <Form
        defaultValue={entries[0]?.food_type || undefined}
        onSubmit={handleSubmit}
      />
      <h2 className="font-medium text-2xl">Weekly overview</h2>
      <BarfChart entries={entries} />
      <h2 className="font-medium text-2xl">Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <Stat
          data={oneWeekData}
          label="Last seven days"
          sentiment="negative"
          value={oneWeekData.reduce<number>(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          )}
        />
        <WidgetRoot>
          <WidgetTitle>Food cause</WidgetTitle>
          <div className="mt-4 grid gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 text-right">Wet</div>
              <div
                className="h-8 rounded-sm bg-green-500"
                style={{
                  width: `${
                    (entries.filter((entry) => entry.food_type === "wet")
                      .length /
                      entries.length) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 text-right">Dry</div>
              <div
                className="h-8 rounded-sm bg-orange-500"
                style={{
                  width: `${
                    (entries.filter((entry) => entry.food_type === "dry")
                      .length /
                      entries.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </WidgetRoot>
      </div>
    </div>
  );
}
