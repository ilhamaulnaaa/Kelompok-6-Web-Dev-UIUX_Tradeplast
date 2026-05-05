import { signup } from "@/app/(auth)/actions";

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-emerald-500 mb-2 tracking-tighter">Buat Akun.</h1>
        <p className="text-slate-400 text-sm mb-8">Mulai langkah hijaumu bersama Tradeplast.</p>

        <form action={signup} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
            <input 
              name="email" type="email" required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
            <input 
              name="password" type="password" required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="Minimal 6 karakter"
            />
          </div>

          {searchParams.error && <p className="text-red-400 text-xs">{searchParams.error}</p>}

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            Daftar Sekarang
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Sudah punya akun? <a href="/login" className="text-emerald-400 font-bold hover:underline">Masuk</a>
        </p>
      </div>
    </div>
  );
}
