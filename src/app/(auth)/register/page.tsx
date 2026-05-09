import { signup } from "@/app/(auth)/actions";
import Link from "next/link"; // Import Link
import { X } from "lucide-react"; // Import Icon X

export default async function RegisterPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ error?: string }> 
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-poppins">
      {/* Tambahkan 'relative' di class parent card ini */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-slate-100 p-8 rounded-4xl w-full max-w-md shadow-2xl text-left">
        
        {/* Tombol Close/Back ke Landing Page */}
        <Link 
          href="/" 
          aria-label="Kembali ke Beranda"
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all active:scale-90"
        >
          <X size={20} />
        </Link>

        <h1 className="text-3xl font-bold text-emerald-500 mb-2 tracking-tighter">Buat Akun.</h1>
        <p className="text-slate-400 text-sm mb-8 italic">Mulai langkah hijaumu bersama Tradeplast.</p>

        <form action={signup} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest italic text-left">Email</label>
            <input 
              name="email" type="email" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest italic text-left">Password</label>
            <input 
              name="password" type="password" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="Minimal 6 karakter"
            />
          </div>

          {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            Daftar Sekarang
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Sudah punya akun? <Link href="/login" className="text-emerald-400 font-bold hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
}