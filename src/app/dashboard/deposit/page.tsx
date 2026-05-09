import { Info, MapPin } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import DepositForm from "./depositform"; 
import MachineSearch from "./MachineSearch"; // Import Task 3

export default async function DepositPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ location?: string }> 
}) {
  const { location } = await searchParams; // Ambil parameter dari URL [cite: 98]
  const supabase = await createClient();

  // 1. Ambil Kategori Plastik
  const { data: categories } = await supabase
    .from('plastic_categories')
    .select('id, code, name, common_items, unit, price_per_unit') 
    .order('unit', { ascending: false });

  // 2. Ambil Lokasi Mesin (Filter berdasarkan parameter URL)
  let machineQuery = supabase.from('machines').select('*');
  if (location) {
    machineQuery = machineQuery.ilike('city', `%${location}%`);
  }
  const { data: machines } = await machineQuery;

  return (
    <div className="max-w-5xl font-poppins pl-16 pt-8 text-left">
      <header className="mb-10 text-left">
        <h1 className="text-3xl font-bold text-[#16302B] tracking-tighter">Setor Plastik</h1>
        <p className="text-slate-500 mt-2 text-sm italic">Ubah sampah plastikmu menjadi nilai ekonomi digital.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <MachineSearch /> {/* Task 3 UI */}
          
          {categories && categories.length > 0 ? (
            <DepositForm categories={categories} />
          ) : (
            <div className="bg-white p-8 rounded-[40px] border border-dashed border-slate-200 text-center text-slate-400 font-bold">
              Memuat katalog plastik...
            </div>
          )}
        </div>

        {/* List Mesin Terdekat */}
        <div className="space-y-6 text-left">
          <div className="bg-emerald-50/50 p-6 rounded-4xl border border-emerald-100">
            <h4 className="text-sm font-bold text-[#16302B] mb-4 uppercase tracking-wider">Mesin Terdekat</h4>
            <div className="space-y-3">
              {machines && machines.length > 0 ? machines.map(m => (
                <div key={m.id} className="flex gap-3 items-start p-3 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                  <MapPin size={16} className="text-emerald-500 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-[#16302B]">{m.name}</p>
                    <p className="text-[10px] text-slate-400">{m.address}</p>
                  </div>
                </div>
              )) : (
                <p className="text-[10px] text-slate-400 italic">Tidak ada mesin ditemukan di area ini.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}