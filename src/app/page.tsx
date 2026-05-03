import { createClient } from "@/utils/supabase/server";

// Import komponen Navbar dan Section lainnya dari folder (marketing)
import Navbar from "./(marketing)/Navbar";
import Hero from "./(marketing)/Hero";
import { WhyChooseUs } from "./(marketing)/WhyChooseUs";
import { Advantage } from "./(marketing)/Advantage";
import { JoinUsers } from "./(marketing)/JoinUsers";
import { Distribution } from "./(marketing)/Distribution";
import { Footer } from "./(marketing)/Footer";
import { use } from "react";

export default async function Page() {
  const supabase = await createClient();

  // Ambil data untuk memastikan koneksi aman
  const { data: todos } = await supabase.from("todos").select();

  return (
    <main className="font-poppins relative">
      {/* 
        Navbar dipanggil langsung di dalam halaman ini.
        Karena Navbar punya class "fixed top-0", dia akan otomatis berada di atas layar.
      */}
      <Navbar />

      <Hero />
      <WhyChooseUs />

      {/* Bagian testing data database (Bisa dihapus jika tidak diperlukan lagi) */}
      {todos && (
        <section className="py-10 bg-slate-50 border-y">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="font-bold mb-4">Data Database:</h3>
            <ul className="list-disc pl-5 text-slate-600">
              {todos.map((todo) => (
                <li key={todo.id}>{todo.name}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Advantage />
      <JoinUsers />
      <Distribution />
      <Footer />
    </main>
  );
}