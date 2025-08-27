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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Patrología - Padres de la Iglesia" />
        <meta
          property="og:description"
          content="Explorando la enseñanza de los Padres de la Iglesia"
        />
        <meta property="og:image" content="https://www.patrologia.org/favicon.ico" />
        <meta property="og:url" content="https://www.patrologia.org" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Patrología - Padres de la Iglesia" />
        <meta
          name="twitter:description"
          content="Explorando la enseñanza de los Padres de la Iglesia"
        />
        <meta name="twitter:image" content="https://www.patrologia.org/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}