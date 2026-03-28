import { Bar, Cell, BarChart as RechartsBarChart, YAxis } from "recharts";
import colors from "tailwindcss/colors";
import { cn } from "@/lib/utils";

/** Bottom-to-top stack order; last key is the top segment when present. */
const STACK_KEYS = ["wet", "dry"] as const;

type ChartRow = Record<(typeof STACK_KEYS)[number], number> & {
  displayDate: string;
};

function topStackKey(entry: ChartRow): (typeof STACK_KEYS)[number] | null {
  for (let i = STACK_KEYS.length - 1; i >= 0; i--) {
    const key = STACK_KEYS[i];
    if (entry[key] !== 0) return key;
  }
  return null;
}

export const BarChart = (
  props: React.ComponentProps<typeof RechartsBarChart>,
) => {
  const { data, ...rest } = props;
  const chartData = (data ?? []) as ChartRow[];
  const columnRadius: [number, number, number, number] = [12, 12, 0, 0];

  return (
    <RechartsBarChart data={data} {...rest}>
      <YAxis domain={[10, "dataMax"]} hide />
      <Bar
        dataKey="wet"
        fill={colors.lime[500]}
        radius={columnRadius}
        stackId="a"
      >
        {chartData.map((entry) => {
          const top = topStackKey(entry);
          return top === "wet" ? (
            <Cell key={`wet-${entry.displayDate}`} />
          ) : (
            <Cell key={`wet-${entry.displayDate}`} radius={0} />
          );
        })}
      </Bar>
      <Bar
        dataKey="dry"
        fill={colors.orange[500]}
        radius={columnRadius}
        stackId="a"
      >
        {chartData.map((entry) => {
          const top = topStackKey(entry);
          return top === "dry" ? (
            <Cell key={`dry-${entry.displayDate}`} />
          ) : (
            <Cell key={`dry-${entry.displayDate}`} radius={0} />
          );
        })}
      </Bar>
    </RechartsBarChart>
  );
};
