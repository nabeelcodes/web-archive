import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Web Archives",
    short_name: "Webarc",
    description:
      "A curated digital library, featuring insightful articles on a wide range of web development topics.",
    background_color: "#f9f2ed",
    theme_color: "#f9f2ed",
    start_url: "/",
    dir: "ltr",
    lang: "en",
    orientation: "portrait",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
