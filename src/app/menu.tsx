"use client";

import {
  ActivityIcon,
  FishIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  PawPrintIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/primitives/button";

const MenuItem = ({
  children,
  icon: Icon,
  href,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  href: string;
}) => {
  const pathname = usePathname();

  const isCurrentItem = pathname === href;

  return (
    <Button
      asChild
      className={cn(
        "flex size-16 flex-col items-center justify-center gap-1 rounded-full bg-transparent",
        isCurrentItem && "bg-primary",
      )}
    >
      <Link href={href}>
        <Icon
          className={cn(
            "size-6 transition will-change-transform",
            isCurrentItem && "scale-110",
          )}
        />
        <div className="font-medium text-xs leading-none opacity-80">
          {children}
        </div>
      </Link>
    </Button>
  );
};

const Menu = () => {
  return (
    <>
      <MenuItem href="/" icon={LayoutDashboardIcon}>
        Home
      </MenuItem>
      <MenuItem href="/activity" icon={ActivityIcon}>
        Activity
      </MenuItem>
      <MenuItem href="/food" icon={FishIcon}>
        Food
      </MenuItem>
      <MenuItem href="/profile" icon={PawPrintIcon}>
        Profile
      </MenuItem>
    </>
  );
};

export { Menu };
