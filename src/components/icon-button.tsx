import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva("inline-grid place-items-center p-0", {
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-16",
      md: "size-12",
      sm: "size-8",
      xs: "size-6",
    },
  },
});

type IconButtonVariants = VariantProps<typeof iconButtonVariants>;

type IconButtonProps = React.ComponentProps<typeof Button> & IconButtonVariants;

const IconButton = ({
  children,
  className,
  size,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      className={cn(iconButtonVariants({ className, size }))}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};

export { IconButton };
