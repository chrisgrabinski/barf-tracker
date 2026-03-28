import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DeleteRegurgitationEvent } from "@/app/events/[slug]/delete-event";
import { Card } from "@/components/card";
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
      <Card>
        <div>{data.created_at}</div>
      </Card>
      <Card>
        <div>{data.food?.name}</div>
      </Card>
      {data.notes && <Card>{data.notes}</Card>}
      <DeleteRegurgitationEvent slug={slug} />
    </article>
  );
};

export default async function FoodItemPage({
  params,
}: PageProps<"/food/[slug]">) {
  return (
    <Suspense fallback={<>Loading...</>}>
      {params.then(({ slug }) => (
        <Content slug={slug} />
      ))}
    </Suspense>
  );
}
