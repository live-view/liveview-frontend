import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Inter as Font } from "next/font/google";

import "@/styles/globals.css";

import "react-toastify/dist/ReactToastify.css";

const font = Font({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <main className="bg-gray-800 text-gray-200 selection:bg-secondary selection:text-primary">
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
};

export default Layout;
