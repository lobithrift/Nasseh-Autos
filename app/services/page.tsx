'use client';

import React from 'react';
import { INITIAL_SERVICES } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Wrench, CheckCircle2, ArrowRight, ShieldCheck, Clock, DollarSign, Search } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const formatNaira = (val: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Services & Repairs' }]} />

      {/* Hero Header */}
      <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
          NASSEH AUTOS WORKSHOP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">Professional Care for Every Journey</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          From routine maintenance to complex engine and suspension repairs, our certified team keeps your vehicle safe, reliable, and road-ready.
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Link
            href="/service/book"
            className="px-6 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/20 transition-all"
          >
            Book Service Appointment
          </Link>
          <Link
            href="/service/status"
            className="px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-slate-200 font-bold text-sm hover:bg-zinc-800 transition-all"
          >
            Track Repair Status Online
          </Link>
        </div>
      </div>

      {/* Transparent Service Menu Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900">Transparent Service Menu</h2>
          <p className="text-xs text-slate-500">
            Clear price ranges for all standard automotive maintenance procedures.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Service Name</th>
                <th className="p-4">Estimated Duration</th>
                <th className="p-4">Price Range</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              {INITIAL_SERVICES.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <p>{srv.name}</p>
                        <p className="text-[11px] font-normal text-slate-500">{srv.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {srv.duration}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-brand-red whitespace-nowrap">
                    {srv.price_range || formatNaira(srv.starting_price)}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <Link
                      href={`/service/book?serviceId=${srv.id}`}
                      className="px-4 py-2 rounded-xl bg-brand-black hover:bg-zinc-800 text-white font-bold text-xs"
                    >
                      Book Now
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-100">
          * Final price may vary depending on vehicle make, model, parts required, and diagnostic scope.
        </p>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-brand-red transition-all"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{srv.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>

              <div className="pt-3 space-y-2">
                {srv.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Price Range</span>
                <span className="text-base font-extrabold text-brand-red">
                  {srv.price_range || formatNaira(srv.starting_price)}
                </span>
              </div>

              <Link
                href={`/service/book?serviceId=${srv.id}`}
                className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-xs"
              >
                Book Service
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
