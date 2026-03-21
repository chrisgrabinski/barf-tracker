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
      {entries.length === 0 && (
        <p className="text-neutral-500">No barf entries yet</p>
      )}
      {entries.length > 0 && (
        <ul className="grid gap-8">
          {entries.map((entry) => (
            <li className="flex items-center gap-2" key={entry.id}>
              <div className="size-12 rounded-full bg-neutral-600" />
              <div>
                <div className="font-medium">
                  {format(
                    new Date(entry.created_at),
                    "EEEE, MMMM d yyyy 'at' HH:mm",
                  )}
                </div>
                <div className="text-neutral-400">{entry.food_type} food</div>
              </div>
              <Button
                className="ml-auto grid size-8 cursor-pointer place-items-center rounded-lg bg-red-500/25 hover:bg-red-500"
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
