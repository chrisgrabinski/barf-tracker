import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "@/lib/supabase";

export const getEvents = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("food");

  return supabase
    .from("data")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("created_at", { ascending: false });
};

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
