import colors from "tailwindcss/colors";
import type { Sentiment } from "./sentiment";

type Trend = "up" | "down" | "neutral";

const getDifference = ({ end, start }: { end: number; start: number }) => {
  return end - start;
};

/**
 * Returns the trend for a given start and end value.
 */
const getTrend = ({ end, start }: { end: number; start: number }): Trend => {
  const difference = getDifference({ end, start });

  if (difference > 0) {
    return "up";
  }

  if (difference < 0) {
    return "down";
  }

  return "neutral";
};

/**
 * Returns the sentimental trend for a given start and end value.
 */
const getSentimentTrend = ({
  end,
  start,
  sentiment,
}: {
  end: number;
  start: number;
  sentiment: Sentiment;
}): Trend => {
  if (sentiment === "negative") {
    return getTrend({ end: start, start: end });
  }

  return getTrend({ end, start });
};

const getTrendColorValue = (trend: Trend): string => {
  if (trend === "up") {
    return colors.green[500];
  }

  if (trend === "down") {
    return colors.red[500];
  }

  return colors.yellow[500];
};

export { getDifference, getTrend, getSentimentTrend, getTrendColorValue };
export type { Trend };
