import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";

import "./globals.css";
import Image from "next/image";
import grinningCatEmoji from "@/app/grinning-cat_1f63a.gif";

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
      <body className="bg-black p-3 text-neutral-50">
        <header className="container mx-auto flex items-center gap-3 pt-3 pb-6">
          <div className="flex items-center gap-1.5">
            <Image alt="" height={24} src={grinningCatEmoji} width={24} />
            <h1 className="font-medium text-lg">Barf Tracker</h1>
          </div>
        </header>
        <main className="container mx-auto grid gap-6">{children}</main>
      </body>
    </html>
  );
}
