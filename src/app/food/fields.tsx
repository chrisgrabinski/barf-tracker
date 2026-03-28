import { FieldInput, FieldLabel, FieldRoot } from "@/components/field";
import { Textarea } from "@/components/textarea";

const FoodFields = () => {
  return (
    <>
      <FieldRoot name="image">
        <FieldLabel>Image</FieldLabel>
        <FieldInput />
      </FieldRoot>
      <FieldRoot name="name">
        <FieldLabel>Name</FieldLabel>
        <FieldInput />
      </FieldRoot>
      <FieldRoot name="type">
        <FieldLabel>Type</FieldLabel>
        <FieldInput />
      </FieldRoot>
      <FieldRoot name="notes">
        <FieldLabel>Notes</FieldLabel>
        <FieldInput asChild>
          <Textarea />
        </FieldInput>
      </FieldRoot>
    </>
  );
};

export { FoodFields };
