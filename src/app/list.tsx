import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import { Card } from "@/components/card";
import type { BarfEntry } from "@/lib/types";
import { Button } from "@/primitives/button";

type ListProps = {
  entries: BarfEntry[];
  onDelete: (id: number) => void;
};

export const List = ({ entries, onDelete }: ListProps) => {
  return (
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
                onClick={() => onDelete(entry.id)}
              >
                <TrashIcon className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
