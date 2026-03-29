import { NotebookPenIcon } from "lucide-react";
import { CreateEmesisForm } from "@/app/events/emesis-form";
import { Card } from "@/components/card";
import { getLatestEmesisEvent } from "@/lib/emesis-events";

const QuickLogForm = async () => {
  const { food: defaultFood } = await getLatestEmesisEvent();

  return (
    <Card className="grid gap-4">
      <div className="flex items-center gap-1.5 font-semibold text-xl">
        <div className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
          <NotebookPenIcon className="size-5" />
        </div>
        Quick log
      </div>
      <CreateEmesisForm food={defaultFood ?? undefined} />
    </Card>
  );
};

export { QuickLogForm };
