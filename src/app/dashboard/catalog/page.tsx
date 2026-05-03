import { createClient } from "@/utils/supabase/server";
import { Tag, Box, CheckCircle2 } from "lucide-react";

export default async function CatalogPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('plastic_categories')
    .select('*')
    .order('price_per_unit', { ascending: false });

  return (
    <div className="max-w-5xl font-poppins pl-16 pt-8 text-left">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[#0D1B2A] tracking-tighter">Katalog Plastik</h1>
        <p className="text-slate-500 mt-2 text-sm italic">Daftar harga per unit plastik yang diterima Tradeplast.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Box size={24} />
              </div>
              <div className="bg-[#16302B] text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold">
                {item.unit.toUpperCase()}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-1">{item.code}</h3>
            <p className="text-xs text-slate-400 mb-4 uppercase tracking-tighter">{item.name}</p>
            
            <div className="bg-slate-50 p-4 rounded-2xl mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Harga Estimasi</p>
              <p className="text-lg font-bold text-emerald-600">Rp {item.price_per_unit.toLocaleString('id-ID')} / {item.unit}</p>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Diterima di semua titik setor</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}