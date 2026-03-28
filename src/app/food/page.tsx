import { FishIcon } from "lucide-react";
import { Card } from "@/components/card";

export default function RootPage() {
  return (
    <Card className="flex grow flex-col items-center justify-center gap-2 text-center">
      <div className="grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground">
        <FishIcon />
      </div>
      <p className="font-medium text-xl">Coming soon...</p>
      <p className="text-balance text-muted-foreground">
        You will soon be able to track food products right in the app.
      </p>
    </Card>
  );
}
