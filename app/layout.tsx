import Navbar from "@/components/ui/Navbar";
import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const unbounded = Unbounded({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Tarik",
  description: "Welcome to my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-x-hidden" lang="en">
      <body
        className={`${inter.className} w-screen overflow-x-hidden overflow-hidden ${unbounded.className}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
