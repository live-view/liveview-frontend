import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Ubuntu as Font } from "next/font/google";

import "@/styles/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const font = Font({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const generateMetadata = async (): Promise<Metadata> => {
  const title = process.env.NEXT_PUBLIC_SITE_NAME!;
  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: `${title}.`,
    openGraph: {
      title,
      description: `${title}.`,
    },
    twitter: {
      title,
      description: `${title}.`,
    },
  };
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Header />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
