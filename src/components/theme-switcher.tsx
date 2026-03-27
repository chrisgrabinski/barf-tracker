"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IconButton } from "./icon-button";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div>
      <IconButton
        className={cn(resolvedTheme === "light" && "hidden")}
        onClick={toggleTheme}
      >
        <SunIcon />
      </IconButton>
      <IconButton
        className={cn(resolvedTheme === "dark" && "hidden")}
        onClick={toggleTheme}
      >
        <MoonIcon />
      </IconButton>
    </div>
  );
};

export { ThemeSwitcher };
