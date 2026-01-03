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
      <body className="bg-neutral-900 text-neutral-50">
        <div className="container mx-auto grid gap-6 p-6">
          <header className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Image alt="" height={24} src={grinningCatEmoji} width={24} />
              <h1 className="font-medium text-lg">Barf Tracker</h1>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
