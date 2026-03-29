import { z } from "zod";
import { Button } from "@/components/button";
import { FieldInput, FieldLabel, FieldRoot } from "@/components/field";
import { FormContent, FormRoot } from "@/components/form";

import {
  createEmesisEvent,
  deleteEmesisEvent,
  updateEmesisEvent,
} from "@/lib/emesis-events";

const WeightFormSchema = z.object({
  datetime: z.optional(z.string()),
  slug: z.uuid(),
  value: z.number(),
});

const CreateWeightFormSchema = WeightFormSchema.omit({ slug: true });

type WeightFormFieldsProps = {
  datetime?: string | null;
  value: string | null;
  slug?: string | null;
};

const WeightFormFields = async ({
  datetime,
  slug,
  value,
}: WeightFormFieldsProps) => {
  return (
    <>
      {slug && <input name="slug" type="hidden" value={slug} />}
      <FieldRoot name="datetime">
        <FieldLabel>Date</FieldLabel>
        <FieldInput defaultValue={datetime ?? undefined} />
      </FieldRoot>
      <FieldRoot name="value">
        <FieldLabel>Weight (in grams)</FieldLabel>
        <FieldInput defaultValue={value ?? undefined} />
      </FieldRoot>
    </>
  );
};

type CreateWeightFormProps = Omit<WeightFormFieldsProps, "slug">;

const CreateWeightForm = (props: CreateWeightFormProps) => {
  return (
    <FormRoot action={createEmesisEvent}>
      <FormContent>
        <WeightFormFields {...props} />
      </FormContent>
      <FormContent>
        <Button size="lg">Create</Button>
      </FormContent>
    </FormRoot>
  );
};

const UpdateWeightForm = (props: WeightFormFieldsProps) => {
  return (
    <FormRoot action={updateEmesisEvent}>
      <FormContent>
        <WeightFormFields {...props} />
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
  CreateWeightForm,
  UpdateWeightForm,
  WeightFormSchema,
  CreateWeightFormSchema,
};
