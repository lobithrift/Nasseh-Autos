'use client';

import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function LocationsPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347015199204';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Nasseh Autos, I need directions to your service center.'
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Dealership & Service Center Location' }]} />

      <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
          DEALERSHIP LOCATOR
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">Visit Our Facility in Delta State</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          Located in DSC Township, Delta State, Nigeria. Equipped with state-of-the-art computerized diagnostic scanners and executive showroom facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">Nasseh Autos</h3>
            <p className="text-xs text-brand-red font-bold">DSC Township, Udu, Delta State</p>
          </div>

          <div className="space-y-4 text-xs font-semibold text-slate-700 pt-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-red shrink-0" />
              <div>
                <strong className="block text-slate-900 text-sm">Full Address:</strong>
                <span>DSC Township, Udu LGA, Delta State, Nigeria</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-red shrink-0" />
              <div>
                <strong className="block text-slate-900 text-sm">Opening Hours:</strong>
                <span>Monday – Saturday: 8:00 AM – 6:00 PM</span>
                <span className="block text-slate-500">Sunday: Closed</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-red shrink-0" />
              <div>
                <strong className="block text-slate-900 text-sm">Direct Phone Line:</strong>
                <a href="tel:08182700111" className="text-slate-900 font-bold hover:text-brand-red">
                  08182700111
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <strong className="block text-slate-900 text-sm">WhatsApp Line:</strong>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">
                  07015199204
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/service/book"
              className="w-full py-3.5 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-md"
            >
              Book Service at this Location
            </Link>

            <a
              href="https://maps.google.com/?q=DSC+Township+Udu+Delta+State+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-slate-200 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-brand-red" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>

        {/* Interactive Map Visual Mockup */}
        <div className="lg:col-span-7 bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl min-h-[400px] relative flex items-center justify-center p-8 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          <div className="relative z-10 space-y-4 max-w-md">
            <div className="w-16 h-16 rounded-full bg-brand-red/20 text-brand-red border border-brand-red/40 flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8 animate-bounce" />
            </div>

            <h3 className="text-2xl font-black text-white">DSC Township, Udu Facility</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Serving Udu, Warri, Effurun, Sapele, Asaba and across Delta State with certified automobile sales, executive car rentals, and workshop maintenance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
