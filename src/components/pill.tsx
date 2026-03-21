import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "inline-flex h-6 items-center gap-[0.25ch] rounded-full px-[0.75ch] font-medium text-sm text-white",
  {
    defaultVariants: {
      color: "grey",
    },
    variants: {
      color: {
        green: "bg-green-500",
        grey: "bg-neutral-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
      },
    },
  },
);

interface PillProps
  extends Omit<React.ComponentProps<"span">, "color">,
    VariantProps<typeof cardVariants> {}

const Pill = ({ children, className, color, ...props }: PillProps) => {
  return (
    <span className={cn(cardVariants({ className, color }))} {...props}>
      {children}
    </span>
  );
};

export { Pill };
