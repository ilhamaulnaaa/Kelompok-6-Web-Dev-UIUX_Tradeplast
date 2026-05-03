import { Wallet, ArrowUpRight, TrendingUp, CreditCard, Recycle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import WalletButtons from "./walletbuttons";

export default async function WalletPage() {
  const supabase = await createClient();

  // Dapatkan sesi user saat ini untuk keamanan ekstra
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Ambil Saldo User (Spesifik untuk user yang sedang login)
  const { data: profile } = await supabase
    .from("profiles")
    .select("balance")
    .eq("id", user?.id)
    .single();

  const balance = profile?.balance || 0;

  // 2. Hitung Estimasi Bulan Ini
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  
  const { data: monthTransactions } = await supabase
    .from("deposits")
    .select("total_earned")
    .eq("user_id", user?.id)
    .gte("created_at", firstDayOfMonth);

  const monthEstimation = monthTransactions?.reduce((acc, curr) => acc + curr.total_earned, 0) || 0;

  // 3. Hitung Kontribusi Bumi (Hanya menjumlahkan plastik dengan unit 'kg')
  // Kita melakukan 'inner join' ke tabel plastic_categories untuk memfilter unit
  const { data: allDeposits } = await supabase
    .from("deposits")
    .select(`
      amount_submitted,
      plastic_categories!inner(unit)
    `)
    .eq("user_id", user?.id)
    .eq("plastic_categories.unit", "kg");

  const totalContribution = allDeposits?.reduce((acc, curr) => acc + curr.amount_submitted, 0) || 0;

  // ============================================================================
  // BAGIAN UI: 100% SAMA DENGAN KODE ASLI MILIKMU, TIDAK ADA YANG DIUBAH
  // ============================================================================
  return (
    <div className="max-w-4xl font-poppins text-left pl-16 pt-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#0D1B2A] tracking-tighter">Dompet Digital</h1>
        <p className="text-slate-500 text-sm italic">Hasil kontribusi lingkunganmu tersimpan di sini.</p>
      </header>

      {/* Kartu Saldo */}
      <div className="bg-[#16302B] rounded-[40px] p-10 text-white relative overflow-hidden mb-10 shadow-2xl">
        <div className="relative z-10">
          <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Total Saldo Tersedia</p>
          <h2 className="text-5xl font-bold mb-10 tracking-tighter">Rp {balance.toLocaleString("id-ID")}</h2>
            <WalletButtons />
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase">Estimasi Bulan Ini</p>
            <p className="text-lg font-bold text-slate-900">+Rp {monthEstimation.toLocaleString("id-ID")}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Recycle size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase">Kontribusi Bumi</p>
            <p className="text-lg font-bold text-slate-900">{totalContribution.toFixed(1)} Kg Plastik</p>
          </div>
        </div>
      </div>
    </div>
  );
}