"use client";

import { useState } from "react";
import { Scale, Hash, ChevronRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DepositForm({ categories }: { categories: any[] }) {
  const [selectedId, setSelectedId] = useState(categories[0]?.id || "");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const selected = categories.find(c => c.id === selectedId);
  const isPcs = selected?.unit === 'pcs';

  // Fungsi untuk melanjutkan ke halaman checkout
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    router.push(`/dashboard/deposit/checkout?categoryId=${selectedId}&amount=${amount}`);
  };

  return (
    <form onSubmit={handleNext} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
      <div className="text-left">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 italic">
          Pilih Jenis Plastik
        </label>
        
        {/* Grid Kartu Kategori */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              type="button" 
              onClick={() => setSelectedId(cat.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-start ${
                selectedId === cat.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'
              }`}
            >
              {/* Nama Kategori (PET, HDPE, dll) */}
              <p className={`font-bold ${selectedId === cat.id ? 'text-emerald-700' : 'text-[#16302B]'}`}>
                {cat.code}
              </p>
              
              {/* Deskripsi (Botol bening, dll) */}
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter mb-2">
                {cat.common_items}
              </p>
              
              {/* INI BAGIAN YANG DIKEMBALIKAN: Harga per Unit */}
              <p className="text-[11px] font-bold text-emerald-600">
                Rp {cat.price_per_unit ? cat.price_per_unit.toLocaleString('id-ID') : 0} / {cat.unit}
              </p>
              
              {/* Ikon Centang saat dipilih */}
              {selectedId === cat.id && (
                <Check className="absolute top-4 right-4 text-emerald-600" size={16} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="text-left">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 italic">
          {isPcs ? "Jumlah Barang (Pcs)" : "Estimasi Berat (Kg)"}
        </label>
        <div className="relative">
          <input 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            name="amount" 
            type="number" 
            step={isPcs ? "1" : "0.01"} 
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-[#16302B] focus:outline-none focus:border-emerald-500 pl-12 font-bold"
            placeholder="0.00"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {isPcs ? <Hash size={18} /> : <Scale size={18} />}
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#16302B] font-bold py-5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95">
        Lanjutkan ke Checkout <ChevronRight size={20} />
      </button>
    </form>
  );
}