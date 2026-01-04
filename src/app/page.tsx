"use client";

import { useCallback, useEffect, useState } from "react";
import { BarfChart } from "@/app/barf-chart";
import { Form } from "@/app/form";
import { List } from "@/app/list";
import { supabase } from "@/lib/supabase";
import type { BarfEntry } from "@/lib/types";

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
        .insert([{ food_type: foodType || null }])
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

  const handleDelete = async (id: number) => {
    try {
      const { error: updateError } = await supabase
        .from("data")
        .update({
          hidden: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      setEntries((currentEntries) =>
        currentEntries.filter((entry) => entry.id !== id),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete entry");
      console.error("Error deleting entry:", err);
    }
  };

  const timestamps = entries.map((entry) => entry.created_at);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {error && (
        <div className="rounded-lg border border-red-500 bg-red-950/20 p-4 text-red-400">
          Error: {error}
        </div>
      )}
      <Form
        defaultValue={entries[0]?.food_type || undefined}
        onSubmit={handleSubmit}
      />
      <BarfChart timestamps={timestamps} />
      <List entries={entries} onDelete={handleDelete} />
    </div>
  );
}
