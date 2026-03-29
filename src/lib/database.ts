import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "@/lib/supabase";

export const getWeights = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("weights");

  return supabase.from("weight").select("*");
};

export const getCurrentWeight = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("weights", "weight");

  return supabase.from("weight").select("value").single();
};

export const getFoods = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("foods");

  return supabase.from("food").select("*, type ( * )");
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
