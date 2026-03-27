"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "./icon-button";

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();

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
        className={resolvedTheme === "light" ? "hidden" : undefined}
        onClick={toggleTheme}
      >
        <SunIcon />
      </IconButton>
      <IconButton
        className={resolvedTheme === "dark" ? "hidden" : undefined}
        onClick={toggleTheme}
      >
        <MoonIcon />
      </IconButton>
    </div>
  );
};

export { ThemeSwitcher };
