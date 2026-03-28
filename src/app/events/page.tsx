import { RegurgitationEvent } from "@/app/events/regurgitation-event";

import { getEvents } from "@/lib/database";

export default async function EventsPage() {
  const { data: regurgitationEvents } = await getEvents();

  if (!regurgitationEvents) {
    return null;
  }

  return (
    <ul className="grid gap-4">
      {regurgitationEvents.map((event) => (
        <li key={event.slug}>
          <RegurgitationEvent slug={event.slug} />
        </li>
      ))}
    </ul>
  );
}
