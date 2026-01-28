import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});

export const metadata: Metadata = {
  title: "Rágcsálóirtás - Nullpont Színjátszó Műhely",
  description: "Foglaljon jegyet a Rágcsálóirtás előadásra!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={specialElite.className}>
        <div className="bg-poster" />
        {children}
      </body>
    </html>
  );
}
