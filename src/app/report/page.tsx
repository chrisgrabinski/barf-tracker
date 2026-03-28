import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { z } from "zod";
import { Card } from "@/components/card";
import { Heading } from "@/components/heading";

import { getEvents } from "@/lib/database";

const reportSchema = z.object({
  diagnosis: z.string(),
  suggestions: z.string(),
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
    prompt: `Our cat regurgitates frequently. We are tracking events, including information about food as well as some notes. Analyze the data, summarize it, and provide a diagnosis and tips:
    
    ${dataJson}
    `,
    system: "",
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
  const { data: rows, error } = await getEvents();
  if (error) {
    throw new Error(error.message);
  }

  const dataJson = JSON.stringify(rows ?? []);
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
      <Card className="grid gap-2">
        <Heading level={2} size={5}>
          Suggestions
        </Heading>
        <p>{report.suggestions}</p>
      </Card>
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
