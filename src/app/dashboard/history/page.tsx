import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default async function HistoryPage() {
const supabase = await createClient();

const {
data: { user },
} = await supabase.auth.getUser();

if (!user) redirect("/login");

const { data: transactions } = await supabase
.from("transaction_history")
.select("*")
.eq("user_id", user.id)
.order("created_at", { ascending: false });

return (
<div className="max-w-4xl pl-16 pt-8">
    <h1 className="text-3xl font-bold text-[#16302B] mb-2">
    Riwayat Transaksi
    </h1>
    <p className="text-slate-500 mb-8 italic">
    Semua aktivitas setor dan penarikan dana kamu.
    </p>

    <div className="space-y-4">
    {transactions?.length ? (
        transactions.map((item) => (
        <div
            key={item.id}
            className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center"
        >
            <div className="flex items-center gap-4">
            <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                item.type === "deposit"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
            >
                {item.type === "deposit" ? (
                <ArrowDownLeft size={20} />
                ) : (
                <ArrowUpRight size={20} />
                )}
            </div>

            <div>
                <h3 className="font-bold text-[#16302B]">
                {item.title}
                </h3>
                <p className="text-sm text-slate-400">
                {new Date(item.created_at).toLocaleDateString("id-ID")}
                </p>
            </div>
            </div>

            <div
            className={`font-bold ${
                item.type === "deposit"
                ? "text-emerald-600"
                : "text-red-500"
            }`}
            >
            {item.type === "deposit" ? "+" : "-"}Rp{" "}
            {item.amount.toLocaleString("id-ID")}
            </div>
        </div>
        ))
    ) : (
        <div className="bg-white p-8 rounded-3xl text-center text-slate-400">
        Belum ada riwayat transaksi.
        </div>
    )}
    </div>
</div>
);
}