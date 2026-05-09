export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-pulse">
      {/* Skeleton Navbar Dashboard */}
      <nav className="bg-white border-b rounded-2xl border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="h-7 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-32 bg-slate-100 rounded-md" />
      </nav>

      <main className="p-8 max-w-full mx-auto w-full">
        {/* Skeleton Statistik Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Saldo Skeleton */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-26 flex flex-col justify-center">
            <div className="h-3 w-20 bg-slate-100 rounded mb-3" />
            <div className="h-8 w-36 bg-slate-200 rounded-lg" />
          </div>

          {/* Plastik Terkumpul Skeleton */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-26 flex flex-col justify-center">
            <div className="h-3 w-28 bg-slate-100 rounded mb-3" />
            <div className="h-8 w-24 bg-slate-200 rounded-lg" />
          </div>

          {/* Status Emisi Skeleton */}
          <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 shadow-sm h-26 flex flex-col justify-center">
            <div className="h-3 w-24 bg-emerald-100 rounded mb-3" />
            <div className="h-8 w-40 bg-emerald-200/50 rounded-lg" />
          </div>
        </div>

        {/* Skeleton Riwayat Terakhir */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="space-y-6">
            {/* Membuat 5 baris dummy riwayat */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-4 last:border-none last:pb-0">
                <div className="space-y-2">
                  <div className="h-5 w-48 bg-slate-200 rounded-md" />
                  <div className="h-3 w-32 bg-slate-100 rounded-md" />
                </div>
                <div className="h-6 w-24 bg-slate-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
