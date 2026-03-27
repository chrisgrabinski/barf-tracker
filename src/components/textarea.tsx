export const Textarea = ({ ...props }: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      className="field-sizing block min-h-[3lh] resize-none rounded-lg border border-border bg-input p-3"
      rows={3}
      {...props}
    />
  );
};
