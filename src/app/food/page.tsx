import { ForkKnifeIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/card";
import { IconButton } from "@/components/icon-button";
import { getFoods } from "@/lib/database";

type FoodProductProps = {
  name: string;
  type: string;
  slug: string;
  image?: string | null;
};

const FoodProduct = ({ name, slug, type, image }: FoodProductProps) => {
  return (
    <Link href={`/food/${slug}`}>
      <Card className="flex items-center gap-2">
        <div className="grid size-16 place-items-center overflow-clip rounded-xl bg-muted text-muted-foreground">
          {image ? (
            <Image alt="" height={128} src={image} width={128} />
          ) : (
            <ForkKnifeIcon className="size-6" />
          )}
        </div>
        <div className="grid gap-1">
          <div className="font-medium text-xl leading-none">{name}</div>
          <div className="text-muted-foreground leading-none">{type}</div>
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
          image={foodItem.image}
          key={foodItem.slug}
          name={foodItem.name}
          slug={foodItem.slug}
          type={foodItem.type.name}
        />
      ))}
    </div>
  );
}
