import {
  Area,
  CartesianGrid,
  Legend,
  AreaChart as RechartsAreaChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

export const AreaChart = (
  props: React.ComponentProps<typeof RechartsAreaChart>,
) => {
  return (
    <RechartsAreaChart margin={{ left: -45, right: 12, top: 15 }} {...props}>
      <defs>
        <linearGradient id="colorWet" x1="0" x2="0" y1="0" y2="1">
          <stop offset="5%" stopColor={colors.lime[500]} stopOpacity={0.8} />
          <stop offset="95%" stopColor={colors.lime[500]} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorDry" x1="0" x2="0" y1="0" y2="1">
          <stop offset="5%" stopColor={colors.orange[500]} stopOpacity={0.8} />
          <stop offset="95%" stopColor={colors.orange[500]} stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="#404040" strokeDasharray="4 4" />
      <XAxis
        dataKey="displayDate"
        stroke="#a3a3a3"
        style={{ fontSize: "12px" }}
      />
      <YAxis stroke="#a3a3a3" style={{ fontSize: "12px" }} />
      <Tooltip
        contentStyle={{
          backgroundColor: "#171717",
          border: "1px solid #404040",
          borderRadius: "6px",
          color: "#fff",
        }}
        labelStyle={{ color: "#a3a3a3" }}
      />

      <Area
        dataKey="dry"
        fill="url(#colorDry)"
        stroke={colors.orange[500]}
        type="monotone"
      />
      <Area
        dataKey="wet"
        fill="url(#colorWet)"
        stroke={colors.lime[500]}
        type="monotone"
      />
      <Legend />
    </RechartsAreaChart>
  );
};
