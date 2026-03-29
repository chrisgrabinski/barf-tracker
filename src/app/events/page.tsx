import { RegurgitationEvent } from "@/app/events/regurgitation-event";

import { getEmesisEvents } from "@/lib/events";

export default async function EventsPage() {
  const { data: regurgitationEvents } = await getEmesisEvents();

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
