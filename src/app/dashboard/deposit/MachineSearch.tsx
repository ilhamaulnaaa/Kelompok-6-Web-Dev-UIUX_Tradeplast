// src/app/dashboard/deposit/MachineSearch.tsx
"use client";

import { Search, MapPin } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // npm install use-debounce

export default function MachineSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("location", term); // [cite: 39]
    } else {
      params.delete("location");
    }
    replace(`${pathname}?${params.toString()}`); // [cite: 97]
  }, 300);

  return (
    <div className="relative w-full mb-8">
      <label htmlFor="machine-search" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 italic text-left">
        Cari Mesin Terdekat (Kota/Area)
      </label>
      <div className="relative">
        <input
          id="machine-search"
          className="w-full bg-white border border-slate-100 rounded-2xl px-12 py-4 focus:outline-none focus:border-emerald-500 transition-all font-medium shadow-sm text-[#16302B]"
          placeholder="Misal: Jakarta Barat atau Mall Central..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("location")?.toString()} // [cite: 34]
          title="Cari lokasi mesin Tradeplast"
        />
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
      </div>
    </div>
  );
}