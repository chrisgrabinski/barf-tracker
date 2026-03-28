import { Slot } from "radix-ui";

type InteractiveProps = { children: React.ReactNode };

const Interactive = ({ children }: InteractiveProps) => {
  return (
    <Slot.Slot className="outline-accent outline-offset-3 focus-visible:outline-2">
      {children}
    </Slot.Slot>
  );
};

export { Interactive };
