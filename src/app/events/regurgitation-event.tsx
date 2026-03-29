import { format } from "date-fns";
import { ForkKnifeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import vomitingFaceEmoji from "@/assets/face-vomiting_1f92e.gif";
import { Card } from "@/components/card";

import { getEmesisEvent } from "@/lib/events";

type RegurgitationEventProps = {
  slug: string;
};

const RegurgitationEvent = async ({ slug }: RegurgitationEventProps) => {
  const { data: event } = await getEmesisEvent(slug);

  if (!event) {
    return null;
  }

  return (
    <Link href={`/events/${slug}`}>
      <Card className="grid gap-4">
        <div className="flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-full bg-primary">
            <Image alt="" className="size-6" src={vomitingFaceEmoji} />
          </div>
          <div className="grid gap-1">
            <div className="font-medium text-xl leading-none">Emesis</div>
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
        {event.notes && <div>{event.notes}</div>}
      </Card>
    </Link>
  );
};

export { RegurgitationEvent };
