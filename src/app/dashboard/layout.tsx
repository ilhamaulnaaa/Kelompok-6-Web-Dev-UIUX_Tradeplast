
import Link from "next/link";
import { LayoutDashboard, Wallet, History, Settings, LogOut, Leaf, Grid2x2Check } from "lucide-react";
import { logout } from "../(auth)/actions"; // Pastikan path ini benar
import LogoutButton from "../components/ui/logoutbutton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Setor Plastik", href: "/dashboard/deposit", icon: <Leaf size={20} /> },
    { name: "Dompet", href: "/dashboard/wallet", icon: <Wallet size={20} /> },
    { name: "Katalog", href: "/dashboard/catalog", icon: <Grid2x2Check size={20} /> },
    { name: "Riwayat", href: "/dashboard/history", icon: <History size={20} /> },
    { name: "Pengaturan", href: "/dashboard/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-poppins">
      {/* Sidebar - Menu Samping (Warna Oxford Blue #0D1B2A) */}
      <aside className="w-64 bg-[#16302B] text-white flex flex-col fixed h-full z-40">
        <div className="p-8">
          <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
            Tradeplast.
          </Link>
        </div>

        {/* Navigasi Menu */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
            >
              <span className="group-hover:text-emerald-500 transition-colors">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Tombol Logout - Terbungkus Form untuk memanggil Server Action */}
        <div className="p-4 border-t border-white/5">
          <LogoutButton />
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}