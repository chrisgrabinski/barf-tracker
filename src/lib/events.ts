import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { supabase } from "@/lib/supabase";

const EMESIS_EVENT_LIST_TAG = "emesis-events";
const EMESIS_EVENT_ITEM_TAG = "emesis-event";

export const getEmesisEvents = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag(EMESIS_EVENT_LIST_TAG);

  return supabase
    .from("data")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("created_at", { ascending: false });
};

export const getEmesisEvent = async (slug: string) => {
  "use cache";

  cacheLife("hours");
  cacheTag(EMESIS_EVENT_ITEM_TAG, slug);

  return supabase
    .from("data")
    .select("*, food ( *, type ( * ) )")
    .eq("slug", slug)
    .single();
};

export const createEmesisEvent = async (formData: FormData) => {
  "use server";

  const food = formData.get("food");
  const notes = formData.get("notes");

  await supabase.from("data").insert({
    food: typeof food === "string" ? food || null : null,
    notes: typeof notes === "string" ? notes || null : null,
  });

  revalidateTag(EMESIS_EVENT_LIST_TAG, "max");
};

export const updateEmesisEvent = async (formData: FormData) => {
  "use server";

  const slug = formData.get("slug");

  if (!slug) {
    throw new Error("No slug provided.");
  }

  const food = formData.get("food");
  const notes = formData.get("notes");

  await supabase
    .from("data")
    .update({
      food: typeof food === "string" ? food || null : null,
      notes: typeof notes === "string" ? notes || null : null,
    })
    .eq("slug", slug as string);

  revalidateTag(EMESIS_EVENT_LIST_TAG, "max");
};
