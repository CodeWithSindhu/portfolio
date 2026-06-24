import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";
import { Preloader } from "@/components/preloader";
import CustomCursor from "@/components/custom-cursor";

const gilroyFont = localFont({
  src: [
    {
      path: '../fonts/Gilroy-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-Black.woff2',
      weight: '900',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-gilroy',
});

const maziusFont = localFont({
  src: [
    {
      path: '../fonts/MaziusDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/MaziusDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/MaziusDisplay-Extraitalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/MaziusDisplay-ExtraItalicBold.woff2',
      weight: '700',
      style: 'italic',
    }
  ],
  display: 'swap',
  variable: '--font-mazius',
});

export const metadata: Metadata = {
  title: "SK | Software Engineer",
  description: "High-end interactive portfolio of a Software Engineer.",
};

import SmoothScroll from "@/components/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gilroyFont.className} ${gilroyFont.variable} ${maziusFont.variable} antialiased min-h-screen bg-background text-foreground flex flex-col`}>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
