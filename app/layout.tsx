import Navbar from "@/components/ui/Navbar";
import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const unbounded = Unbounded({ subsets: ["latin"] });

const ppEditorialOld = localFont({
  src: [
    {
      path: "/fonts/PPEditorialNew-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/PPEditorialNew-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "/fonts/PPEditorialNew-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "/fonts/PPEditorialNew-UltraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "/fonts/PPEditorialNew-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "/fonts/PPEditorialNew-UltralightItalic.otf",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--font-editorial",
});

const ppNeueMontreal = localFont({
  src: [
    { path: "/fonts/PPNeueMontreal-Thin.otf", weight: "200", style: "normal" },
    { path: "/fonts/PPNeueMontreal-Book.otf", weight: "400", style: "normal" },
    {
      path: "/fonts/PPNeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "/fonts/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/PPNeueMontreal-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    { path: "/fonts/PPNeueMontreal-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-montreal",
});

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
        className={`${inter.className} ${unbounded.className} ${ppEditorialOld.className} ${ppNeueMontreal.className} font-editorial  w-screen overflow-x-hidden overflow-hidden `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
