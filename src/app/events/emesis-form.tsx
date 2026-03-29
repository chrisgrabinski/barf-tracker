import { z } from "zod";
import { Button } from "@/components/button";
import {
  FieldDescription,
  FieldInput,
  FieldLabel,
  FieldRoot,
} from "@/components/field";
import { FormContent, FormRoot } from "@/components/form";
import { Textarea } from "@/components/textarea";
import { getFoods } from "@/lib/database";
import {
  createEmesisEvent,
  deleteEmesisEvent,
  updateEmesisEvent,
} from "@/lib/emesis-events";

const EmesisFormSchema = z.object({
  datetime: z.optional(z.string()),
  food: z.string(),
  notes: z.optional(z.string()),
  slug: z.string(),
});

const CreateEmesisFormSchema = EmesisFormSchema.omit({ slug: true });

type EmesisFormFieldsProps = {
  datetime?: string | null;
  food?: string | null;
  notes?: string | null;
  slug?: string | null;
};

const EmesisFormFields = async ({
  datetime,
  food,
  notes,
  slug,
}: EmesisFormFieldsProps) => {
  const { data: foods } = await getFoods();

  return (
    <>
      {slug && <input name="slug" type="hidden" value={slug} />}
      <FieldRoot name="datetime">
        <FieldLabel>Date</FieldLabel>
        <FieldInput defaultValue={datetime ?? undefined} />
      </FieldRoot>
      <FieldRoot name="food">
        <FieldLabel>Food</FieldLabel>
        <FieldInput asChild defaultValue={food ?? undefined}>
          <select className="appearance-none">
            {foods?.map((food) => (
              <option key={food.slug} value={food.slug}>
                {food.name}
              </option>
            ))}
          </select>
        </FieldInput>
      </FieldRoot>
      <FieldRoot name="notes">
        <FieldLabel>Notes</FieldLabel>
        <FieldInput asChild>
          <Textarea defaultValue={notes ?? undefined} />
        </FieldInput>
        <FieldDescription>
          Describe the appearance and volume of the emesis (e.g., undigested
          food, hairball) as well as behaviors or activities you observed
          leading up to the episode.
        </FieldDescription>
      </FieldRoot>
    </>
  );
};

type CreateEmesisFormProps = Omit<EmesisFormFieldsProps, "slug">;

const CreateEmesisForm = (props: CreateEmesisFormProps) => {
  return (
    <FormRoot action={createEmesisEvent}>
      <FormContent>
        <EmesisFormFields {...props} />
      </FormContent>
      <FormContent>
        <Button size="lg" variant="primary">
          Create
        </Button>
      </FormContent>
    </FormRoot>
  );
};

const UpdateEmesisForm = (props: EmesisFormFieldsProps) => {
  return (
    <FormRoot action={updateEmesisEvent}>
      <FormContent>
        <EmesisFormFields {...props} />
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
  CreateEmesisForm,
  UpdateEmesisForm,
  EmesisFormSchema,
  CreateEmesisFormSchema,
};
