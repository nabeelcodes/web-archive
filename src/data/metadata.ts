import { Metadata, Viewport } from "next";
import { colors } from "@/designSystem/tokens/colors";

const APP_URL = process.env.NEXT_PUBLIC_URL;

export const appViewport: Viewport = {
  themeColor: colors.background,
  colorScheme: "light"
};

export const appMetadata: Metadata = {
  applicationName: "Web-Archives",
  title: "Web Archives",
  description:
    "A curated digital library, featuring insightful articles on a wide range of web development topics.",
  authors: [
    {
      name: "Mohit Kumar",
      url: "https://github.com/98mohitkumar"
    },
    {
      name: "Nabeel Asif",
      url: "https://github.com/nabeelcodes"
    }
  ],
  keywords: [
    "react",
    "nextjs",
    "typescript",
    "tailwindcss",
    "zod",
    "motion",
    "radix-ui",
    "sonner",
    "nuqs",
    "lucide-react",
    "react-hook-form",
    "mongoDB"
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  manifest: `${APP_URL}/manifest.json`,
  openGraph: {
    siteName: "Web Archives",
    title: "Web Archives",
    description:
      "A curated digital library, featuring insightful articles on a wide range of web development topics.",
    url: APP_URL,
    images: [
      {
        url: "https://res.cloudinary.com/do884lked/image/upload/v1744565306/og_image_for_web_archives_gndv4m.png",
        width: 800,
        height: 600
      }
    ],
    locale: "en_US",
    type: "website"
  },
  appleWebApp: {
    capable: true,
    title: "webarc",
    statusBarStyle: "default"
  }
} as const;
