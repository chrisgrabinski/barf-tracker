"use client";

import { Button } from "@/components/button";
import { supabase } from "@/lib/supabase";

const DeleteRegurgitationEvent = ({ slug }: { slug: string }) => {
  const handleDelete = async () => {
    try {
      const { error: updateError } = await supabase
        .from("data")
        .update({
          hidden: true,
          updated_at: new Date().toISOString(),
        })
        .eq("slug", slug);

      if (updateError) throw updateError;
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  return <Button onClick={handleDelete}>Delete</Button>;
};

export { DeleteRegurgitationEvent };
