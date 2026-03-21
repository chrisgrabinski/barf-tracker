import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const iconButtonVariants = cva("inline-grid place-items-center p-0", {
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-12",
      md: "size-8",
      sm: "size-6",
      xs: "size-4",
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
    <Button className={cn(iconButtonVariants({ className, size }))} {...props}>
      {children}
    </Button>
  );
};

export { IconButton };
