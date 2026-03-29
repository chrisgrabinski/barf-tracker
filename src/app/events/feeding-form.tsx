import { z } from "zod";
import { Button } from "@/components/button";
import { FieldInput, FieldLabel, FieldRoot } from "@/components/field";
import { FormContent, FormRoot } from "@/components/form";

import {
  createEmesisEvent,
  deleteEmesisEvent,
  updateEmesisEvent,
} from "@/lib/emesis-events";

const FeedingFormSchema = z.object({
  amount: z.optional(z.number()),
  datetime: z.optional(z.string()),
  food: z.uuid(),
  slug: z.uuid(),
});

const CreateFeedingFormSchema = FeedingFormSchema.omit({ slug: true });

type FeedingFormFieldsProps = {
  amount?: number | null;
  datetime?: string | null;
  food: string | null;
  slug?: string | null;
};

const FeedingFormFields = async ({
  datetime,
  amount,
  slug,
  food,
}: FeedingFormFieldsProps) => {
  return (
    <>
      {slug && <input name="slug" type="hidden" value={slug} />}
      <FieldRoot name="datetime">
        <FieldLabel>Date</FieldLabel>
        <FieldInput defaultValue={datetime ?? undefined} />
      </FieldRoot>
      <FieldRoot name="value">
        <FieldLabel>Food</FieldLabel>
        <FieldInput defaultValue={food ?? undefined} />
      </FieldRoot>
      <FieldRoot name="amount">
        <FieldLabel>Amount (in grams)</FieldLabel>
        <FieldInput defaultValue={amount ?? undefined} />
      </FieldRoot>
    </>
  );
};

type CreateFeedingFormProps = Omit<FeedingFormFieldsProps, "slug">;

const CreateFeedingForm = (props: CreateFeedingFormProps) => {
  return (
    <FormRoot action={createEmesisEvent}>
      <FormContent>
        <FeedingFormFields {...props} />
      </FormContent>
      <FormContent>
        <Button size="lg">Create</Button>
      </FormContent>
    </FormRoot>
  );
};

const UpdateFeedingForm = (props: FeedingFormFieldsProps) => {
  return (
    <FormRoot action={updateEmesisEvent}>
      <FormContent>
        <FeedingFormFields {...props} />
      </FormContent>
      <FormContent>
        <Button variant="primary">Update</Button>
        <Button formAction={deleteEmesisEvent} variant="destructive">
          Delete
        </Button>
      </FormContent>
    </FormRoot>
  );
};

export {
  CreateFeedingForm,
  UpdateFeedingForm,
  FeedingFormSchema,
  CreateFeedingFormSchema,
};
