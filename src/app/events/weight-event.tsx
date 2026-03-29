import { format } from "date-fns";
import { ScaleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import emoji from "@/assets/scale.webp";
import { Card } from "@/components/card";
import { getWeightEvent } from "@/lib/weight-events";

type WeightEventProps = {
  slug: string;
};

const WeightEvent = async ({ slug }: WeightEventProps) => {
  const event = await getWeightEvent(slug);

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
            <div className="font-medium text-xl leading-none">Weight</div>
            <div className="text-muted-foreground leading-none">
              {format(new Date(event.datetime), "EEEE, MMMM d yyyy 'at' HH:mm")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ScaleIcon className="size-4" />
          <span className="font-medium">Weight:</span>
          <span>{event?.value / 1000} kg</span>
        </div>
      </Card>
    </Link>
  );
};

export { WeightEvent };
