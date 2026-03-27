import { useId } from "react";
import { Area, AreaChart } from "recharts";
import colors from "tailwindcss/colors";
import { TrendPill } from "@/components/trend-pill";
import { WidgetRoot, WidgetTitle } from "@/components/widget";
import type { Sentiment } from "@/lib/sentiment";
import { getSentimentTrend, getTrendColorValue } from "@/lib/trend";

type ChartProps = {
  data: Array<number>;
  end: number;
  sentiment: Sentiment;
  start?: number;
};

const Chart = ({ data, sentiment, start, end }: ChartProps) => {
  const linearGradientId = useId();

  const color = start
    ? getTrendColorValue(
        getSentimentTrend({
          end,
          sentiment,
          start,
        }),
      )
    : colors.violet[600];

  return (
    <AreaChart
      data={data.map((item) => ({ value: item }))}
      responsive
      style={{
        aspectRatio: 2.125,
        width: "100%",
      }}
    >
      <defs>
        <linearGradient id={linearGradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.5} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        activeDot={{ display: "none" }}
        dataKey="value"
        dot={{ display: "none" }}
        fill={`url(#${linearGradientId})`}
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2}
        type="monotone"
      />
    </AreaChart>
  );
};

type StatProps = {
  data?: ChartProps["data"];
  label: string;
  previousValue?: number;
  sentiment?: Sentiment;
  value: number;
};

const Stat = ({
  data,
  label,
  previousValue,
  sentiment = "positive",
  value,
}: StatProps) => {
  return (
    <WidgetRoot>
      <WidgetTitle>{label}</WidgetTitle>
      <div className="flex items-center gap-2 font-medium text-3xl">
        {value}
        {previousValue && (
          <TrendPill end={value} sentiment={sentiment} start={previousValue} />
        )}
      </div>
      {data && (
        <Chart
          data={data}
          end={value}
          sentiment={sentiment}
          start={previousValue}
        />
      )}
    </WidgetRoot>
  );
};

export { Stat };
