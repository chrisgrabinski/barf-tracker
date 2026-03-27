import { differenceInMonths } from "date-fns";
import { CakeIcon, WeightIcon } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import mitsyProfile from "../../../public/mitsy-profile.jpg";

const birthDate = new Date("2016-08-18");
const now = new Date();

const age = (differenceInMonths(now, birthDate, {}) / 12).toFixed(1);

export default function ProfilePage() {
  return (
    <div className="grid gap-4">
      <Heading level={1} size={6}>
        Profile
      </Heading>
      <Card className="flex items-center gap-6">
        <div className="size-32 overflow-clip rounded-full">
          <Image alt="" src={mitsyProfile} />
        </div>
        <div>
          <p className="font-medium text-2xl">Mitsy</p>
          <p className="flex gap-2 text-muted-foreground">
            <span>European Shorthair</span>·<span>Indoor</span>
          </p>
        </div>
      </Card>
      <Card className="grid gap-1.5">
        <CakeIcon className="text-accent" />
        <div>
          <span className="font-medium text-2xl">{age}</span>{" "}
          <span className="text-muted-foreground">years</span>
        </div>
      </Card>
      <Card className="grid gap-1.5">
        <WeightIcon className="text-accent" />
        <div>
          <span className="font-medium text-2xl">3.0</span>{" "}
          <span className="text-muted-foreground">kg</span>
        </div>
      </Card>
    </div>
  );
}
