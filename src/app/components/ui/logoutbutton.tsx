"use client";

import { useState } from "react";
import { LogOut, AlertTriangle, X } from "lucide-react";
import { logout } from "@/app/(auth)/actions";

export default function LogoutButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        type="button" // FIX: Explicit button type
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all group"
        aria-label="Buka menu logout"
      >
        <LogOut size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-bold">Keluar</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0D1B2A]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-red-50 rounded-2xl text-red-500">
                <AlertTriangle size={24} />
              </div>
              <button 
                type="button" // FIX: Explicit button type
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-slate-600"
                aria-label="Tutup modal" // FIX: Discernible text for screen readers
              >
                <X size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-2 text-left">Konfirmasi Keluar</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed text-left">
              Apakah kamu yakin ingin keluar dari Tradeplast? Sesi aktifmu akan berakhir.
            </p>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Batal
              </button>
              <form action={logout} className="flex-1">
                <button 
                  type="submit" // FIX: Proper submit type for form
                  className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all active:scale-95"
                >
                  Ya, Keluar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}