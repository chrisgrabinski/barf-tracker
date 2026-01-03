"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ToggleGroup } from "radix-ui";
import { cn } from "@/lib/utils";
import { Button } from "@/primitives/button";

const segmentedControlVariants = cva(
  "flex gap-1 rounded-full bg-neutral-900 p-[0.333ch] font-medium ring-1 ring-neutral-800",
  {
    defaultVariants: {
      size: 2,
    },
    variants: {
      size: {
        1: "h-6 text-xs",
        2: "h-8 text-sm",
        3: "h-10 text-base",
      },
    },
  },
);

type SegmentedControlVariants = VariantProps<typeof segmentedControlVariants>;

type SegmentedControlRootProps = Omit<
  ToggleGroup.ToggleGroupSingleProps,
  "type"
> &
  SegmentedControlVariants;

const SegmentedControlRoot = ({
  children,
  className,
  size,
  onValueChange,
  ...props
}: SegmentedControlRootProps) => {
  const handleValueChange = (value: string) => {
    if (!value) {
      return;
    }

    onValueChange?.(value);
  };

  return (
    <ToggleGroup.Root
      className={segmentedControlVariants({
        className,
        size,
      })}
      onValueChange={handleValueChange}
      type="single"
      {...props}
    >
      {children}
    </ToggleGroup.Root>
  );
};

type SegmentedControlItemProps = React.ComponentProps<typeof ToggleGroup.Item>;

const SegmentedControlItem = ({
  asChild,
  children,
  className,
  ...props
}: SegmentedControlItemProps) => {
  return (
    <ToggleGroup.Item
      asChild
      className={cn(
        "rounded-full",
        "px-[1ch] transition hover:bg-neutral-800 data-[state=off]:cursor-pointer data-[state=on]:bg-lime-500 data-[state=on]:text-lime-950",
        className,
      )}
      {...props}
    >
      <Button asChild={asChild}>{children}</Button>
    </ToggleGroup.Item>
  );
};

export { SegmentedControlRoot, SegmentedControlItem };
