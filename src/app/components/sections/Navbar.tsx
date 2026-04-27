"use client"; // Wajib karena kita pakai hooks (useState/useEffect)

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Jika scroll lebih dari 50px, aktifkan mode "scrolled"
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Testimonial", href: "#JoinUsers" },
    { name: "Maps", href: "#maps" },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-[#16302B]/70 py-3 backdrop-blur-md shadow-lg" // Mode Mengecil & Translucent
          : "bg-[#16302B] py-6" // Mode Awal
      } px-12`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* 1. Logo Section (Bisa dikecilkan sedikit saat scroll) */}
        <div className={`flex flex-1 items-center justify-start gap-2 transition-transform duration-500 ${isScrolled ? "scale-90" : "scale-100"}`}>
          <div className="relative h-10 w-10 overflow-hidden">
            <div className="absolute left-2.5 top-0.5 h-8 w-4 rotate-[5deg] outline outline-1 outline-neutral-300"></div>
            <div className="absolute left-4.5 top-3.5 h-10 w-7 rotate-[-5deg] outline outline-2 outline-neutral-300">
              <div className="absolute left-1.5 -top-2.5 h-2 w-2.5 outline outline-2 outline-neutral-300"></div>
            </div>
          </div>
        </div>

        {/* 2. Menu Section */}
        <div className="hidden md:flex items-center gap-12 lg:gap-20">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-[#d4d4d4]"
              } hover:text-white`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* 3. Button Section */}
        <div className="flex flex-1 justify-end">
          <Link href="#join">
            <button 
              className={`rounded-full bg-[#9B9A8A] font-bold text-white transition-all duration-500 hover:bg-[#82816D] hover:shadow-lg active:scale-95 ${
                isScrolled ? "px-6 py-2 text-xs" : "px-8 py-2.5 text-sm"
              }`}
            >
              Join With Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}