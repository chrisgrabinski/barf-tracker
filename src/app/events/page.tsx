import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { RegurgitationEvent } from "@/app/events/regurgitation-event";
import { IconButton } from "@/components/icon-button";
import { getEmesisEvents } from "@/lib/events";

export default async function EventsPage() {
  const { data: regurgitationEvents } = await getEmesisEvents();

  if (!regurgitationEvents) {
    return null;
  }

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
        {regurgitationEvents.map((event) => (
          <li key={event.slug}>
            <RegurgitationEvent slug={event.slug} />
          </li>
        ))}
      </ul>
    </div>
  );
}
