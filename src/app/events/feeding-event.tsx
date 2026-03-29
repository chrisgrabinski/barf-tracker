import { format } from "date-fns";
import { ForkKnifeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import emoji from "@/assets/fishing-pole.webp";
import { Card } from "@/components/card";
import { getFeedingEvent } from "@/lib/feeding-events";

type FeedingEventProps = {
  slug: string;
};

const FeedingEvent = async ({ slug }: FeedingEventProps) => {
  const event = await getFeedingEvent(slug);

  if (!event) {
    return null;
  }

  return (
    <Link href={`/events/${slug}`}>
      <Card className="grid gap-4">
        <div className="flex items-center gap-2">
          <div className="grid size-12 place-items-center rounded-full bg-muted">
            <Image alt="" className="size-6" src={emoji} />
          </div>
          <div className="grid gap-1">
            <div className="font-medium text-xl leading-none">Feeding</div>
            <div className="text-muted-foreground leading-none">
              {format(new Date(event.datetime), "EEEE, MMMM d yyyy 'at' HH:mm")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ForkKnifeIcon className="size-4" />
          <span className="font-medium">Food:</span>
          <span>
            {event?.food.name} · {event?.food?.type.name}
          </span>
        </div>
      </Card>
    </Link>
  );
};

export { FeedingEvent };
