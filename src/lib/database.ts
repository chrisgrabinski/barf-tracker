import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "@/lib/supabase";

export const getEvents = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("regurgitations");

  return supabase
    .from("data")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("created_at", { ascending: false });
};

export const getRegurgitationEvent = async (slug: string) => {
  "use cache";

  cacheLife("hours");
  cacheTag("regurgitation", slug);

  return supabase
    .from("data")
    .select("*, food ( *, type ( * ) )")
    .eq("slug", slug)
    .single();
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
