import { format } from "date-fns";
import { ForkKnifeIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/card";
import { getRegurgitationEvent } from "@/lib/database";

type RegurgitationEventProps = {
  slug: string;
};

const RegurgitationEvent = async ({ slug }: RegurgitationEventProps) => {
  const { data: event } = await getRegurgitationEvent(slug);

  if (!event) {
    return null;
  }

  return (
    <Link href={`/events/${slug}`}>
      <Card className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="size-12 rounded-full bg-muted" />
          <div className="grid gap-1">
            <div className="font-medium leading-none">Regurgitation</div>
            <div className="text-muted-foreground leading-none">
              {format(
                new Date(event.created_at),
                "EEEE, MMMM d yyyy 'at' HH:mm",
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ForkKnifeIcon className="size-4" />
          <span className="font-medium">Food:</span>
          <span>
            {event?.food?.name} · {event?.food?.type.name}
          </span>
        </div>
        {event.notes && <div className="text-lg">{event.notes}</div>}
      </Card>
    </Link>
  );
};

export { RegurgitationEvent };
