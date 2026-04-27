import { Wallet, BarChart2, MapPin, Smartphone } from "lucide-react";

export function Advantage() {
  const sellerAdvantages = [
    {
      title: "Saldo Instan",
      desc: "Setelah masukin plastik ke mesin, saldo langsung masuk ke akunmu dan bisa ditarik kapan saja.",
      icon: <Wallet className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-50",
      mockup: (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Saldo Anda</p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xl font-bold text-slate-900">Rp 125.500</p>
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-[9px] text-emerald-600 mt-2 font-medium">+ Rp 4.500 (Baru saja masuk)</p>
        </div>
      )
    },
    {
      title: "Harga Transparan",
      desc: "Cek harga plastik harian langsung dari aplikasi. Kami jamin harga terbaik tanpa potongan tersembunyi.",
      icon: <BarChart2 className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-50",
      mockup: (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full space-y-2">
          <div className="flex justify-between text-[10px] items-center">
            <span className="font-medium text-slate-600">PET (Botol Bening)</span>
            <span className="font-bold text-slate-900">Rp 5.200/kg</span>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
             <div className="bg-blue-500 h-full w-[80%]"></div>
          </div>
          <div className="flex justify-between text-[10px] items-center pt-1">
            <span className="font-medium text-slate-600">Gelas Plastik</span>
            <span className="font-bold text-slate-900">Rp 2.800/kg</span>
          </div>
        </div>
      )
    },
    {
      title: "Mesin Terdekat",
      desc: "Temukan lokasi mesin Tradeplast di minimarket atau mall terdekat. Cukup scan QR dan masukkan plastikmu.",
      icon: <MapPin className="w-5 h-5 text-red-600" />,
      color: "bg-red-50",
      mockup: (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full">
          <div className="flex items-center gap-2 mb-3">
             <div className="w-2 h-2 bg-red-500 rounded-full"></div>
             <p className="text-[10px] font-bold">3 Mesin di sekitarmu</p>
          </div>
          <div className="space-y-2">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
               <span className="text-[9px] font-bold text-slate-700">Indomaret Sudirman</span>
               <span className="text-[8px] text-slate-400">400m</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center opacity-50">
               <span className="text-[9px] font-bold text-slate-700">Grand Mall City</span>
               <span className="text-[8px] text-slate-400">1.2km</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="px-4 py-1.5 bg-slate-200 text-slate-600 text-xs font-bold rounded-full uppercase tracking-widest">
              Our Advantages
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-6 leading-tight tracking-tighter">
              Cukup Datang, Masukkan, <br /> <span className="text-emerald-600">Terima Uangnya.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sellerAdvantages.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#F1F3F5] rounded-[40px] p-10 flex flex-col justify-between h-125 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 group"
            >
              <div className="mb-10 flex justify-center items-center group-hover:scale-105 transition-transform duration-500">
                {item.mockup}
              </div>
              
              <div>
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}