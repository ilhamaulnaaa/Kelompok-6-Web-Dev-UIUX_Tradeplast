import { Info } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import DepositForm from "./depositform"; 

export default async function DepositPage() {
  const supabase = await createClient();

  // PERBAIKAN: Tambahkan 'price_per_unit' ke dalam select agar harga muncul di form
  const { data: categories } = await supabase
    .from('plastic_categories')
    .select('id, code, name, common_items, unit, price_per_unit') 
    .order('unit', { ascending: false });

  return (
    <div className="max-w-5xl font-poppins pl-16 pt-8 text-left">
      <header className="mb-10 text-left">
        <h1 className="text-3xl font-bold text-[#16302B] tracking-tighter">Setor Plastik</h1>
        <p className="text-slate-500 mt-2 text-sm italic">Ubah sampah plastikmu menjadi nilai ekonomi digital.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {categories && categories.length > 0 ? (
            <DepositForm categories={categories} />
          ) : (
            <div className="bg-white p-8 rounded-[40px] border border-dashed border-slate-200 text-center text-slate-400 font-bold">
              Memuat katalog plastik...
            </div>
          )}
        </div>

        <div className="space-y-6 text-left">
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <div className="flex items-center gap-3 text-emerald-700 mb-4 font-bold text-sm">
              <Info size={18} />
              <h4>Informasi Penting</h4>
            </div>
            <ul className="text-xs text-emerald-800/70 space-y-4 leading-relaxed text-left">
              <li className="flex gap-2">
                <span className="font-bold text-emerald-600">01.</span>
                <span>Pastikan plastik dalam keadaan kosong dan bersih.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-emerald-600">02.</span>
                <span>Gunakan mesin terdekat untuk verifikasi fisik.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}