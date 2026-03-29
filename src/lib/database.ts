import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "@/lib/supabase";

export const getWeights = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("weights");

  return supabase.from("weight_events").select("*");
};

export const getCurrentWeight = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("weights", "weight");

  return supabase
    .from("weight_events")
    .select("value")
    .order("datetime")
    .single();
};

export const getFoodTypes = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("food-types");

  return supabase.from("food_type").select("*");
};

export const getFoods = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("foods");

  return supabase.from("food").select("*, type ( * )").order("name");
};

export const getFoodItem = async (slug: string) => {
  "use cache";

  cacheLife("hours");
  cacheTag("foods");

  return supabase
    .from("food")
    .select("*, type ( * )")
    .eq("slug", slug)
    .single();
};

export const createFood = async (formData: FormData) => {
  "use server";

  const name = formData.get("name");
  const type = formData.get("type");
  const notes = formData.get("notes");

  if (!name) {
    throw new Error("name is required.");
  }

  if (typeof name !== "string") {
    throw new Error("name is not a string.");
  }

  await supabase.from("food").insert({
    name,
    notes: (notes as string) || null,
    type: type as string,
  });
};

export const getPet = async (slug: string) => {
  "use cache";

  cacheLife("hours");
  cacheTag("profile", "weight");

  if (!slug) {
    throw new Error("no slug provided.");
  }

  return supabase
    .from("pets")
    .select("*, clinic ( * ), doctor ( * )")
    .eq("slug", slug)
    .single();
};
