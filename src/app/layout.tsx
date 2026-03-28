import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import type React from "react";
import { Header } from "@/app/(dashboard)/header";
import { Menu } from "@/app/menu";

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
      <body className={`${geist.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <div className="flex min-h-dvh flex-col px-4 pt-0 pb-25">
            <Header />
            <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center bg-linear-to-t from-background px-4 pb-4">
              <div className="pointer-events-auto flex gap-1 rounded-full bg-card/50 bg-linear-to-t from-card/50 p-1 backdrop-blur-md backdrop-saturate-150">
                <Menu />
              </div>
            </nav>
            <main className="container mx-auto flex grow flex-col gap-6">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
