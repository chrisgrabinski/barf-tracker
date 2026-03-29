import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { EmesisEvent } from "@/app/events/emesis-event";
import { IconButton } from "@/components/icon-button";
import { getEmesisEvents } from "@/lib/emesis-events";

export default async function EventsPage() {
  const events = await getEmesisEvents();

  if (!events) {
    return null;
  }

  console.log(events);

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
        {events.map((event) => (
          <li key={event.slug}>
            <EmesisEvent slug={event.slug} />
          </li>
        ))}
      </ul>
    </div>
  );
}
