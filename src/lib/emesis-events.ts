import { cacheLife, cacheTag, revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateEmesisFormSchema,
  EmesisFormSchema,
} from "@/app/events/emesis-form";
import { supabase } from "@/lib/supabase";

const CACHE_TAG = {
  LATEST: "emesis-latest",
  LIST: "emesis-events",
  SINGLE: (slug: string) => `emesis-event-${slug}`,
};

export const getEmesisEvents = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.LIST);

  const { data, error } = await supabase
    .from("emesis_events")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const getLatestEmesisEvent = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.LIST, CACHE_TAG.LATEST);

  const { data, error } = await supabase
    .from("emesis_events")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const getEmesisEvent = async (slug: string) => {
  "use cache";

  cacheLife("hours");
  cacheTag(CACHE_TAG.SINGLE(slug));

  const { data, error } = await supabase
    .from("emesis_events")
    .select("*, food ( *, type ( * ) )")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(`Fetch failed: ${error.message}`);

  return data;
};

export const createEmesisEvent = async (formData: FormData) => {
  "use server";

  const rawData = Object.fromEntries(formData.entries());
  const validated = CreateEmesisFormSchema.safeParse(rawData);

  if (!validated.success) {
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors));
  }

  const { error } = await supabase.from("emesis_events").insert(validated.data);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
};

export const updateEmesisEvent = async (formData: FormData) => {
  "use server";

  const rawData = Object.fromEntries(formData.entries());
  const validated = EmesisFormSchema.safeParse(rawData);

  if (!validated.success) {
    throw new Error(JSON.stringify(validated.error.flatten().fieldErrors));
  }

  const { slug, ...updateData } = validated.data;

  const { error } = await supabase
    .from("emesis_events")
    .update(updateData)
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
  revalidateTag(CACHE_TAG.SINGLE(slug), "max");

  revalidatePath(`/events/${slug}`);
};

export const deleteEmesisEvent = async (formData: FormData) => {
  "use server";

  const slug = formData.get("slug");

  if (typeof slug !== "string") throw new Error("Invalid slug");

  const { error } = await supabase
    .from("emesis_events")
    .update({ hidden: true })
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateTag(CACHE_TAG.LIST, "max");
  revalidateTag(CACHE_TAG.SINGLE(slug), "max");

  redirect("/events");
};
