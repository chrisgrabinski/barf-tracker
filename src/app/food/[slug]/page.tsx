import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  FieldDescription,
  FieldInput,
  FieldLabel,
  FieldRoot,
} from "@/components/field";
import { FormContent, FormRoot } from "@/components/form";
import { IconButton } from "@/components/icon-button";
import { Textarea } from "@/components/textarea";
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
          <FieldRoot name="name">
            <FieldLabel>Name</FieldLabel>
            <FieldInput defaultValue={data.name} />
          </FieldRoot>
          <FieldRoot name="type">
            <FieldLabel>Food type</FieldLabel>
            <div className="flex gap-2">
              <div className="flex-1 rounded-xl bg-input p-4 pt-16">Wet</div>
              <div className="flex-1 rounded-xl bg-input p-4 pt-16">Dry</div>
              <div className="flex-1 rounded-xl bg-input p-4 pt-16">Mixed</div>
            </div>
          </FieldRoot>
          <FieldRoot name="notes">
            <FieldLabel>Notes</FieldLabel>
            <FieldInput asChild>
              <Textarea />
            </FieldInput>
            <FieldDescription>
              Provide specific details such as the brand name, key ingredients,
              texture, or any unique characteristics of the food.
            </FieldDescription>
          </FieldRoot>
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
