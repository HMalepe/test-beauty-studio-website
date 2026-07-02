import type { Metadata } from "next";
import { fontGrotesk, fontSerif } from "@/lib/fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarineFlow | High-Performance Marine Pumping Solutions",
  description:
    "MarineFlow delivers engineered marine pumping solutions built for demanding environments. Trusted performance for vessels, offshore, and industrial marine applications across South Africa.",
  metadataBase: new URL("https://marineflow.co.za"),
  openGraph: {
    title: "MarineFlow | High-Performance Marine Pumping Solutions",
    description:
      "Engineered marine pumping solutions built for demanding environments.",
    url: "https://marineflow.co.za",
    siteName: "MarineFlow",
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
