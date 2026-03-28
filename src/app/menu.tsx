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
      className="relative flex size-15 flex-col items-center justify-center gap-1 rounded-full"
    >
      <Link href={href}>
        <Icon className="relative z-10 size-5 transition will-change-transform" />
        <div className="relative z-10 font-medium text-xs leading-none opacity-80">
          {children}
        </div>
        <div
          className={cn(
            "absolute inset-0 scale-50 rounded-full bg-primary opacity-0 transition",
            isCurrentItem && "scale-100 opacity-100",
          )}
        />
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
