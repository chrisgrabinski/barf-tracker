"use client";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import vomitingFaceEmoji from "@/app/face-vomiting_1f92e.gif";
import nauseatedFaceEmoji from "@/app/nauseated-face_1f922.gif";
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

  const handleAdd = async () => {
    try {
      const { data, error: insertError } = await supabase
        .from("data")
        .insert([{}])
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
    <div className="grid gap-12">
      {error && (
        <div className="rounded-lg border border-red-500 bg-red-950/20 p-4 text-red-400">
          Error: {error}
        </div>
      )}
      <div className="grid place-items-center">
        <Button
          className="group flex cursor-pointer items-center gap-[0.75ch] rounded-lg bg-lime-900 p-[1.5ch] font-medium text-4xl text-lime-50 transition hover:bg-lime-800"
          onClick={handleAdd}
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
      </div>
      <section className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
        <BarfChart timestamps={timestamps} />
      </section>
      <section className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
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
      </section>
    </div>
  );
}
