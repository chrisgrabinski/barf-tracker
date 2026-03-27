import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import {
  FishIcon,
  FrownIcon,
  LayoutDashboardIcon,
  PawPrintIcon,
} from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { Header } from "@/app/(dashboard)/header";
import { Button } from "@/primitives/button";

const geist = Bricolage_Grotesque({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barf Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} bg-background p-6 pt-0 pb-24 text-foreground`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <Header />

          <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center bg-linear-to-t from-background px-4 pb-4">
            <div className="pointer-events-auto flex gap-1 rounded-full bg-card/50 bg-linear-to-t from-card/50 p-1 backdrop-blur-md backdrop-saturate-150">
              <Button
                asChild
                className="grid flex-1 place-items-center gap-1 rounded-full bg-transparent p-2"
              >
                <Link href="/">
                  <LayoutDashboardIcon className="size-6" />
                  <div className="font-medium text-xs leading-none">
                    Dashboard
                  </div>
                </Link>
              </Button>
              <Button
                asChild
                className="grid flex-1 place-items-center gap-1 rounded-full bg-transparent p-2"
              >
                <Link href="/incidents">
                  <FrownIcon className="size-6" />
                  <div className="font-medium text-xs leading-none">
                    Incidents
                  </div>
                </Link>
              </Button>
              <Button
                asChild
                className="grid flex-1 place-items-center gap-1 rounded-full bg-transparent p-2"
              >
                <Link href="/food">
                  <FishIcon className="size-6" />
                  <div className="font-medium text-xs leading-none">Food</div>
                </Link>
              </Button>
              <Button
                asChild
                className="grid flex-1 place-items-center gap-1 rounded-full bg-transparent p-2"
              >
                <Link href="/profile">
                  <PawPrintIcon className="size-6" />
                  <div className="font-medium text-xs leading-none">
                    Profile
                  </div>
                </Link>
              </Button>
            </div>
          </nav>
          <main className="container mx-auto grid gap-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
