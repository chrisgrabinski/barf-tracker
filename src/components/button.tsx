import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button as ButtonPrimitive } from "@/primitives/button";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-[0.5ch] rounded-full px-[1ch] font-medium",
  {
    defaultVariants: {
      size: "md",
      variant: "secondary",
    },
    variants: {
      size: {
        lg: "h-12 text-xl [&*>svg]:h-6",
        md: "h-8 text-lg [&*>svg]:h-4",
        sm: "h-6 text-base [&*>svg]:h-3",
        xs: "h-4 text-sm [&*>svg]:h-2",
      },
      variant: {
        destructive: "bg-red-500",
        primary: "bg-accent",
        secondary: "bg-neutral-800",
        tertiary: "bg-transparent",
      },
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = React.ComponentProps<"button"> & ButtonVariants;

const Button = ({
  children,
  className,
  size,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

export { Button };
