import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { EmesisEventFormFields } from "@/app/events/emesis-fields";
import { Button } from "@/components/button";
import { FormContent, FormRoot } from "@/components/form";
import { IconButton } from "@/components/icon-button";
import { getRegurgitationEvent } from "@/lib/database";
import { deleteEmesisEvent, updateEmesisEvent } from "@/lib/events";

const Content = async ({ slug }: { slug: string }) => {
  const { data } = await getRegurgitationEvent(slug);

  if (!data) {
    return notFound();
  }

  return (
    <article className="grid gap-4">
      <IconButton asChild>
        <Link href="/events">
          <ChevronLeftIcon />
        </Link>
      </IconButton>
      <FormRoot action={updateEmesisEvent}>
        <FormContent>
          <EmesisEventFormFields
            date={data.created_at}
            food={data.food?.slug}
            notes={data.notes ?? undefined}
            slug={data.slug}
          />
        </FormContent>
        <FormContent>
          <Button variant="primary">Update</Button>
          <Button formAction={deleteEmesisEvent} variant="destructive">
            Delete
          </Button>
        </FormContent>
      </FormRoot>
    </article>
  );
};

export default async function EventPage({
  params,
}: PageProps<"/events/[slug]">) {
  return (
    <Suspense fallback={<>Loading...</>}>
      {params.then(({ slug }) => (
        <Content slug={slug} />
      ))}
    </Suspense>
  );
}
