import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, use } from "react";
import { UpdateEmesisForm } from "@/app/events/emesis-form";
import { IconButton } from "@/components/icon-button";
import { getEmesisEvent } from "@/lib/emesis-events";

const Content = async ({ slug }: { slug: string }) => {
  const event = await getEmesisEvent(slug);

  if (!event) {
    return notFound();
  }

  return (
    <article className="grid gap-4">
      <IconButton asChild>
        <Link href="/events">
          <ChevronLeftIcon />
        </Link>
      </IconButton>
      <UpdateEmesisForm />
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
