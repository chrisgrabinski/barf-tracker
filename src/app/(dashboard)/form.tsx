"use client";

import { NotebookPenIcon } from "lucide-react";
import Image from "next/image";
import vomitingFaceEmoji from "@/assets/face-vomiting_1f92e.gif";
import nauseatedFaceEmoji from "@/assets/nauseated-face_1f922.gif";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import {
  FormFieldDescription,
  FormFieldInput,
  FormFieldLabel,
  FormFieldRoot,
} from "@/components/form-field";
import { Textarea } from "@/components/textarea";

type FormProps = {
  defaultValue?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form = ({ defaultValue, onSubmit }: FormProps) => {
  return (
    <Card className="grid gap-4">
      <div className="flex items-center gap-1.5 font-semibold text-xl">
        <div className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
          <NotebookPenIcon className="size-5" />
        </div>
        Quick log
      </div>
      <form className="grid gap-4" onSubmit={onSubmit}>
        <FormFieldRoot name="food_type">
          <FormFieldLabel>Food type</FormFieldLabel>
          <FormFieldInput asChild>
            <select defaultValue={defaultValue}>
              <option value="dry">Dry food</option>
              <option value="wet">Wet food</option>
            </select>
          </FormFieldInput>
        </FormFieldRoot>
        <FormFieldRoot name="notes">
          <FormFieldLabel>Notes</FormFieldLabel>
          <FormFieldInput asChild>
            <Textarea />
          </FormFieldInput>
        </FormFieldRoot>
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
