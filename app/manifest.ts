import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Triggerfishh — Voice-Activated Mac Automation",
    short_name: "Triggerfishh",
    description:
      "Control any Mac app with your voice. AI-powered automation, privacy-first.",
    start_url: "/",
    display: "browser",
    background_color: "#FAFAFA",
    theme_color: "#C5704E",
    icons: [
      {
        src: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        src: "/images/Icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
