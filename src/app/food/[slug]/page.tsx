import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FoodFields } from "@/app/food/fields";

import { FormContent, FormRoot } from "@/components/form";
import { IconButton } from "@/components/icon-button";

import { getFoodItem } from "@/lib/database";

const Content = async ({ slug }: { slug: string }) => {
  const { data } = await getFoodItem(slug);

  if (!data) {
    return notFound();
  }

  return (
    <article className="grid gap-4">
      <IconButton asChild>
        <Link href="/food">
          <ChevronLeftIcon />
        </Link>
      </IconButton>
      <FormRoot>
        <FormContent>
          <FoodFields
            name={data.name}
            notes={data.notes ?? undefined}
            type={data.type.slug}
          />
        </FormContent>
      </FormRoot>
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
