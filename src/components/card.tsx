import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("overflow-clip rounded-3xl p-4 text-card", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "bg-card",
      glass: "bg-card/70 backdrop-blur-md backdrop-saturate-150",
    },
  },
});

type CardVariants = VariantProps<typeof cardVariants>;

type CardProps = React.ComponentProps<"div"> & CardVariants;

const Card = ({ children, className, variant, ...props }: CardProps) => {
  return (
    <div className={cn(cardVariants({ className, variant }))} {...props}>
      {children}
    </div>
  );
};

export { Card };
