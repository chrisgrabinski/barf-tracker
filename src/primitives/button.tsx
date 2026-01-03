"use client";

import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends React.ComponentProps<"button"> {
  /**
   * Renders the component as the child element.
   */
  asChild?: boolean;
  /**
   * Sets aria-disabled attribute and prevents interaction with the button.
   */
  disabled?: boolean;
  /**
   * Sets aria-busy attribute and prevents interaction with the button.
   */
  loading?: boolean;
}

/**
 * An interactive component for performing user actions.
 */
export const Button = ({
  asChild,
  disabled = false,
  loading = false,
  onClick,
  type,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  const defaultButtonType = !asChild ? "button" : undefined;

  const isNonInteractive = disabled || loading;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isNonInteractive) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <Component
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      type={type || defaultButtonType}
      {...props}
    />
  );
};
