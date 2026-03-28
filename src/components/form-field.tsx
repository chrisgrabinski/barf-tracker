"use client";

import { Slot } from "radix-ui";
import type React from "react";
import { createContext, useContext, useId } from "react";
import { Interactive } from "@/components/interactive";
import { cn } from "@/lib/utils";

type FormFieldContextProps = {
  descriptionId: string;
  inputId: string;
  labelId: string;
  name: string;
};

const FormFieldContext = createContext<FormFieldContextProps | null>(null);

const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);

  if (!context) {
    throw new Error("useFormFieldContext must be used within FormFieldContext");
  }

  return context;
};

interface FormFieldRootProps extends React.ComponentProps<"div"> {
  name: string;
}

const FormFieldRoot = ({
  children,
  className,
  name,
  ...props
}: FormFieldRootProps) => {
  const descriptionId = useId();
  const inputId = useId();
  const labelId = useId();

  return (
    <FormFieldContext.Provider
      value={{ descriptionId, inputId, labelId, name }}
    >
      <div className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
};

type FormFieldLabelProps = React.ComponentProps<"label">;

const FormFieldLabel = ({
  children,
  className,
  ...props
}: FormFieldLabelProps) => {
  const { labelId, inputId } = useFormFieldContext();

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

interface FormFieldInputProps extends React.ComponentProps<"input"> {
  asChild?: boolean;
}

const FormFieldInput = ({
  asChild,
  children,
  className,
  ...props
}: FormFieldInputProps) => {
  const { inputId, descriptionId, name } = useFormFieldContext();

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

type FormFieldDescriptionProps = React.ComponentProps<"div">;

const FormFieldDescription = ({
  children,
  className,
  ...props
}: FormFieldDescriptionProps) => {
  const { descriptionId } = useFormFieldContext();

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

export { FormFieldRoot, FormFieldLabel, FormFieldInput, FormFieldDescription };
