import type { Metadata } from "next";
import { fontGrotesk, fontSerif } from "@/lib/fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarineFlow — Client Portfolio Platform",
  description:
    "MarineFlow hosts independent client sites on marineflow.co.za subdomains.",
  metadataBase: new URL("https://marineflow.co.za"),
  openGraph: {
    title: "MarineFlow — Client Portfolio Platform",
    description: "Portfolio and client sites by MarineFlow.",
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
