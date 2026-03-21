import type React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type WidgetRootProps = React.ComponentProps<typeof Card>;

const WidgetRoot = ({ children, ...props }: WidgetRootProps) => {
  return <Card {...props}>{children}</Card>;
};

type WidgetTitleProps = React.ComponentProps<"h3">;

const WidgetTitle = ({ children, className, ...props }: WidgetTitleProps) => {
  return (
    <h3 className={cn("font-medium text-neutral-400", className)} {...props}>
      {children}
    </h3>
  );
};

export { WidgetRoot, WidgetTitle };
