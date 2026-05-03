"use client";

import { QrCode, Cpu } from "lucide-react";
import { submitDeposit } from "@/app/(auth)/actions";
import { useState, useEffect } from "react";

export default function CheckoutForm({ categoryId, amount }: { categoryId: string, amount: string }) {
  const [transactionId, setTransactionId] = useState("");

  // Generate ID Transaksi di sisi klien untuk menghindari mismatch hidrasi
  useEffect(() => {
    setTransactionId(`TRP-${Math.floor(10000 + Math.random() * 90000)}`);
  }, []);

  async function handleClientAction(formData: FormData) {
    const result = await submitDeposit(formData);
    
    // Jika ada error yang dikembalikan dari server, kita tampilkan alert
    if (result?.error) {
      alert(result.error);
    }
  }

  return (
    <div className="space-y-6">
      {/* Visual QR Code */}
      <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center justify-center">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-6">
          <QrCode size={180} className="text-[#16302B]" />
        </div>
        <p className="text-[#16302B] font-bold">ID: {transactionId}</p>
        <p className="text-slate-400 text-[10px] mt-2 italic">Hadapkan layar ini ke scanner pada mesin Tradeplast</p>
      </div>

      {/* Form Konfirmasi */}
      <form action={handleClientAction}>
        <input type="hidden" name="categoryId" value={categoryId} />
        <input type="hidden" name="amount" value={amount} />
        <button 
          type="submit" 
          className="w-full bg-[#16302B] hover:bg-[#1f453e] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 group"
        >
          <Cpu size={20} className="group-hover:rotate-12 transition-transform" /> 
          Selesai Memasukkan Plastik
        </button>
      </form>
    </div>
  );
}