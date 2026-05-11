"use client";

import Link from "next/link";

const companyItems = [
  { name: "Our Mission", href: "/errors/" },
  { name: "Contact", href: "/errors" },
];

const resourceItems = [
  { name: "Services", href: "/errors" },
  { name: "Blog", href: "/errors" },
];

const getinvolvedItems = [
  { name: "Contribute Now", href: "/login" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#0F3D2E] text-white px-12 py-12">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
        
        {/* LOGO SECTION */}
        <div className="flex items-start gap-4">
          <div className="flex gap-2 flex-shrink-0">
            <div className="logoIcon">
              <div className="logoIconLine" />
            </div>

            <div className="plasticIcon">
              <div className="plasticIconSmall" />
              <div className="plasticIconLarge" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold">Tradeplast</h2>
            <p className="text-xs text-gray-300 mt-1">
              Recycle Your Plastic, Save Our Planet
            </p>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              Platform terintegrasi untuk pengelolaan limbah plastik yang efisien dan berkelanjutan.
            </p>
          </div>
        </div>

        {/* COMPANY */}
        <div className="border-l border-white/20 pl-10">
          <h3 className="font-semibold text-sm mb-3">Company</h3>

          <ul className="text-sm text-gray-300 space-y-2">
            {companyItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="border-l border-white/20 pl-10">
          <h3 className="font-semibold text-sm mb-3">Resources</h3>

          <ul className="text-sm text-gray-300 space-y-2">
            {resourceItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-white transition">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="border-l border-white/20 pl-10 flex flex-col items-start md:items-end">
          <h3 className="font-semibold text-sm mb-4">Get Involved</h3>

          <ul className="text-sm text-gray-300 space-y-2">
            {getinvolvedItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="bg-[#9B9A8A] px-6 py-2 rounded-full text-sm text-white hover:bg-[#82816D] transition inline-block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-auto mt-10 pt-6 border-t border-white/20 text-center text-xs text-gray-400">
        Tradeplast® registered trademarks of The Jaya Perkasa Plastik Recycling Corporation. © 2026 Tradeplast. All rights reserved.
      </div>
    </footer>
  );
}