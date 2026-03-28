import { FoodFields } from "@/app/food/fields";
import { Button } from "@/components/button";
import { FormContent, FormRoot } from "@/components/form";

export default async function AddFoodPage() {
  return (
    <div className="grid gap-4">
      <FormRoot>
        <FormContent>
          <FoodFields />
        </FormContent>
        <FormContent>
          <Button size="lg">Save</Button>
          <Button size="lg" variant="tertiary">
            Cancel
          </Button>
        </FormContent>
      </FormRoot>
    </div>
  );
}
