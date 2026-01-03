"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { ChevronDownIcon } from "lucide-react";
import {
  type ComponentPropsWithRef,
  createContext,
  useContext,
  useState,
} from "react";

interface DataListRootProps extends ComponentPropsWithRef<"dl"> {
  asChild?: boolean;
}

const DataListRoot = ({ asChild, children, ...props }: DataListRootProps) => {
  const Component = asChild ? Slot : "dl";

  return <Component {...props}>{children}</Component>;
};

interface DataListItemProps extends ComponentPropsWithRef<"div"> {
  asChild?: boolean;
}

const DataListItem = ({ asChild, children, ...props }: DataListItemProps) => {
  const Component = asChild ? Slot : "div";

  return <Component {...props}>{children}</Component>;
};

interface DataListLabelProps extends ComponentPropsWithRef<"dt"> {
  asChild?: boolean;
}

const DataListLabel = ({ asChild, children, ...props }: DataListLabelProps) => {
  const Component = asChild ? Slot : "dt";

  return <Component {...props}>{children}</Component>;
};

interface DataListValueProps extends ComponentPropsWithRef<"dd"> {
  asChild?: boolean;
}

const DataListValue = ({ asChild, children, ...props }: DataListValueProps) => {
  const Component = asChild ? Slot : "dd";

  return <Component {...props}>{children}</Component>;
};

type DataListSubContextProps = { open: boolean };

const DEFAULT_DATA_LIST_SUB_CONTEXT: DataListSubContextProps = {
  open: false,
};

const DataListSubContext = createContext<DataListSubContextProps>(
  DEFAULT_DATA_LIST_SUB_CONTEXT,
);

const useDataListSub = () => {
  const context = useContext(DataListSubContext);

  if (!context) {
    throw new Error("useDataListSub must be used within DataListSubContext");
  }

  return context;
};

const DataListSub = ({
  children,
  defaultOpen = DEFAULT_DATA_LIST_SUB_CONTEXT.open,
  open: providedOpen,
  onOpenChange,
  ...props
}: ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>) => {
  const [open, setOpen] = useState(defaultOpen);

  const hasProvidedOpen = typeof providedOpen === "boolean";

  const openState = hasProvidedOpen ? providedOpen : open;

  const handleOpenChange = () => {
    const nextOpenState = !openState;

    setOpen(nextOpenState);
    onOpenChange?.(nextOpenState);
  };

  return (
    <DataListSubContext.Provider value={{ open: openState }}>
      <CollapsiblePrimitive.Root
        onOpenChange={handleOpenChange}
        open={openState}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </DataListSubContext.Provider>
  );
};

const DataListSubTrigger = ({
  asChild,
  children,
  ...props
}: ComponentPropsWithRef<typeof CollapsiblePrimitive.Trigger>) => {
  const Component = asChild ? Slot : "dt";

  return (
    <Component>
      <CollapsiblePrimitive.Trigger {...props}>
        <Slottable>{children}</Slottable>
      </CollapsiblePrimitive.Trigger>
    </Component>
  );
};

interface DataListSubIndicatorProps extends ComponentPropsWithRef<"svg"> {
  asChild?: boolean;
}

const DataListSubIndicator = ({
  asChild,
  children,
  ...props
}: DataListSubIndicatorProps) => {
  const { open } = useDataListSub();

  const stateProps = {
    "data-state": open ? "open" : "closed",
  };

  if (asChild) {
    return <Slot {...stateProps} />;
  }

  return <ChevronDownIcon {...stateProps} {...props} />;
};

const DataListSubContent = ({
  asChild,
  children,
  ...props
}: ComponentPropsWithRef<typeof CollapsiblePrimitive.Content>) => {
  const Component = asChild ? Slot : "dd";

  return (
    <CollapsiblePrimitive.Content asChild {...props}>
      <Component>{children}</Component>
    </CollapsiblePrimitive.Content>
  );
};

const Root = DataListRoot;
const Item = DataListItem;
const Label = DataListLabel;
const Value = DataListValue;
const Sub = DataListSub;
const SubTrigger = DataListSubTrigger;
const SubIndicator = DataListSubIndicator;
const SubContent = DataListSubContent;

export {
  DataListRoot,
  DataListItem,
  DataListLabel,
  DataListValue,
  DataListSub,
  DataListSubTrigger,
  DataListSubIndicator,
  DataListSubContent,
  Root,
  Item,
  Label,
  Value,
  Sub,
  SubTrigger,
  SubIndicator,
  SubContent,
};
