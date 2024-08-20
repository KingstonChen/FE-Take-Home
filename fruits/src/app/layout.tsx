import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const nanumGothic = Caveat ({
  weight: ["400", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Fruits",
  description: "FE Exercise by Finofo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nanumGothic.className}>{children}</body>
    </html>
  );
}
