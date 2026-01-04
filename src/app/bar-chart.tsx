import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

export const BarChart = (
  props: React.ComponentProps<typeof RechartsBarChart>,
) => {
  console.log(props);

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
      <Bar dataKey="wet" fill={colors.lime[600]} stackId="a" />
      <Bar dataKey="dry" fill={colors.orange[400]} stackId="a" />
      <Legend />
    </RechartsBarChart>
  );
};
