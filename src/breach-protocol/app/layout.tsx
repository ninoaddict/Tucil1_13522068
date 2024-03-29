import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "./ui/topnav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Breach Protocol Solver",
  description: "Breach protocol game solver with brute force algorithm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`inter.className bg-gradient-to-br from-background to-[#171717]`}
      >
        <TopNav />
        {children}
      </body>
    </html>
  );
}
