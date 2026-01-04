import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/header";

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
        <Header />
        <main className="container mx-auto grid gap-6">{children}</main>
      </body>
    </html>
  );
}
