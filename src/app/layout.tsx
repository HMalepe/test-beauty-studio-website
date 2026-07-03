import type { Metadata } from "next";
import { fontGrotesk, fontSerif } from "@/lib/fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEST BEAUTY STUDIO WEBSITE",
  description:
    "Test beauty studio website — editorial grooming experience with 3D hero, polaroid gallery, magnetic services, and parallax booking CTA.",
  metadataBase: new URL("https://marineflow.co.za"),
  openGraph: {
    title: "TEST BEAUTY STUDIO WEBSITE",
    description:
      "Test beauty studio website — cuts, styling, and booking.",
    url: "https://marineflow.co.za",
    siteName: "TEST BEAUTY STUDIO WEBSITE",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSerif.variable} ${fontGrotesk.variable}`}>
      <body className="font-grotesk">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
