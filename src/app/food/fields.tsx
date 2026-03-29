import {
  FieldDescription,
  FieldInput,
  FieldLabel,
  FieldRoot,
} from "@/components/field";
import { Textarea } from "@/components/textarea";
import { getFoodTypes } from "@/lib/database";

type FoodFieldsProps = {
  name?: string;
  type?: string;
  notes?: string;
};

const FoodFields = async ({ name, notes, type }: FoodFieldsProps) => {
  const { data: foodTypes } = await getFoodTypes();

  return (
    <>
      <FieldRoot name="image">
        <FieldLabel>Image</FieldLabel>
        <FieldInput />
      </FieldRoot>
      <FieldRoot name="name">
        <FieldLabel>Name</FieldLabel>
        <FieldInput defaultValue={name} />
      </FieldRoot>
      <div className="flex gap-2">
        {foodTypes?.map((foodType) => (
          <label
            className="flex flex-1 flex-col gap-8 rounded-xl border-2 border-border p-4 has-checked:border-primary"
            key={foodType.slug}
          >
            <input
              className="size-4 self-start opacity-0"
              defaultChecked={foodType.slug === type}
              name="type"
              type="radio"
              value={foodType.slug}
            />
            {foodType.name}
          </label>
        ))}
      </div>
      <FieldRoot name="notes">
        <FieldLabel>Notes</FieldLabel>
        <FieldInput asChild>
          <Textarea defaultValue={notes} />
        </FieldInput>
        <FieldDescription>
          Provide specific details such key ingredients, texture, or any unique
          characteristics of the food.
        </FieldDescription>
      </FieldRoot>
    </>
  );
};

export { FoodFields };
