"use client";

import { NotebookPenIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import vomitingFaceEmoji from "@/assets/face-vomiting_1f92e.gif";
import nauseatedFaceEmoji from "@/assets/nauseated-face_1f922.gif";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import {
  FormFieldInput,
  FormFieldLabel,
  FormFieldRoot,
} from "@/components/form-field";
import { Textarea } from "@/components/textarea";
import { supabase } from "@/lib/supabase";
import type { Food } from "@/lib/types";

type FormProps = {
  defaultValue?: string;
};

export const Form = ({ defaultValue }: FormProps) => {
  const [food, setFood] = useState<Food[]>([]);

  const fetchFood = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("food")
        .select("*");

      if (fetchError) throw fetchError;

      setFood(data || []);
    } catch (err) {
      console.error("Error fetching food:", err);
    }
  }, []);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const foodType = formData.get("food") as string;
    const notes = formData.get("notes") as string;

    try {
      const { data, error: insertError } = await supabase
        .from("data")
        .insert([{ food: foodType || null, notes: notes || null }])
        .select()
        .single();

      if (insertError) throw insertError;
    } catch (err) {
      console.error("Error adding entry:", err);
    }
  };

  return (
    <Card className="grid gap-4">
      <div className="flex items-center gap-1.5 font-semibold text-xl">
        <div className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
          <NotebookPenIcon className="size-5" />
        </div>
        Quick log
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <FormFieldRoot name="food">
          <FormFieldLabel>Food type</FormFieldLabel>
          <FormFieldInput asChild>
            <select defaultValue={defaultValue}>
              {food.map((foodItem) => (
                <option key={foodItem.slug} value={foodItem.slug}>
                  {foodItem.name}
                </option>
              ))}
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
