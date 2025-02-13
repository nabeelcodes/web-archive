import { Manrope, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { siteConfig } from "@/data/globals";
import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";

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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionContext = await auth();

  return (
    <html lang='en'>
      <body
        className={`${manrope.variable} ${geistMono.variable} min-h-screen bg-background font-manrope text-neutral-900`}>
        <SessionProvider session={sessionContext} refetchOnWindowFocus={false}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </SessionProvider>
        <Toaster position='top-center' duration={5000} richColors closeButton />
      </body>
    </html>
  );
}
