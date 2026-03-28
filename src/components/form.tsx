import type React from "react";
import { cn } from "@/lib/utils";

type FormRootProps = React.ComponentProps<"form">;

const FormRoot = ({ children, className, ...props }: FormRootProps) => {
  return (
    <form className={cn("grid gap-8", className)} {...props}>
      {children}
    </form>
  );
};

type FormContentProps = React.ComponentProps<"div">;

const FormContent = ({ children, className, ...props }: FormContentProps) => {
  return (
    <div className={cn("grid gap-4", className)} {...props}>
      {children}
    </div>
  );
};

export { FormRoot, FormContent };
