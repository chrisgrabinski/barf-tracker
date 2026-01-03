import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const BarChart = (
  props: React.ComponentProps<typeof RechartsBarChart>,
) => {
  return (
    <RechartsBarChart margin={{ left: -45, right: 12, top: 15 }} {...props}>
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
      <Bar dataKey="count" fill="#84cc16" radius={[12, 12, 0, 0]} />
    </RechartsBarChart>
  );
};
