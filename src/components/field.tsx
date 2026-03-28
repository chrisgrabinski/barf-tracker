"use client";

import { Slot } from "radix-ui";
import type React from "react";
import { createContext, useContext, useId } from "react";
import { Interactive } from "@/components/interactive";
import { cn } from "@/lib/utils";

type FieldContextProps = {
  descriptionId: string;
  inputId: string;
  labelId: string;
  name: string;
};

const FieldContext = createContext<FieldContextProps | null>(null);

const useFieldContext = () => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error("useFieldContext must be used within FieldContext");
  }

  return context;
};

interface FieldRootProps extends React.ComponentProps<"div"> {
  name: string;
}

const FieldRoot = ({ children, className, name, ...props }: FieldRootProps) => {
  const descriptionId = useId();
  const inputId = useId();
  const labelId = useId();

  return (
    <FieldContext.Provider value={{ descriptionId, inputId, labelId, name }}>
      <div className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </FieldContext.Provider>
  );
};

type FieldLabelProps = React.ComponentProps<"label">;

const FieldLabel = ({ children, className, ...props }: FieldLabelProps) => {
  const { labelId, inputId } = useFieldContext();

  return (
    <label
      className={cn("text-sm uppercase tracking-wide", className)}
      htmlFor={inputId}
      id={labelId}
      {...props}
    >
      {children}
    </label>
  );
};

interface FieldInputProps extends React.ComponentProps<"input"> {
  asChild?: boolean;
}

const FieldInput = ({
  asChild,
  children,
  className,
  ...props
}: FieldInputProps) => {
  const { inputId, descriptionId, name } = useFieldContext();

  const Component = asChild ? Slot.Slot : "input";

  return (
    <Interactive>
      <Component
        aria-describedby={descriptionId}
        className={cn("block h-12 rounded-lg bg-input p-2", className)}
        id={inputId}
        name={name}
        {...props}
      >
        {children}
      </Component>
    </Interactive>
  );
};

type FieldDescriptionProps = React.ComponentProps<"div">;

const FieldDescription = ({
  children,
  className,
  ...props
}: FieldDescriptionProps) => {
  const { descriptionId } = useFieldContext();

  return (
    <div
      className={cn("text-muted-foreground text-sm", className)}
      id={descriptionId}
      {...props}
    >
      {children}
    </div>
  );
};

export { FieldRoot, FieldLabel, FieldInput, FieldDescription };
