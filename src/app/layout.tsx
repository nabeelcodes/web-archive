import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/data/globals";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${manrope.variable} font-manrope bg-background text-neutral-900`}>{children}</body>
    </html>
  );
}
