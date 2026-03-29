import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { EmesisEvent } from "@/app/events/emesis-event";
import { FeedingEvent } from "@/app/events/feeding-event";
import { WeightEvent } from "@/app/events/weight-event";
import { IconButton } from "@/components/icon-button";
import { getEmesisEvents } from "@/lib/emesis-events";
import { getFeedingEvents } from "@/lib/feeding-events";
import { getWeightEvents } from "@/lib/weight-events";

type EventType = "emesis" | "feeding" | "weight";

type UnifiedEvent = {
  type: EventType;
  datetime: string;
  slug: string;
} & Record<string, unknown>;

const toTimestamp = (value: unknown) => {
  if (typeof value !== "string") return 0;

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const getEventComponent = (type: EventType) => {
  switch (type) {
    case "emesis":
      return EmesisEvent;
    case "weight":
      return WeightEvent;
    case "feeding":
      return FeedingEvent;
  }
};

export default async function EventsPage() {
  const [emesisEvents, feedingEvents, weightEvents] = await Promise.all([
    getEmesisEvents(),
    getFeedingEvents(),
    getWeightEvents(),
  ]);

  const combinedEvents: UnifiedEvent[] = [
    ...emesisEvents.map((event) => ({ ...event, type: "emesis" as const })),
    ...feedingEvents.map((event) => ({ ...event, type: "feeding" as const })),
    ...weightEvents.map((event) => ({ ...event, type: "weight" as const })),
  ].sort((a, b) => toTimestamp(b.datetime) - toTimestamp(a.datetime));

  return (
    <div className="grid gap-4">
      <div>
        <IconButton asChild variant="primary">
          <Link href="/events/add">
            <PlusIcon />
          </Link>
        </IconButton>
      </div>
      <ul className="grid gap-4">
        {combinedEvents.map((event) => {
          const Component = getEventComponent(event.type);

          return (
            <li key={`${event.type}-${event.slug}`}>
              <Component {...event} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
