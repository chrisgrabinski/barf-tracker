import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import { Card } from "@/components/card";
import { IconButton } from "@/components/icon-button";
import type { BarfEntry } from "@/lib/types";

type ListProps = {
  entries: BarfEntry[];
  onDelete: (id: number) => void;
};

export const List = ({ entries, onDelete }: ListProps) => {
  return (
    <Card>
      {entries.length === 0 && (
        <p className="text-muted-foreground">No barf entries yet</p>
      )}
      {entries.length > 0 && (
        <ul className="grid gap-8">
          {entries.map((entry) => (
            <li className="flex items-center gap-2" key={entry.id}>
              <div className="size-12 rounded-full bg-muted" />
              <div>
                <div className="font-medium">
                  {format(
                    new Date(entry.created_at),
                    "EEEE, MMMM d yyyy 'at' HH:mm",
                  )}
                </div>
                <div className="text-muted-foreground">
                  {entry.food_type} food
                </div>
              </div>
              <IconButton
                className="ml-auto"
                onClick={() => onDelete(entry.id)}
                size="sm"
                variant="destructive"
              >
                <TrashIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
