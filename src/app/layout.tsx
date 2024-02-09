"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";
import * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Ramestta Faucet",
//   description: "Ramestta Faucet",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
