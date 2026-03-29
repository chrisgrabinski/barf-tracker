import { NextResponse } from "next/server";
import { getEmesisEvents } from "@/lib/emesis-events";
import { getFeedingEvents } from "@/lib/feeding-events";
import { getWeightEvents } from "@/lib/weight-events";

type UnifiedEventType = "emesis" | "feeding" | "weight";

type UnifiedEvent = {
  type: UnifiedEventType;
  datetime: string;
} & Record<string, unknown>;

const toTimestamp = (value: unknown) => {
  if (typeof value !== "string") return 0;

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export async function GET() {
  try {
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

    return NextResponse.json(combinedEvents);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch events";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
