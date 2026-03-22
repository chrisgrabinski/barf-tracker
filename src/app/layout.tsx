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
        <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center bg-linear-to-t from-background px-4 pb-4">
          <div className="pointer-events-auto flex w-40 gap-1 rounded-full bg-black/50 bg-linear-to-t from-black/50 p-1 backdrop-blur-md backdrop-saturate-150">
            <Button
              asChild
              className="grid flex-1 place-items-center gap-1 rounded-full bg-transparent p-2"
            >
              <Link href="/">
                <HomeIcon className="size-6" />
                <div className="font-medium text-xs leading-none">Home</div>
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
          </div>
        </nav>
        <main className="container mx-auto grid gap-6">{children}</main>
      </body>
    </html>
  );
}
