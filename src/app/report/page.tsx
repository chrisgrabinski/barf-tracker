import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { z } from "zod";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { getEmesisEvents } from "@/lib/emesis-events";

const reportSchema = z.object({
  diagnosis: z.string(),
  suggestions: z.array(
    z.object({
      description: z.string("The description for the suggested action"),
      id: z.uuid(),
      title: z.string("The suggested action"),
    }),
  ),
  summary: z.string(),
});

type ReportOutput = z.infer<typeof reportSchema>;

/** Cached by Next.js; cache key includes `dataJson`, so a new LLM run only happens when tracked rows change. */
async function getReportFromModel(dataJson: string): Promise<ReportOutput> {
  "use cache";
  cacheLife("max");
  cacheTag("report");

  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY,
  });

  const result = await generateText({
    model: openrouter("anthropic/claude-sonnet-4.5"),
    output: Output.object({
      schema: reportSchema,
    }),
    prompt: `Our cat pukes frequently. We are tracking events, including information about food as well as some notes.

    - Analyze the provided data.
    - Return a short summary, not longer than a tweet. 
    - Return a diagnosis based on the provided data, not longer than two tweets.
    - Return 3 suggestions for things to try to stop emesis for the cat.

    Here is the data:
    
    ${dataJson}
    `,
  });

  return reportSchema.parse(result.output);
}

function ReportSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card className="grid gap-2" key={i}>
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="h-20 animate-pulse rounded bg-muted/70" />
        </Card>
      ))}
    </div>
  );
}

async function ReportContent() {
  const events = await getEmesisEvents();

  const dataJson = JSON.stringify(events ?? []);
  const report = await getReportFromModel(dataJson);

  return (
    <div className="grid gap-4">
      <Card className="grid gap-2">
        <Heading level={2} size={5}>
          Summary
        </Heading>
        <p>{report.summary}</p>
      </Card>
      <Card className="grid gap-2">
        <Heading level={2} size={5}>
          Diagnosis
        </Heading>
        <p>{report.diagnosis}</p>
      </Card>
      <Heading className="px-4" level={2} size={5}>
        Suggestions
      </Heading>
      <ul className="grid gap-4">
        {report.suggestions.map((suggestion, index) => (
          <Card asChild key={suggestion.id}>
            <li className="flex items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-primary font-semibold text-primary text-xl">
                {index + 1}
              </div>
              <div className="grid gap-2">
                <div className="font-medium text-xl">{suggestion.title}</div>
                <div>{suggestion.description}</div>
              </div>
            </li>
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<ReportSkeleton />}>
      <ReportContent />
    </Suspense>
  );
}
