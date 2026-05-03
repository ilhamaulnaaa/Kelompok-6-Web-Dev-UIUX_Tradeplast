import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Galuh Bayu Pratama",
    role: "Environment Enthusiast",
    quote: "Platform ini benar-benar mengubah cara saya melihat daur ulang. Simpel, tapi berdampak besar.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Maisya Salsabila",
    role: "Early Adopter",
    quote: "Pengalamannya smooth banget. Jadi lebih sadar lingkungan tanpa ribet.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Razka Raffasya",
    role: "Digital Strategist",
    quote: "Solusi yang relevan dan modern. Ini tipe produk digital yang memang dibutuhkan.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Dea Putri",
    role: "Green Campaigner",
    quote: "Saya suka banget konsepnya. Selain membantu lingkungan, tampilannya juga clean dan enak dipakai.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Dina Adelia",
    role: "User Experience Designer",
    quote: "Implementasinya solid dan user experience-nya terasa dipikirkan dengan baik.",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    name: "Fajar Nugroho",
    role: "Sustainability Activist",
    quote: "Ini salah satu platform yang benar-benar punya impact nyata. Saya jadi lebih peduli soal sustainability.",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
  },
];

export function JoinUsers() {
  return (
    <section id="JoinUsers" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tighter">Join With Our Users</h2>
        <p className="mb-16 mt-6 text-sm text-gray-500 leading-relaxed">
          Be part of the movement toward a cleaner and greener future. Start recycling today and make a real impact for the environment. Together, we can reduce waste and build a more sustainable world.
        </p>
      </div>

      {/* Grid diubah ke lg:grid-cols-3 karena ada 6 data agar pas 2 baris */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-[#F1F3F5] rounded-[40px] p-10 flex flex-col justify-between h-[520px] transition-all duration-500 hover:shadow-2xl hover:bg-white group">
            {/* Visual Area: Menampilkan foto user dengan style card kecil */}
            <div className="mb-10 flex justify-center items-center group-hover:scale-105 transition-transform duration-500">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-3 overflow-hidden border-2 border-emerald-500/20">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold text-emerald-600 tracking-widest">VERIFIED CONTRIBUTOR</p>
              </div>
            </div>

            {/* Info Area */}
            <div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Quote className="w-5 h-5 text-emerald-600 fill-emerald-600 opacity-20" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{t.name}</h3>
              <p className="text-xs text-emerald-600 font-bold mb-4 uppercase tracking-wide">{t.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed italic">"{t.quote}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
