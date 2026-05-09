// src/app/dashboard/history/SearchBar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce"; // npx install use-debounce

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Fungsi buat update URL (URL as State) [cite: 96]
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term); // [cite: 39]
    } else {
      params.delete("query");
    }
    // Update URL tanpa reload halaman penuh [cite: 97]
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative max-w-md mb-6">
      <input
        className="w-full bg-white border border-slate-100 rounded-2xl px-12 py-4 focus:outline-none focus:border-emerald-500 transition-all font-medium shadow-sm"
        placeholder="Cari transaksi (misal: PET)..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()} // [cite: 34, 110]
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
    </div>
  );
}