import Image from "next/image";
import grinningCatEmoji from "@/assets/grinning-cat_1f63a.gif";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between gap-3 pt-3 pb-6">
      <div className="flex items-center gap-1.5">
        <Image alt="" height={28} src={grinningCatEmoji} width={28} />
        <h1 className="font-semibold text-lg">Maneki</h1>
      </div>
      <ThemeSwitcher />
    </header>
  );
};
