"use client";

import {
  ActivityIcon,
  ForkKnifeIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  PawPrintIcon,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Interactive } from "@/components/interactive";
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

  const isCurrentItem =
    href === "/" ? pathname === href : pathname.includes(href);

  return (
    <Interactive>
      <Button
        asChild
        className={cn(
          "relative flex h-14 flex-1 flex-col items-center justify-center gap-1 rounded-full",
          isCurrentItem && "text-primary-foreground",
        )}
      >
        <Link
          // @ts-expect-error Types need to be adjusted
          href={href}
        >
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
    </Interactive>
  );
};

const Menu = () => {
  return (
    <>
      <MenuItem href="/" icon={LayoutDashboardIcon}>
        Home
      </MenuItem>
      <MenuItem href="/report" icon={WandSparkles}>
        Report
      </MenuItem>
      <MenuItem href="/events" icon={ActivityIcon}>
        Events
      </MenuItem>
      <MenuItem href="/food" icon={ForkKnifeIcon}>
        Food
      </MenuItem>
      <MenuItem href="/profile" icon={PawPrintIcon}>
        Profile
      </MenuItem>
    </>
  );
};

export { Menu };
