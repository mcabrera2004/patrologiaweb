import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patrología - Padres de la Iglesia",
  description: "Explorando la enseñanza de los Padres de la Iglesia",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Patrología - Padres de la Iglesia",
    description: "Explorando la enseñanza de los Padres de la Iglesia",
    url: "https://www.patrologia.org",
    siteName: "Patrología",
    images: [
      {
        url: "/OpenGraph.jpg",
        width: 300,
        height: 250,
        alt: "Favicon de Patrología",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Patrología - Padres de la Iglesia",
    description: "Explorando la enseñanza de los Padres de la Iglesia",
    images: ["/OpenGraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}