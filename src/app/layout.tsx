import { Manrope, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { siteConfig } from "@/data/globals";
import type { Metadata } from "next";
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
      <body
        className={`${manrope.variable} ${geistMono.variable} min-h-screen bg-background font-manrope text-neutral-900`}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
