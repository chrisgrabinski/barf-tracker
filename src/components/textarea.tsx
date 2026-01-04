export const Textarea = ({ ...props }: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      className="field-sizing block min-h-[3lh] resize-none rounded-lg bg-neutral-900 p-3 ring-1 ring-neutral-700"
      rows={3}
      {...props}
    />
  );
};
