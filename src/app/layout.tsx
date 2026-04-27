import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "./components/sections/Navbar";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en"> 
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Navbar />
        {children} {}
      </body>
    </html>
  );
}