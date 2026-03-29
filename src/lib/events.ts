import { cacheLife, cacheTag, revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

const EMESIS_EVENT_LIST_TAG = "emesis-events";

export const getEmesisEvents = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag(EMESIS_EVENT_LIST_TAG);

  return supabase
    .from("emesis_events")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("created_at", { ascending: false });
};

export const getEmesisEvent = async (slug: string) => {
  "use cache";

  cacheLife("hours");
  cacheTag(slug);

  return supabase
    .from("emesis_events")
    .select("*, food ( *, type ( * ) )")
    .eq("slug", slug)
    .single();
};

export const createEmesisEvent = async (formData: FormData) => {
  "use server";

  const food = formData.get("food");
  const notes = formData.get("notes");

  await supabase.from("emesis_events").insert({
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

  if (typeof slug !== "string") {
    throw new Error("slug not a string.");
  }

  const food = formData.get("food");
  const notes = formData.get("notes");

  await supabase
    .from("emesis_events")
    .update({
      food: typeof food === "string" ? food || null : null,
      notes: typeof notes === "string" ? notes || null : null,
    })
    .eq("slug", slug);

  revalidateTag(EMESIS_EVENT_LIST_TAG, "max");
  revalidateTag(slug, "max");

  revalidatePath(`/events/${slug}`);
};

export const deleteEmesisEvent = async (formData: FormData) => {
  "use server";

  const slug = formData.get("slug");

  if (!slug) {
    throw new Error("slug not provided.");
  }

  if (typeof slug !== "string") {
    throw new Error("slug not a string.");
  }

  await supabase
    .from("emesis_events")
    .update({
      hidden: true,
    })
    .eq("slug", slug);

  revalidateTag(EMESIS_EVENT_LIST_TAG, "max");
  revalidateTag(slug, "max");

  redirect("/events");
};
