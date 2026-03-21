"use client";

import Image from "next/image";
import vomitingFaceEmoji from "@/assets/face-vomiting_1f92e.gif";
import nauseatedFaceEmoji from "@/assets/nauseated-face_1f922.gif";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

type FormProps = {
  defaultValue?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form = ({ defaultValue, onSubmit }: FormProps) => {
  return (
    <Card>
      <form className="grid gap-3" onSubmit={onSubmit}>
        <label className="grid gap-1.5">
          <span>Last food type</span>
          <select
            className="block bg-neutral-800 p-[1.5ch]"
            defaultValue={defaultValue}
            name="food_type"
          >
            <option value="dry">Dry food</option>
            <option value="wet">Wet food</option>
          </select>
        </label>
        <Button className="group" size="lg" type="submit" variant="primary">
          <div className="grid size-[1lh] place-items-center">
            <Image
              alt=""
              className="col-start-1 row-start-1 size-full transition-opacity group-hover:opacity-0"
              height={64}
              src={nauseatedFaceEmoji}
              width={64}
            />
            <Image
              alt=""
              className="col-start-1 row-start-1 size-full opacity-0 transition-opacity group-hover:opacity-100"
              height={64}
              src={vomitingFaceEmoji}
              width={64}
            />
          </div>
          Barf!
        </Button>
      </form>
    </Card>
  );
};
