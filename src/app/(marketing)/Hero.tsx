"use client";

import TextType from "../components/bits/TextType";

export default function Hero() {
  return (
    <section className="flex min-h-[90vh] w-full flex-col md:flex-row items-stretch overflow-hidden">
      {/* Kolon Kiri: Content */}
      <div className="flex flex-1 flex-col justify-center bg-[#16302B] px-8 py-20 md:px-20 lg:px-28">
        {/* 1. Sub-headline (Kecil & Lemah) */}
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/80">Eco-Friendly Platform</p>

        {/* 2. Main Title (Paling Menonjol) */}
        <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
          Make money and contribute to the <span className="text-emerald-400">green environment</span>
        </h1>

        {/* 3. Description (Medium kontras) */}
        <div className="mt-6 max-w-md text-base leading-relaxed text-slate-300 md:text-lg">
          <TextType
            typingSpeed={50}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            text="Transform your plastic waste into instant earnings while saving the planet. Join our movement today."
            deletingSpeed={50}
            variableSpeedEnabled={false}
            variableSpeedMin={60}
            variableSpeedMax={120}
            cursorBlinkDuration={0.5}
          />
        </div>

        {/* 4. CTA Button */}
        <div className="mt-10">
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#9B9A8A] px-10 py-4 font-semibold text-white transition-all hover:bg-[#82816D] hover:shadow-lg hover:shadow-black/20">
            <span className="relative">Make a change</span>
          </button>
        </div>

        {/* 5. Subtext (Sangat Kecil & Subtle) */}
        <div className="mt-12 border-l border-emerald-500/30 pl-4">
          <p className="text-xs italic leading-relaxed text-slate-400">
            Contribute to the green earth with our <br /> innovative recycling solutions.
          </p>
        </div>
      </div>

      {/* Kolom Kanan: Image */}
      <div className="relative flex-1 bg-slate-100">
        <img
          src="https://images.unsplash.com/photo-1614191663579-8780442c043b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Green Environment"
          className="h-full w-full object-cover"
        />
        {/* Overlay tipis agar tidak terlalu kontras dengan sisi kiri */}
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
    </section>
  );
}

// Make money and contribute to the <span className="text-emerald-400">green environment</span>
