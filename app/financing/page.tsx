'use client';

import React, { useState } from 'react';
import { FinancingCalculator } from '@/components/vehicle/FinancingCalculator';
import { saveFinancingRequestToStore } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DollarSign, CheckCircle2, ShieldAlert, ArrowRight, Building, FileText } from 'lucide-react';

export default function FinancingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehiclePrice: 38500000,
    depositAmount: 11550000,
    loanTermMonths: 36,
    employmentStatus: 'Employed',
    monthlyIncome: '₦1,500,000+',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    saveFinancingRequestToStore({
      id: `FIN-${Date.now().toString().slice(-5)}`,
      customer_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicle_price: Number(formData.vehiclePrice),
      deposit_amount: Number(formData.depositAmount),
      loan_term_months: Number(formData.loanTermMonths),
      estimated_monthly_payment: Math.round(
        (formData.vehiclePrice - formData.depositAmount) / formData.loanTermMonths
      ),
      employment_status: formData.employmentStatus,
      monthly_income: formData.monthlyIncome,
      status: 'New',
      created_at: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Vehicle Financing' }]} />

      <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
          FINANCING & LEASING ASSISTANCE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">Make Your Next Vehicle More Affordable</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          Nasseh Autos partners with leading financial institutions to offer structured vehicle financing options in Delta State.
        </p>
      </div>

      {/* Grid: Calculator & Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <FinancingCalculator initialPrice={38500000} />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">Required Documents</h3>
            <ul className="space-y-3 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>Valid Government Issued Photo ID (NIN / Passport / Driver&apos;s License)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>6 Months Official Stamped Bank Statements</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>Proof of Employment or Registered Business (CAC Document)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>Proof of Utility / Residential Address</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Important Disclaimer:
            </p>
            <p className="leading-relaxed">
              Financing availability, interest rates, and loan terms are subject to partner bank/lender approval and applicable credit conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        <h3 className="text-2xl font-black text-slate-900">Start Financing Pre-Approval Request</h3>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">Financing Request Submitted!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Our financing advisor will contact you via phone/WhatsApp to review your pre-qualification requirements.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Employment Status</label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                >
                  <option value="Employed">Employed (Corporate / Civil Service)</option>
                  <option value="Self-Employed">Self-Employed / Business Owner</option>
                  <option value="Contractor">Contractor / Executive</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Monthly Income Bracket</label>
                <select
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                >
                  <option value="₦500,000 - ₦1,000,000">₦500,000 - ₦1,000,000</option>
                  <option value="₦1,000,000 - ₦2,000,000">₦1,000,000 - ₦2,000,000</option>
                  <option value="₦2,000,000+">₦2,000,000+</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/20 cursor-pointer"
            >
              Start Financing Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
