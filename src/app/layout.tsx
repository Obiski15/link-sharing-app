import { Instrument_Sans } from "next/font/google";

import type { Metadata } from "next";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ToasterWrapper from "@/components/ToasterWrapper";
import "./styles/globals.css";

const inter = Instrument_Sans({ subsets: ["latin"], weight: ["700", "400"] });

export const metadata: Metadata = {
  title: "DevLinks",
  description:
    "Effortlessly share and organize links with DevLinks, the ultimate tool for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ToasterWrapper />
      </body>
    </html>
  );
}
