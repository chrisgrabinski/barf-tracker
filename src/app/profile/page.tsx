import { differenceInMonths } from "date-fns";
import { CakeIcon, WeightIcon } from "lucide-react";

import Image from "next/image";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { getCurrentWeight, getPet } from "@/lib/database";
import mitsyProfile from "../../../public/mitsy-profile.jpg";

const SLUG = "aa98b722-d8a8-4401-a8a0-77c31e3634da";

const birthDate = new Date("2016-08-18");
const now = new Date();

const getAge = (birthdate: Date) => {
  return (differenceInMonths(now, birthdate, {}) / 12).toFixed(1);
};

const getDisplayWeight = (value: number) => {
  return (value / 1000).toFixed(1);
};

export default async function ProfilePage() {
  const { data: weight } = await getCurrentWeight();

  const { data: pet } = await getPet(SLUG);

  if (!pet) {
    notFound();
  }

  return (
    <div className="grid gap-4">
      <Card className="flex items-center gap-6">
        <div className="size-32 overflow-clip rounded-full">
          <Image alt="" src={mitsyProfile} />
        </div>
        <div>
          <p className="flex gap-2 font-medium text-2xl">
            {pet.name}
            {pet.sex && <span>{pet.sex === "female" ? "♀️" : "♂️"}</span>}
          </p>
          <p className="flex gap-2 text-muted-foreground">
            <span>{pet.breed}</span>·<span>{pet.environment}</span>
          </p>
        </div>
      </Card>
      <Card className="grid gap-1.5">
        <CakeIcon className="text-accent" />
        {pet.birthdate && (
          <div>
            <span className="font-medium text-2xl">
              {getAge(new Date(pet.birthdate))}
            </span>{" "}
            <span className="text-muted-foreground">years</span>
          </div>
        )}
      </Card>
      <Card className="grid gap-1.5">
        <WeightIcon className="text-accent" />
        <div>
          <span className="font-medium text-2xl">
            {weight && getDisplayWeight(weight.value)}
          </span>{" "}
          <span className="text-muted-foreground">kg</span>
        </div>
      </Card>
      <Card className="flex gap-4">
        <div className="grid flex-1 gap-4">
          <div>
            <div className="font-medium text-lg">{pet.vet?.name}</div>
            <div>{pet.vet?.address_line_1}</div>
            <div>{pet.vet?.address_line_2}</div>
            <div>
              {pet.vet?.post_code} {pet.vet?.city}
            </div>
            <div>{pet.vet?.country}</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary"></div>
            {pet.doctor}
          </div>
        </div>
        <div className="size-16 overflow-clip rounded-xl">
          {pet.vet?.image && (
            <Image alt="" height={480} src={pet.vet.image} width={480} />
          )}
        </div>
      </Card>
    </div>
  );
}
