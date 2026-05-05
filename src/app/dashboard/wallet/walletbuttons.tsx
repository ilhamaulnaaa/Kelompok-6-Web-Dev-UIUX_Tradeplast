"use client";

import { useState } from "react";
import { ArrowUpRight, CreditCard, X } from "lucide-react";
import { withdrawBalance, addBankAccount } from "@/app/(auth)/actions";

export default function WalletButtons() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);

  async function handleAction(formData: FormData, action: Function, close: Function) {
    const res = await action(formData);
    if (res?.error) {
      alert(res.error);
    } else if (res?.success) {
      alert(res.success);
      close();
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      <button 
        type="button"
        onClick={() => setShowWithdraw(true)}
        className="bg-emerald-500 hover:bg-emerald-600 text-[#16302B] px-10 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-emerald-500/20"
      >
        <ArrowUpRight size={18} /> Tarik Tunai
      </button>

      <button 
        type="button"
        onClick={() => setShowAddAccount(true)}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2"
      >
        <CreditCard size={18} /> Tambah Rekening
      </button>

      {/* Modal Tarik Tunai */}
      {showWithdraw && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#16302B]/60 backdrop-blur-sm text-left">
          <div className="bg-white rounded-4xl p-8 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6 text-left">
              <h3 className="text-xl font-bold text-[#16302B]">Tarik Tunai</h3>
              <button 
                type="button" 
                onClick={() => setShowWithdraw(false)} 
                aria-label="Tutup modal penarikan"
                className="hover:bg-slate-100 p-1 rounded-full transition-colors"
              >
                <X />
              </button>
            </div>
            <form action={(fd) => handleAction(fd, withdrawBalance, () => setShowWithdraw(false))} className="space-y-4">
              <div className="text-left">
                {/* ID dan htmlFor dihubungkan di sini */}
                <label htmlFor="withdraw-amount" className="block text-xs font-bold text-slate-400 uppercase mb-2 italic">
                  Jumlah Penarikan (Rp)
                </label>
                <input 
                  id="withdraw-amount"
                  name="amount" 
                  type="number" 
                  required 
                  title="Masukkan jumlah uang yang ingin ditarik"
                  placeholder="Contoh: 50000"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#16302B] focus:outline-none focus:border-emerald-500" 
                />
              </div>
              <button type="submit" className="w-full bg-[#16302B] text-white py-4 rounded-2xl font-bold active:scale-95 transition-all">
                Proses Penarikan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Rekening */}
      {showAddAccount && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#16302B]/60 backdrop-blur-sm text-left">
          <div className="bg-white rounded-4xl p-8 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6 text-left">
              <h3 className="text-xl font-bold text-[#16302B]">Tambah Rekening</h3>
              <button 
                type="button" 
                onClick={() => setShowAddAccount(false)} 
                aria-label="Tutup modal rekening"
                className="hover:bg-slate-100 p-1 rounded-full transition-colors"
              >
                <X />
              </button>
            </div>
            <form action={(fd) => handleAction(fd, addBankAccount, () => setShowAddAccount(false))} className="space-y-4">
              <div className="text-left">
                <label htmlFor="bank-name" className="block text-xs font-bold text-slate-400 uppercase mb-2 italic">
                  Nama Bank
                </label>
                <input 
                  id="bank-name"
                  name="bank_name" 
                  required 
                  title="Masukkan nama bank Anda"
                  placeholder="Contoh: BCA / Mandiri" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#16302B] focus:outline-none focus:border-emerald-500" 
                />
              </div>
              <div className="text-left">
                <label htmlFor="account-number" className="block text-xs font-bold text-slate-400 uppercase mb-2 italic">
                  Nomor Rekening
                </label>
                <input 
                  id="account-number"
                  name="account_number" 
                  type="number" 
                  required 
                  title="Masukkan nomor rekening Anda"
                  placeholder="Contoh: 1234567890"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#16302B] focus:outline-none focus:border-emerald-500" 
                />
              </div>
              <div className="text-left">
                <label htmlFor="account-holder" className="block text-xs font-bold text-slate-400 uppercase mb-2 italic">
                  Nama Pemilik
                </label>
                <input 
                  id="account-holder"
                  name="account_holder" 
                  required 
                  title="Masukkan nama lengkap pemilik rekening"
                  placeholder="Nama sesuai buku tabungan"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#16302B] focus:outline-none focus:border-emerald-500" 
                />
              </div>
              <button type="submit" className="w-full bg-[#16302B] text-white py-4 rounded-2xl font-bold active:scale-95 transition-all">
                Simpan Rekening
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}