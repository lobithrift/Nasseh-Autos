'use client';

import React, { useState } from 'react';
import { saveSellRequestToStore } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DollarSign, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import Link from 'next/link';

export default function SellTradePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    make: '',
    model: '',
    year: 2018,
    mileage: 65000,
    condition: 'Foreign Used',
    expectedPrice: '',
    location: 'Delta State',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.make) return;

    saveSellRequestToStore({
      id: `VR-${Date.now().toString().slice(-5)}`,
      customer_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      make: formData.make,
      model: formData.model,
      year: Number(formData.year),
      mileage: Number(formData.mileage),
      condition: formData.condition,
      expected_price: Number(formData.expectedPrice) || 0,
      location: formData.location,
      description: formData.description,
      status: 'Pending Valuation',
      created_at: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Sell / Trade-In' }]} />

      <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
          VEHICLE VALUATION & PURCHASE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">Ready to Sell or Trade In Your Vehicle?</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          Get a straightforward, transparent vehicle valuation from Nasseh Autos. Fast inspection and cash payout or trade-in credit towards your next car.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Valuation Request Received!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Our vehicle valuation team in Udu will inspect your details and reach out via phone/WhatsApp with an offer estimate.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  make: '',
                  model: '',
                  year: 2018,
                  mileage: 65000,
                  condition: 'Foreign Used',
                  expectedPrice: '',
                  location: 'Delta State',
                  description: '',
                });
              }}
              className="px-6 py-3 rounded-2xl bg-brand-red text-white font-bold text-xs uppercase"
            >
              Submit Another Valuation
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Submit Vehicle Details for Valuation</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Chief Ovie Erhi"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="08031234567"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Vehicle Make *</label>
              <input
                type="text"
                required
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                placeholder="e.g. Lexus"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Model *</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g. RX350"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Mileage (km)</label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              >
                <option value="Foreign Used">Foreign Used (Tokunbo)</option>
                <option value="Locally Used">Locally Used</option>
                <option value="New">Brand New</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Expected Selling Price (₦)</label>
              <input
                type="number"
                value={formData.expectedPrice}
                onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                placeholder="e.g. 25000000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Additional Information / Vehicle Condition Notes</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="State any upgrades, custom duty status, or minor flaws..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/20 cursor-pointer"
          >
            Request Vehicle Valuation
          </button>
        </form>
      )}
    </div>
  );
}
