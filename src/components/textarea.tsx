import { cn } from "@/lib/utils";

export const Textarea = ({
  className,
  ...props
}: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      className={cn(
        "field-sizing box-content block min-h-[4lh] resize-none",
        className,
      )}
      rows={4}
      {...props}
    />
  );
};
