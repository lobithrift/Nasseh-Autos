'use client';

import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck, Award, HeartHandshake, Users, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
          WHO WE ARE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">Driven by Trust. Built Around You.</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          Nasseh Autos is an automobile company focused on providing customers with quality vehicles, dependable automotive services, and a straightforward buying and ownership experience in Delta State, Nigeria.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Our Mission</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            To deliver transparent, high-quality vehicle sales, executive rental mobility, and computerized technical repairs that exceed customer expectations across Delta State and Nigeria.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-black text-white flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Our Vision</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            To become the most trusted automotive brand in Nigeria—recognized for uncompromising quality, certified pre-owned vehicles, and exceptional after-sales workshop support.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900">Our Core Values</h2>
          <p className="text-xs text-slate-500">The principles that guide every vehicle transaction and service appointment.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: 'Integrity', desc: '100% verified documentation and honest communication.' },
            { title: 'Quality', desc: 'Rigorous 50-point inspection before any vehicle is handed over.' },
            { title: 'Customer Service', desc: 'Personalized attention from consultation to after-sales care.' },
            { title: 'Transparency', desc: 'Clear pricing with zero hidden charges or false claims.' },
            { title: 'Reliability', desc: 'High-grade components and certified technician expertise.' },
            { title: 'Professionalism', desc: 'Punctual appointments and structured workshop workflow.' },
          ].map((v, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              <h4 className="font-bold text-slate-900 text-sm">{v.title}</h4>
              <p className="text-xs text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
