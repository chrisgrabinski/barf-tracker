import {
  FieldDescription,
  FieldInput,
  FieldLabel,
  FieldRoot,
} from "@/components/field";
import { Textarea } from "@/components/textarea";
import { getFoods } from "@/lib/database";

type EmesisEventFormFieldsProps = {
  date?: string;
  food?: string;
  notes?: string;
  slug?: string;
};

const EmesisEventFormFields = async ({
  date,
  food,
  notes,
  slug,
}: EmesisEventFormFieldsProps) => {
  const { data: foods } = await getFoods();

  return (
    <>
      {slug && <input name="slug" type="hidden" value={slug} />}
      <FieldRoot name="date">
        <FieldLabel>Date</FieldLabel>
        <FieldInput defaultValue={date} />
      </FieldRoot>
      <FieldRoot name="food">
        <FieldLabel>Food</FieldLabel>
        <FieldInput asChild defaultValue={food}>
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
          <Textarea defaultValue={notes} />
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

export { EmesisEventFormFields };
