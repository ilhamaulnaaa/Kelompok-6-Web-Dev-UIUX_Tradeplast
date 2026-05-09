import { login } from '../actions';
import TextType from "@/app/components/bits/TextType";
import Link from "next/link"; // Import Link
import { X } from "lucide-react"; // Import Icon X

export default async function LoginPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ error?: string, message?: string }> 
}) {
  const { error, message } = await searchParams;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-poppins">
      {/* Tambahkan 'relative' di class parent card ini */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-slate-100 p-8 rounded-4xl w-full max-w-md shadow-2xl">
        
        {/* Tombol Close/Back ke Landing Page */}
        <Link 
          href="/" 
          aria-label="Kembali ke Beranda"
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all active:scale-90"
        >
          <X size={20} />
        </Link>

        <h1 className="text-3xl font-bold text-emerald-500 mb-2 tracking-tighter">Selamat Datang.</h1>
        <div className="text-slate-400 text-sm mb-8">
            <TextType
                typingSpeed={100}
                pauseDuration={1500}
                showCursor
                cursorCharacter="|"
                text={["Masuk ke akun Tradeplast kamu"]}
                deletingSpeed={50}
                variableSpeedEnabled={false}
                variableSpeedMin={60}
                variableSpeedMax={120}
                cursorBlinkDuration={0.5}
              />
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Email</label>
            <input 
              name="email" type="email" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Password</label>
            <input 
              name="password" type="password" required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
          {message && <p className="text-emerald-400 text-xs font-medium">{message}</p>}

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            Masuk Sekarang
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Belum punya akun? <Link href="/register" className="text-emerald-400 font-bold hover:underline">Daftar</Link>
        </p>
      </div>
    </div>
  );
}