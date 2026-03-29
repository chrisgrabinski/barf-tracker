import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { CreateEmesisForm } from "@/app/events/emesis-form";
import { IconButton } from "@/components/icon-button";

export default async function AddEventPage() {
  return (
    <div className="grid gap-4">
      <IconButton asChild>
        <Link href="/events">
          <ChevronLeftIcon />
        </Link>
      </IconButton>
      <CreateEmesisForm />
    </div>
  );
}
