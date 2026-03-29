import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import grinningCatEmoji from "@/assets/grinning-cat_1f63a.gif";
import { IconButton } from "@/components/icon-button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between gap-3 py-4">
      <div className="flex items-center gap-1">
        <Image alt="" height={28} src={grinningCatEmoji} width={28} />
        <h1 className="font-semibold text-2xl">Catsup</h1>
      </div>
      <div className="flex items-center gap-2">
        <IconButton asChild variant="tertiary">
          <Link href="/settings">
            <SettingsIcon />
          </Link>
        </IconButton>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
