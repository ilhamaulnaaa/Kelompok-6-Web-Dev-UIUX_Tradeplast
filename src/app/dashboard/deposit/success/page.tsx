// src/app/dashboard/deposit/success/page.tsx

import Link from "next/link";
import { CheckCircle, Wallet, ArrowRight } from "lucide-react";

export default function DepositSuccessPage() {
  return (
    <div className="max-w-3xl mx-auto font-poppins text-center pt-20">
      <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-xl flex flex-col items-center">
        
        {/* Ikon Sukses */}
        <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle size={48} />
        </div>

        <h1 className="text-3xl font-bold text-[#0D1B2A] tracking-tighter mb-4">Setoran Berhasil!</h1>
        <p className="text-slate-500 mb-8 max-w-md leading-relaxed">
          Terima kasih telah berkontribusi untuk bumi. Saldo dari setoran plastikmu telah berhasil ditambahkan ke Dompet Digital.
        </p>

        {/* Tombol Navigasi */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/dashboard/wallet"
            className="bg-[#16302B] hover:bg-[#1f453e] text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95"
          >
            <Wallet size={20} />
            Cek Dompet Saya
          </Link>
          
          <Link 
            href="/dashboard/deposit"
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3"
          >
            Setor Lagi
            <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </div>
  );
}