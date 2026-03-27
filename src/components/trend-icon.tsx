import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  type LucideIcon,
} from "lucide-react";

type Trend = "up" | "down" | "neutral";

const getTrendArrowIcon = (trend: Trend) => {
  if (trend === "up") {
    return ArrowUpRightIcon;
  }
  if (trend === "down") {
    return ArrowDownRightIcon;
  }
  return ArrowRightIcon;
};

interface TrendArrowProps extends React.ComponentProps<LucideIcon> {
  trend: Trend;
}

const TrendIcon = ({ trend, ...props }: TrendArrowProps) => {
  const Component = getTrendArrowIcon(trend);

  return <Component {...props} />;
};

export { TrendIcon };
