import { ForkKnifeIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/card";
import { IconButton } from "@/components/icon-button";
import { getFoods } from "@/lib/database";

type FoodProductProps = {
  name: string;
  type: string;
  slug: string;
};

const FoodProduct = ({ name, slug, type }: FoodProductProps) => {
  return (
    <Link href={`/food/${slug}`}>
      <Card className="flex items-center gap-4">
        <div className="grid size-16 place-items-center rounded-xl bg-muted text-muted-foreground">
          <ForkKnifeIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium">{name}</span>
          <span className="text-muted-foreground">{type}</span>
        </div>
      </Card>
    </Link>
  );
};

export default async function FoodPage() {
  const { data: food } = await getFoods();

  return (
    <div className="grid gap-4">
      <div>
        <IconButton asChild variant="primary">
          <Link href="/food/add">
            <PlusIcon />
          </Link>
        </IconButton>
      </div>
      {food?.map((foodItem) => (
        <FoodProduct
          key={foodItem.slug}
          name={foodItem.name}
          slug={foodItem.slug}
          type={foodItem.type.name}
        />
      ))}
    </div>
  );
}
