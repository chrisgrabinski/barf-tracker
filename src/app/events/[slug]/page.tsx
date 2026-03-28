import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DeleteRegurgitationEvent } from "@/app/events/[slug]/delete-event";
import { EmesisEventFormFields } from "@/app/events/emesis-fields";

import { FormContent, FormRoot } from "@/components/form";
import { IconButton } from "@/components/icon-button";

import { getRegurgitationEvent } from "@/lib/database";

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
      <FormRoot>
        <FormContent>
          <EmesisEventFormFields
            date={data.created_at}
            food={data.food?.slug}
            notes={data.notes ?? undefined}
          />
        </FormContent>
        <FormContent>
          <DeleteRegurgitationEvent slug={slug} />
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
