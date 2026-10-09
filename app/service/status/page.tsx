'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getServiceBookingById, getStoredServiceBookings } from '@/lib/manassehStore';
import { ServiceBooking, ServiceStatusStep } from '@/types/manasseh';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Wrench, CheckCircle2, Search, Clock, FileText, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ALL_STATUS_STEPS: ServiceStatusStep[] = [
  'Booking Received',
  'Vehicle Checked In',
  'Inspection',
  'Estimate Prepared',
  'Awaiting Approval',
  'Repair in Progress',
  'Quality Check',
  'Ready for Collection',
  'Completed',
];

export default function ServiceStatusPage() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || 'HMA-SB-8921';

  const [refInput, setRefInput] = useState(initialRef);
  const [activeBooking, setActiveBooking] = useState<ServiceBooking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setHasSearched(true);
    const found = getServiceBookingById(refInput);
    setActiveBooking(found);
  };

  useEffect(() => {
    if (initialRef) {
      handleSearch();
    }
  }, [initialRef]);

  const getCurrentStepIndex = (status: ServiceStatusStep) => {
    const idx = ALL_STATUS_STEPS.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  const formatNaira = (val?: number) =>
    val
      ? new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          maximumFractionDigits: 0,
        }).format(val)
      : 'N/A';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: 'Track Service Status' }]} />

      <div className="bg-brand-black text-white p-8 rounded-3xl border border-zinc-800 space-y-2">
        <h1 className="text-3xl font-black">Live Service & Repair Tracker</h1>
        <p className="text-xs text-slate-300">
          Enter your service booking reference number to view real-time workshop inspection & repair progress.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            required
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            placeholder="Enter reference number (e.g. HMA-SB-8921)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 font-mono text-sm font-bold focus:outline-none focus:border-brand-red uppercase"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-md shrink-0 cursor-pointer"
        >
          Check Status
        </button>
      </form>

      {/* Search Results */}
      {hasSearched && !activeBooking && (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Booking Reference Not Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn&apos;t locate a service booking matching reference <code className="font-mono bg-slate-100 px-2 py-0.5 rounded text-brand-red">{refInput}</code>. Try sample code <code className="font-mono bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-900">HMA-SB-8921</code>.
          </p>
        </div>
      )}

      {activeBooking && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8 animate-fadeIn">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Ref ID: <span className="font-mono text-brand-red">{activeBooking.id}</span>
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-0.5">
                {activeBooking.vehicle_year} {activeBooking.vehicle_make} {activeBooking.vehicle_model}
              </h2>
              <p className="text-xs text-slate-500">
                Plate Reg: {activeBooking.registration_number} &bull; Customer: {activeBooking.customer_name}
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-brand-red/10 border border-brand-red/30 text-brand-red font-bold text-xs">
              Current Status: {activeBooking.status}
            </div>
          </div>

          {/* Timeline Step Indicators */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-600">
              Live Progress Timeline
            </h3>

            <div className="space-y-3">
              {ALL_STATUS_STEPS.map((step, idx) => {
                const currentIdx = getCurrentStepIndex(activeBooking.status);
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-brand-red text-white border-brand-red shadow-md font-bold'
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-slate-50 text-slate-400 border-slate-200/60'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCurrent
                          ? 'bg-white text-brand-red'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="flex-1 text-xs">
                      <p className="font-extrabold text-sm">{step}</p>
                      {isCurrent && (
                        <p className="text-[11px] text-red-100 font-normal">
                          Current stage in workshop — technicians updating telemetry notes.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Costs & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block uppercase">Estimate & Financials</span>
              <p><strong>Initial Estimate:</strong> {formatNaira(activeBooking.estimated_cost)}</p>
              <p><strong>Approved Amount:</strong> {formatNaira(activeBooking.approved_amount)}</p>
              <p><strong>Appointment Date:</strong> {activeBooking.appointment_date} ({activeBooking.appointment_time})</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block uppercase">Technician Notes</span>
              <p className="text-slate-700 italic">
                {activeBooking.notes || 'No technician notes recorded yet.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
