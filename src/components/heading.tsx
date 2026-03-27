import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-medium", {
  defaultVariants: {
    size: 3,
  },
  variants: {
    size: {
      1: "text-sm",
      2: "text-md",
      3: "text-lg",
      4: "text-xl",
      5: "text-2xl",
      6: "text-3xl",
    },
  },
});

type HeadingVariants = VariantProps<typeof headingVariants>;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const getHeadingComponent = (level: HeadingLevel) => {
  switch (level) {
    case 1:
      return "h1";
    case 2:
      return "h2";
    case 3:
      return "h3";
    case 4:
      return "h4";
    case 5:
      return "h5";
    case 6:
      return "h6";
  }
};

interface HeadingProps extends React.ComponentProps<"h1">, HeadingVariants {
  asChild?: boolean;
  level: HeadingLevel;
}

const Heading = ({
  asChild,
  children,
  className,
  level,
  size,
  ...props
}: HeadingProps) => {
  const Component = asChild ? Slot : getHeadingComponent(level);

  return (
    <Component className={cn(headingVariants({ className, size }))} {...props}>
      {children}
    </Component>
  );
};

export { Heading };
