import { cn } from "@/lib/utils";

export const Textarea = ({
  className,
  ...props
}: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      className={cn("field-sizing block min-h-[3lh] resize-none", className)}
      rows={3}
      {...props}
    />
  );
};
