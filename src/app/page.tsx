"use client";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import vomitingFaceEmoji from "@/assets/face-vomiting_1f92e.gif";
import nauseatedFaceEmoji from "@/assets/nauseated-face_1f922.gif";
import { Card } from "@/components/card";
import { supabase } from "@/lib/supabase";
import type { BarfEntry } from "@/lib/types";
import { Button } from "@/primitives/button";
import { BarfChart } from "./BarfChart";

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
      <Card>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <label className="grid gap-1.5">
            <span>Last food type</span>
            <select
              className="block bg-neutral-800 p-[1.5ch]"
              defaultValue={entries[0]?.food_type || undefined}
              name="food_type"
            >
              <option value="dry">Dry food</option>
              <option value="wet">Wet food</option>
            </select>
          </label>
          <Button
            className="group flex w-full cursor-pointer items-center justify-center gap-[0.75ch] rounded-lg bg-lime-900 p-[1.5ch] font-medium text-lime-50 text-xl transition hover:bg-lime-800"
            type="submit"
          >
            <div className="grid size-[1lh] place-items-center">
              <Image
                alt=""
                className="col-start-1 row-start-1 size-full transition-opacity group-hover:opacity-0"
                height={64}
                src={nauseatedFaceEmoji}
                width={64}
              />
              <Image
                alt=""
                className="col-start-1 row-start-1 size-full opacity-0 transition-opacity group-hover:opacity-100"
                height={64}
                src={vomitingFaceEmoji}
                width={64}
              />
            </div>
            Barf!
          </Button>
        </form>
      </Card>
      <Card>
        <BarfChart timestamps={timestamps} />
      </Card>
      <Card>
        <h2 className="font-semibold text-xl">Barf list</h2>
        {entries.length === 0 && (
          <p className="text-neutral-500">No barf entries yet</p>
        )}
        {entries.length > 0 && (
          <ul className="divide-y divide-neutral-800">
            {entries.map((entry) => (
              <li
                className="flex items-center justify-between gap-3 py-3"
                key={entry.id}
              >
                {format(
                  new Date(entry.created_at),
                  "EEEE, MMMM d yyyy 'at' HH:mm",
                )}
                <Button
                  className="grid size-8 cursor-pointer place-items-center rounded-lg bg-red-500/25 hover:bg-red-500"
                  onClick={() => handleDelete(entry.id)}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
