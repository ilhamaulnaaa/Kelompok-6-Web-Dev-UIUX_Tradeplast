import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TextType from "../components/bits/TextType";
import AnimatedContent from "../components/bits/AnimatedContent";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Proteksi lapis kedua (jika middleware terlewat)
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar Dashboard */}
      <nav className="bg-white border-b rounded-2xl border-slate-200 px-8 py-4 flex justify-between items-center">
        <span className="font-bold text-emerald-500 text-xl tracking-tighter">Ringkasan Aktivitas</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 font-medium">{user.email}</span>
        </div>
      </nav>

      <main className="p-8 max-w-full mx-auto w-full">

        {/* Statistik Grid */}
        <AnimatedContent distance={100} direction="vertical" reverse={false} duration={1.5} ease="power3.out" initialOpacity={0} animateOpacity scale={0.5} threshold={0.1} delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">Total Saldo</p>
              <h2 className="text-2xl font-bold text-slate-900">Rp 0</h2>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">Plastik Terkumpul</p>
              <h2 className="text-2xl font-bold text-slate-900">0 Kg</h2>
            </div>
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
              <p className="text-emerald-600 text-xs font-bold uppercase mb-1">Status Emisi</p>
              <h2 className="text-2xl font-bold text-emerald-900">Eco-Friendly</h2>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent distance={100} direction="vertical" reverse={false} duration={1.5} ease="power3.out" initialOpacity={0} animateOpacity scale={0.5} threshold={0.1} delay={0.4}>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-center">
          <div className="text-slate-400">
            <TextType
              typingSpeed={100}
              pauseDuration={1500}
              showCursor
              cursorCharacter="|"
              text={["Belum ada riwayat transaksi.", "Ayo mulai setor plastikmu sekarang!"]}
              deletingSpeed={50}
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
            />
          </div>
        </div>
        </AnimatedContent>
      </main>
    </div>
  );
}
