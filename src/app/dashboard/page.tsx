import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AnimatedContent from "../components/bits/AnimatedContent";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("balance")
    .eq("id", user.id)
    .single();

  const balance = profile?.balance || 0;

  const { data: deposits } = await supabase
    .from("deposits")
    .select("amount_submitted")
    .eq("user_id", user.id);

  const totalPlastic =
    deposits?.reduce(
      (acc, item) => acc + item.amount_submitted,
      0
    ) || 0;

  const { data: transactions } = await supabase
    .from("transaction_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar Dashboard */}
      <nav className="bg-white border-b rounded-2xl border-slate-200 px-8 py-4 flex justify-between items-center">
        <span className="font-bold text-emerald-500 text-xl tracking-tighter">
          Ringkasan Aktivitas
        </span>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 font-medium">
            {user.email}
          </span>
        </div>
      </nav>

      <main className="p-8 max-w-full mx-auto w-full">

        {/* Statistik Grid */}
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1.5}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.5}
          threshold={0.1}
          delay={0.2}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Total Saldo */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                Total Saldo
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                Rp {balance.toLocaleString("id-ID")}
              </h2>
            </div>

            {/* Plastik Terkumpul */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                Plastik Terkumpul
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                {totalPlastic.toFixed(1)} Kg
              </h2>
            </div>

            {/* Status */}
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
              <p className="text-emerald-600 text-xs font-bold uppercase mb-1">
                Status Emisi
              </p>
              <h2 className="text-2xl font-bold text-emerald-900">
                Eco-Friendly
              </h2>
            </div>
          </div>
        </AnimatedContent>

        {/* Riwayat Terakhir */}
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1.5}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.5}
          threshold={0.1}
          delay={0.4}
        >
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">

            {transactions && transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-slate-100 pb-4 last:border-none"
                  >
                    <div>
                      <p className="font-semibold text-[#16302B]">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-400">
                        {new Date(
                          item.created_at
                        ).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <p
                      className={`font-bold ${
                        item.type === "deposit"
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.type === "deposit" ? "+" : "-"}
                      Rp {item.amount.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-400 py-10">
                Belum ada riwayat transaksi
              </div>
            )}
          </div>
        </AnimatedContent>
      </main>
    </div>
  );
}