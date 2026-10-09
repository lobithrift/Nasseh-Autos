'use client';

import React from 'react';
import { Phone, MessageCircle, Wrench, Car } from 'lucide-react';
import Link from 'next/link';

export const MobileActionBar: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347015199204';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Nasseh Autos, I am contacting you from your website.'
  )}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-black/95 backdrop-blur border-t border-zinc-800 p-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href="tel:08182700111"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-zinc-900 border border-zinc-800 text-slate-200 hover:text-white transition-colors"
        >
          <Phone className="w-4 h-4 text-sky-400 mb-1" />
          <span className="text-[11px] font-bold">Call Us</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 font-bold hover:bg-emerald-900/80 transition-colors"
        >
          <MessageCircle className="w-4 h-4 mb-1" />
          <span className="text-[11px]">WhatsApp</span>
        </a>

        <Link
          href="/inventory"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-500 transition-colors shadow-md shadow-sky-600/20"
        >
          <Car className="w-4 h-4 mb-1" />
          <span className="text-[11px]">Cars</span>
        </Link>
      </div>
    </div>
  );
};
