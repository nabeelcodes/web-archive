import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/data/globals";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${manrope.variable} ${geistMono.variable} bg-background font-manrope text-neutral-900`}>{children}</body>
    </html>
  );
}
