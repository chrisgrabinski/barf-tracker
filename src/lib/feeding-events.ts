import { cacheLife, cacheTag, revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateFeedingFormSchema,
  FeedingFormSchema,
} from "@/app/events/feeding-form";
import { supabase } from "@/lib/supabase";

const CACHE_TAG = {
  LATEST: "feeding-latest",
  LIST: "feeding-events",
  SINGLE: (slug: string) => `feeding-event-${slug}`,
};

export const getFeedingEvents = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.LIST);

  const { data, error } = await supabase
    .from("feeding_events")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("datetime", { ascending: false });

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const getLatestFeedingEvent = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.LIST, CACHE_TAG.LATEST);

  const { data, error } = await supabase
    .from("feeding_events")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("datetime", { ascending: false })
    .limit(1)
    .single();

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const getFeedingEvent = async (slug: string) => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.SINGLE(slug));

  const { data, error } = await supabase
    .from("feeding_events")
    .select("*, food ( *, type ( * ) )")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const createFeedingEvent = async (formData: FormData) => {
  "use server";

  const rawData = Object.fromEntries(formData.entries());
  const validated = CreateFeedingFormSchema.safeParse(rawData);

  if (!validated.success) {
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors));
  }

  const { error } = await supabase
    .from("feeding_events")
    .insert(validated.data);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
};

export const updateFeedingEvent = async (formData: FormData) => {
  "use server";

  const rawData = Object.fromEntries(formData.entries());
  const validated = FeedingFormSchema.safeParse(rawData);

  if (!validated.success) {
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors));
  }

  const { slug, ...updateData } = validated.data;

  const { error } = await supabase
    .from("feeding_events")
    .update(updateData)
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
  revalidateTag(CACHE_TAG.SINGLE(slug), "max");

  revalidatePath(`/events/${slug}`);
};

export const deleteFeedingEvent = async (formData: FormData) => {
  "use server";

  const slug = formData.get("slug");

  if (typeof slug !== "string") throw new Error("Invalid slug");

  const { error } = await supabase
    .from("feeding_events")
    .update({ hidden: true })
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
  revalidateTag(CACHE_TAG.SINGLE(slug), "max");

  redirect("/");
};
