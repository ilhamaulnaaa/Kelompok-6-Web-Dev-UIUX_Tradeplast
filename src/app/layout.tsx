import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "@/styles/globals.css"; // Pastikan path CSS benar

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// Konfigurasi font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tradeplast",
  description: "Platform recycle plastik yang inovatif dan ramah lingkungan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${poppins.variable}`}>
      {/* Navbar dihapus dari sini agar tidak muncul di semua halaman */}
      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  );
}