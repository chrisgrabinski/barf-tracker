import { ForkKnifeIcon } from "lucide-react";
import { Card } from "@/components/card";

import { getFoods } from "@/lib/database";

type FoodProductProps = {
  name: string;
  type: string;
};

const FoodProduct = ({ name, type }: FoodProductProps) => {
  return (
    <Card className="flex items-center gap-4">
      <div className="grid size-16 place-items-center rounded-xl bg-muted text-muted-foreground">
        <ForkKnifeIcon className="size-6" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{type}</span>
      </div>
    </Card>
  );
};

export default async function FoodPage() {
  const { data: food } = await getFoods();

  return (
    <div className="grid gap-4">
      {food?.map((foodItem) => (
        <FoodProduct
          key={foodItem.slug}
          name={foodItem.name}
          type={foodItem.type.name}
        />
      ))}
    </div>
  );
}
