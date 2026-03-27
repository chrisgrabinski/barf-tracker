"use client";

import { useCallback, useEffect, useState } from "react";

import { List } from "@/app/activity/list";

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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <h1 className="font-medium text-4xl">Past incidents</h1>
      <List entries={entries} onDelete={handleDelete} />
    </div>
  );
}
