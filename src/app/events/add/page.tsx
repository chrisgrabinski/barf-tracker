import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { EmesisEventFormFields } from "@/app/events/emesis-fields";
import { Button } from "@/components/button";
import { FormContent, FormRoot } from "@/components/form";
import { IconButton } from "@/components/icon-button";
import { createEmesisEvent } from "@/lib/events";

export default async function AddEventPage() {
  return (
    <div className="grid gap-4">
      <IconButton asChild>
        <Link href="/events">
          <ChevronLeftIcon />
        </Link>
      </IconButton>
      <FormRoot action={createEmesisEvent}>
        <FormContent>
          <EmesisEventFormFields />
        </FormContent>
        <FormContent>
          <Button size="lg">Save</Button>
          <Button size="lg" variant="tertiary">
            Cancel
          </Button>
        </FormContent>
      </FormRoot>
    </div>
  );
}
