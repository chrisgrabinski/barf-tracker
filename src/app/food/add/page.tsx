import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { FoodFields } from "@/app/food/fields";
import { Button } from "@/components/button";
import { FormContent, FormRoot } from "@/components/form";
import { IconButton } from "@/components/icon-button";
import { createFood } from "@/lib/database";

export default async function AddFoodPage() {
  return (
    <div className="grid gap-4">
      <IconButton asChild>
        <Link href="/food">
          <ChevronLeftIcon />
        </Link>
      </IconButton>
      <FormRoot action={createFood}>
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
