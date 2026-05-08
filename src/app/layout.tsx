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
        <div 
          className="bg-warning text-dark px-3 py-2 fw-bold shadow-sm d-flex align-items-center gap-3" 
          style={{ 
            position: 'fixed', 
            top: '20px', 
            right: '20px', 
            zIndex: 2000, 
            borderRadius: '8px',
            fontSize: '0.8rem',
            border: '2px solid #000',
            maxWidth: '300px'
          }}
        >
          <div style={{ lineHeight: '1.2' }}>
            <strong>DEMO MÓD</strong><br/>
            <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>A projekt nem aktuális.</span>
          </div>
          <a href="/admin/login/" className="btn btn-dark btn-sm fw-bold" style={{ fontSize: '0.7rem' }}>
            ADMIN
          </a>
        </div>
        {children}
      </body>
    </html>
  );
}
