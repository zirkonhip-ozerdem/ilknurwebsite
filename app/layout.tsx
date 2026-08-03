import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin-ext"],
  variable: "--font-serif",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin-ext"],
  variable: "--font-sans",
  display: "swap"
});

const script = Caveat({
  subsets: ["latin-ext"],
  variable: "--font-script",
  display: "swap",
  weight: ["700"]
});

export const metadata: Metadata = {
  title: {
    default: "İlknur Erdal Soydan",
    template: "%s | İlknur Erdal Soydan"
  },
  description: "PCC mentor coach, ICF eğitmeni ve Medivisis Coaching School kurucusu İlknur Erdal Soydan'ın kişisel marka sitesi.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: {
    icon: "/assets/img/favicon.png",
    shortcut: "/assets/img/favicon.png",
    apple: "/assets/img/favicon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${serif.variable} ${sans.variable} ${script.variable}`}>{children}</body>
    </html>
  );
}
