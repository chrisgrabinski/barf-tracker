import { cacheLife, cacheTag, revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateWeightFormSchema,
  WeightFormSchema,
} from "@/app/events/weight-form";
import { supabase } from "@/lib/supabase";

const CACHE_TAG = {
  LATEST: "weight-latest",
  LIST: "weight-events",
  SINGLE: (slug: string) => `weight-event-${slug}`,
};

export const getWeightEvents = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.LIST);

  const { data, error } = await supabase
    .from("weight_events")
    .select("*")
    .not("hidden", "is", true)
    .order("datetime", { ascending: false });

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const getLatestWeightEvent = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.LIST, CACHE_TAG.LATEST);

  const { data, error } = await supabase
    .from("weight_events")
    .select("*")
    .not("hidden", "is", true)
    .order("datetime", { ascending: false })
    .limit(1)
    .single();

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const getWeightEvent = async (slug: string) => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.SINGLE(slug));

  const { data, error } = await supabase
    .from("weight_events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const createWeightEvent = async (formData: FormData) => {
  "use server";

  const rawData = Object.fromEntries(formData.entries());
  const validated = CreateWeightFormSchema.safeParse(rawData);

  if (!validated.success) {
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors));
  }

  const { error } = await supabase.from("weight_events").insert(validated.data);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
};

export const updateWeightEvent = async (formData: FormData) => {
  "use server";

  const rawData = Object.fromEntries(formData.entries());
  const validated = WeightFormSchema.safeParse(rawData);

  if (!validated.success) {
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors));
  }

  const { slug, ...updateData } = validated.data;

  const { error } = await supabase
    .from("weight_events")
    .update(updateData)
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
  revalidateTag(CACHE_TAG.SINGLE(slug), "max");

  revalidatePath(`/events/${slug}`);
};

export const deleteWeightEvent = async (formData: FormData) => {
  "use server";

  const slug = formData.get("slug");

  if (typeof slug !== "string") throw new Error("Invalid slug");

  const { error } = await supabase
    .from("weight_events")
    .update({ hidden: true })
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
  revalidateTag(CACHE_TAG.SINGLE(slug), "max");

  redirect("/");
};
