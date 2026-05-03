export function Distribution() {
  return (
    <section id="maps" className="py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 leading-tight tracking-tighter">Distribution Points of Our Facilities</h2>

        <p className="mb-16 mt-6 text-sm text-gray-500 leading-relaxed">Find the nearest recycling and distribution points across major cities. We're expanding continuously to make sustainability more accessible.</p>

        <div className="w-full h-115 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28228581858!2d106.74711697491067!3d-6.22956945301253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1777224097851!5m2!1sid!2sid"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
