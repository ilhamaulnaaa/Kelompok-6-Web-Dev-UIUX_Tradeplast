import { Wallet, BarChart3, MapPin, Leaf } from "lucide-react";

export function WhyChooseUs() {
  const cards = [
    {
      title: "Saldo Instan",
      desc: "Setelah masukin plastik ke mesin, saldo langsung masuk ke akunmu secara otomatis.",
      icon: <Wallet className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-100/50",
      mockup: (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full relative overflow-hidden">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Saldo Anda</p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-lg font-bold text-slate-900">Rp 125.500</p>
            <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
          <p className="text-[8px] text-emerald-600 mt-2 font-medium">+ Rp 4.500 (Baru masuk)</p>
        </div>
      )
    },
    {
      title: "Harga Transparan",
      desc: "Cek harga plastik harian langsung dari aplikasi tanpa ada potongan tersembunyi.",
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-100/50",
      mockup: (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full space-y-2">
          <div className="flex justify-between text-[9px] items-center">
            <span className="font-medium text-slate-500">PET (Botol Bening)</span>
            <span className="font-bold text-slate-900">Rp 5.200/kg</span>
          </div>
          <div className="w-full bg-blue-500 h-1 rounded-full"></div>
          <div className="flex justify-between text-[9px] items-center pt-1">
            <span className="font-medium text-slate-500">Gelas Plastik</span>
            <span className="font-bold text-slate-900">Rp 2.800/kg</span>
          </div>
        </div>
      )
    },
    {
      title: "Mesin Terdekat",
      desc: "Temukan lokasi Drop-off Point Tradeplast di minimarket atau mall terdekat kamu.",
      icon: <MapPin className="w-5 h-5 text-red-600" />,
      color: "bg-red-100/50",
      mockup: (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
             <p className="text-[9px] font-bold">3 Mesin Aktif</p>
          </div>
          <div className="space-y-1.5 text-[8px]">
            <div className="p-1.5 bg-slate-50 rounded-md flex justify-between border border-slate-100">
               <span className="font-bold">Indomaret Sudirman</span>
               <span className="text-slate-400 text-[7px]">400m</span>
            </div>
            <div className="p-1.5 bg-slate-50 rounded-md flex justify-between opacity-50">
               <span>Grand Mall City</span>
               <span>1.2km</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Jejak Hijau",
      desc: "Pantau seberapa besar kontribusimu dalam mengurangi emisi karbon lewat daur ulang.",
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-100/50",
      mockup: (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full text-center">
          <div className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[8px] font-bold mb-2">
            Environment Hero
          </div>
          <p className="text-[10px] text-slate-500 font-medium">120kg Plastik Terkumpul</p>
          <div className="mt-2 flex justify-center -space-x-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full border border-white bg-slate-200" />
              ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl font-bold text-slate-900 tracking-tighter">
            Why you have to choose us
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-slate-500 max-w-2xl">
            Kami menghadirkan solusi teknologi mutakhir untuk mengubah cara dunia memandang sampah. Dengan sistem yang transparan, mudah, dan berdampak nyata bagi dompet serta bumi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: 2x2 Grid Card */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className={`bg-[#F1F3F5] rounded-[40px] p-8 h-95 flex flex-col justify-between transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 group ${index % 2 !== 0 ? 'md:mt-10' : ''}`}
              >
                {/* Mockup UI Area */}
                <div className="h-32 flex items-center justify-center transition-transform group-hover:scale-105 duration-500">
                  {card.mockup}
                </div>

                {/* Info Area */}
                <div>
                  <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-5`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: List Points */}
          <div className="lg:col-span-5 flex flex-col gap-12 py-10">
            {[
              { t: "Layanan Terpercaya", d: "Sistem otomasi mesin yang akurat dan tervalidasi oleh ribuan pengguna setiap harinya." },
              { t: "Proses Ramah Lingkungan", d: "Setiap gram plastik yang Anda setorkan diproses melalui rantai daur ulang yang bersih." },
              { t: "Teknologi Inovatif", d: "Memanfaatkan AI untuk mendeteksi jenis plastik secara presisi agar nilai jual Anda maksimal." },
              { t: "Nilai Jual Maksimal", d: "Kamu akan mendapatkan harga terbaik untuk setiap gram plastik yang kamu setorkan." }
            ].map((point, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="mt-1 h-8 w-1.5 shrink-0 rounded-full bg-emerald-500 transition-all group-hover:h-12"></div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{point.t}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{point.d}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}