import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { FishIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { Header } from "@/app/header";
import { IconButton } from "@/components/icon-button";

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
        <nav className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-background/25 bg-linear-to-t from-background/33 p-2 backdrop-blur-md backdrop-saturate-150">
          <IconButton aria-label="Home" asChild>
            <Link href="/">
              <HomeIcon />
            </Link>
          </IconButton>
          <IconButton aria-label="Food" asChild>
            <Link href="/food">
              <FishIcon />
            </Link>
          </IconButton>
        </nav>
        <main className="container mx-auto grid gap-6">{children}</main>
      </body>
    </html>
  );
}
