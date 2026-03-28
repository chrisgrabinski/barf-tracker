import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { z } from "zod";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { supabase } from "@/lib/supabase";

const openrouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const getData = async () => {
  return supabase
    .from("data")
    .select("*, food ( *, type ( * ) )")
    .not("hidden", "is", true)
    .order("created_at", { ascending: false });
};

export default async function ReportPage() {
  const data = await getData();

  const { output } = await generateText({
    model: openrouter("anthropic/claude-sonnet-4.5"),
    output: Output.object({
      schema: z.object({
        diagnosis: z.string(),
        suggestions: z.string(),
        summary: z.string(),
      }),
    }),
    prompt: `Our cat regurgitates frequently. We are tracking events, including information about food as well as some notes. Analyze the data, summarize it, and provide a diagnosis and tips:
    
    ${JSON.stringify(data)}
    `,
    system: "",
  });

  return (
    <div className="grid gap-4">
      <Card className="grid gap-2">
        <Heading level={2} size={5}>
          Summary
        </Heading>
        <p>{output.summary}</p>
      </Card>
      <Card className="grid gap-2">
        <Heading level={2} size={5}>
          Diagnosis
        </Heading>
        <p>{output.diagnosis}</p>
      </Card>
      <Card className="grid gap-2">
        <Heading level={2} size={5}>
          Suggestions
        </Heading>
        <p>{output.suggestions}</p>
      </Card>
    </div>
  );
}
