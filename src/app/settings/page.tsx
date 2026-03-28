import { SettingsIcon } from "lucide-react";

import { Card } from "@/components/card";

export default function SettingsPage() {
  return (
    <Card className="flex grow flex-col items-center justify-center gap-2">
      <div className="grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground">
        <SettingsIcon />
      </div>
      <span className="text-lg text-medium">Coming soon</span>
      <span className="text-balance text-muted-foreground">
        Soon you will find all your account settings here.
      </span>
    </Card>
  );
}
