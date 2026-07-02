import type { Metadata } from "next";
import { fontGrotesk, fontSerif } from "@/lib/fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarineFlow | Barbershop & Grooming · Cape Town",
  description:
    "MarineFlow — traditional barbershop craft on marineflow.co.za. Cuts, straight-razor shaves, and unhurried grooming in Cape Town.",
  metadataBase: new URL("https://marineflow.co.za"),
  openGraph: {
    title: "MarineFlow | Barbershop & Grooming · Cape Town",
    description:
      "Traditional barbershop craft. Cuts, shaves, and the ritual you deserve.",
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
