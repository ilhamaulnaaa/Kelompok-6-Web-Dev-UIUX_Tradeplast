import { createClient } from "@/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CheckoutForm from "./checkoutform"; // Import komponen baru

export default async function CheckoutPage({ searchParams }: { searchParams: any }) {
  const { categoryId, amount } = await searchParams;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("plastic_categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (!category) return <div className="pl-16 pt-8">Data tidak valid.</div>;
  const totalEarned = Math.round(parseFloat(amount) * category.price_per_unit);

  return (
    <div className="max-w-4xl font-poppins text-left pl-16 pt-8">
      <Link href="/dashboard/deposit" className="flex items-center gap-2 text-slate-400 hover:text-[#16302B] mb-6 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-sm">Kembali</span>
      </Link>

      <header className="mb-10 text-left">
        <h1 className="text-3xl font-bold text-[#16302B] tracking-tighter">Konfirmasi & Scan</h1>
        <p className="text-slate-500 mt-2 text-sm italic">Selesaikan setoran fisikmu di mesin.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Panggil Client Component Form di sini */}
          <CheckoutForm categoryId={categoryId} amount={amount} />
        </div>

        {/* Ringkasan Setoran */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 h-fit text-left">
          <h4 className="font-bold text-[#16302B] mb-4">Ringkasan Setoran</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Tipe</span>
              <span className="font-bold text-[#16302B]">{category.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Volume</span>
              <span className="font-bold text-[#16302B]">{amount} {category.unit}</span>
            </div>
            <div className="border-t border-dashed pt-4 flex justify-between items-center">
              <span className="font-bold text-emerald-600 text-xl">
                Rp {totalEarned.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}