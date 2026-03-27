import { Slot } from "@radix-ui/react-slot";
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
        lg: "h-16 text-xl [&*>svg]:h-8",
        md: "h-12 text-lg [&*>svg]:h-6",
        sm: "h-8 text-base [&*>svg]:h-4",
        xs: "h-6 text-sm [&*>svg]:h-3",
      },
      variant: {
        destructive: "bg-red-500",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        tertiary: "bg-transparent",
      },
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ComponentProps<"button">, ButtonVariants {
  asChild?: boolean;
}

const Button = ({
  asChild,
  children,
  className,
  size,
  variant,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <ButtonPrimitive
      asChild
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    >
      <Component>{children}</Component>
    </ButtonPrimitive>
  );
};

export { Button };
