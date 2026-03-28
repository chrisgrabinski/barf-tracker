import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const cardVariants = cva("overflow-clip rounded-3xl p-4 text-card-foreground", {
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

interface CardProps extends React.ComponentProps<"div">, CardVariants {
  asChild?: boolean;
}

const Card = ({
  asChild,
  children,
  className,
  variant,
  ...props
}: CardProps) => {
  const Component = asChild ? Slot.Slot : "div";

  return (
    <Component className={cn(cardVariants({ className, variant }))} {...props}>
      {children}
    </Component>
  );
};

export { Card };
