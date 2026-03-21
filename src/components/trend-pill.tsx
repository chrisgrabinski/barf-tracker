import type React from "react";
import type { Sentiment } from "@/lib/sentiment";
import {
  getDifference,
  getSentimentTrend,
  getTrend,
  type Trend,
} from "@/lib/trend";
import { Pill } from "./pill";
import { TrendIcon } from "./trend-icon";

type PillProps = React.ComponentProps<typeof Pill>;

const getSentimentTrendPillColor = (
  trend: Trend,
): NonNullable<PillProps["color"]> => {
  switch (trend) {
    case "up":
      return "green";
    case "down":
      return "red";
    case "neutral":
      return "yellow";
  }
};

interface TrendPillProps extends Omit<PillProps, "children" | "color"> {
  end: number;
  sentiment?: Sentiment;
  start: number;
}

const TrendPill = ({
  end,
  sentiment = "positive",
  start,
  ...props
}: TrendPillProps) => {
  const value = getDifference({ end, start });
  const trend = getTrend({ end, start });
  const sentimentTrend = getSentimentTrend({ end, sentiment, start });

  const pillColor = getSentimentTrendPillColor(sentimentTrend);

  return (
    <Pill color={pillColor} {...props}>
      <TrendIcon className="size-[0.75lh]" trend={trend} /> {value}
    </Pill>
  );
};

export { TrendPill };
