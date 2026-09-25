import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Time Zone Reifenservice | Landing Pages",
    template: "%s | Time Zone Reifenservice",
  },
  description:
    "Conversion landing pages for Time Zone Reifenservice – Pulheim / Köln",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
