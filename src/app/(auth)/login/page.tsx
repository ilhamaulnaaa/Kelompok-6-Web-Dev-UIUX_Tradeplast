import { login } from '../actions';
import TextType from "@/app/components/bits/TextType";

// Gunakan async dan definisikan searchParams sebagai Promise
export default async function LoginPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ error?: string, message?: string }> 
}) {
  // Ambil data dari promise searchParams
  const { error, message } = await searchParams;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-emerald-500 mb-2 tracking-tighter font-poppins">Selamat Datang.</h1>
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
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
            <input 
              name="email" type="email" required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all font-poppins"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
            <input 
              name="password" type="password" required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all font-poppins"
              placeholder="••••••••"
            />
          </div>

          {/* Menampilkan error jika ada */}
          {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
          {message && <p className="text-emerald-400 text-xs font-medium">{message}</p>}

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            Masuk Sekarang
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Belum punya akun? <a href="/register" className="text-emerald-400 font-bold hover:underline">Daftar</a>
        </p>
      </div>
    </div>
  );
}