import { format } from "date-fns";
import { ForkKnifeIcon, TrashIcon } from "lucide-react";
import { Card } from "@/components/card";
import { IconButton } from "@/components/icon-button";
import type { BarfEntry } from "@/lib/types";

type ListProps = {
  entries: BarfEntry[];
  onDelete: (id: number) => void;
};

export const List = ({ entries, onDelete }: ListProps) => {
  return (
    <div>
      {entries.length > 0 && (
        <ul className="grid gap-4">
          {entries.map((entry) => (
            <Card asChild key={entry.id}>
              <li className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="size-12 rounded-full bg-muted" />
                  <div className="grid gap-1">
                    <div className="font-medium leading-none">
                      Regurgitation
                    </div>
                    <div className="text-muted-foreground leading-none">
                      {format(
                        new Date(entry.created_at),
                        "EEEE, MMMM d yyyy 'at' HH:mm",
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ForkKnifeIcon className="size-4" />
                  <span className="font-medium">Food:</span>
                  <span>
                    {entry.food.name} · {entry.food.type.name}
                  </span>
                </div>
                {entry.notes && <div className="text-lg">{entry.notes}</div>}
                <IconButton
                  className="ml-auto"
                  onClick={() => onDelete(entry.id)}
                  size="sm"
                  variant="destructive"
                >
                  <TrashIcon />
                </IconButton>
              </li>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
};
