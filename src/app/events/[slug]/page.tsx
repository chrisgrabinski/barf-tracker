import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DeleteRegurgitationEvent } from "@/app/events/[slug]/delete-event";
import { Card } from "@/components/card";
import { FieldInput, FieldLabel, FieldRoot } from "@/components/field";
import { FormContent, FormRoot } from "@/components/form";
import { IconButton } from "@/components/icon-button";
import { Textarea } from "@/components/textarea";
import { getRegurgitationEvent } from "@/lib/database";

const Content = async ({ slug }: { slug: string }) => {
  const { data } = await getRegurgitationEvent(slug);

  if (!data) {
    return notFound();
  }

  console.log(data, data.notes);

  return (
    <article className="grid gap-4">
      <IconButton asChild>
        <Link href="/events">
          <ChevronLeftIcon />
        </Link>
      </IconButton>
      <FormRoot>
        <FormContent>
          <FieldRoot name="date">
            <FieldLabel>Date</FieldLabel>
            <FieldInput defaultValue={data.created_at} />
          </FieldRoot>
          <FieldRoot name="food">
            <FieldLabel>Food</FieldLabel>
            <FieldInput defaultValue={data.food?.name} />
          </FieldRoot>
          <FieldRoot name="notes">
            <FieldLabel>Notes</FieldLabel>
            <FieldInput asChild>
              <Textarea defaultValue={data.notes ?? undefined} />
            </FieldInput>
          </FieldRoot>
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
