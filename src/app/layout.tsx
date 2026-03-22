import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { FishIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { Header } from "@/app/header";
import { Button } from "@/primitives/button";

const geist = Google_Sans({
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
    <html className={geist.className} lang="en">
      <body className="bg-background p-3 text-foreground">
        <Header />
        <nav className="fixed bottom-4 left-1/2 z-50 flex w-48 -translate-x-1/2 gap-2 rounded-full bg-background/25 bg-linear-to-t from-background/33 p-2 backdrop-blur-md backdrop-saturate-150">
          <Button
            asChild
            className="grid flex-1 place-items-center gap-0.5 rounded-full bg-neutral-800 p-[0.5ch]"
          >
            <Link href="/">
              <HomeIcon className="size-6" />
              <div className="text-xs">Home</div>
            </Link>
          </Button>
          <Button
            asChild
            className="grid flex-1 place-items-center gap-0.5 rounded-full bg-neutral-800 p-[0.5ch]"
          >
            <Link href="/food">
              <FishIcon className="size-6" />
              <div className="text-xs">Food</div>
            </Link>
          </Button>
        </nav>
        <main className="container mx-auto grid gap-6">{children}</main>
      </body>
    </html>
  );
}
