import { Manrope, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { appMetadata, appViewport } from "@/data/metadata";
import { auth } from "@/auth";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = appMetadata;

export const viewport = appViewport;

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
        {/* Next-auth sessions provider + NUQS query params provider */}
        <SessionProvider session={sessionContext} refetchOnWindowFocus={false}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </SessionProvider>

        {/* Sonner Toaster component */}
        <Toaster
          position='top-center'
          duration={5000}
          richColors
          // closeButton
          className='!z-[100]'
        />
      </body>
    </html>
  );
}
