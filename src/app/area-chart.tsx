import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const AreaChart = (
  props: React.ComponentProps<typeof RechartsAreaChart>,
) => {
  return (
    <RechartsAreaChart margin={{ left: -45, right: 12, top: 15 }} {...props}>
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
      <Area dataKey="count" fill="#84cc16" type="monotone" />
    </RechartsAreaChart>
  );
};
