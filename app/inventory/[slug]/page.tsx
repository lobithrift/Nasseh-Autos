'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { getStoredVehicles, saveTestDriveToStore } from '@/lib/manassehStore';
import { Vehicle } from '@/types/manasseh';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinancingCalculator } from '@/components/vehicle/FinancingCalculator';
import {
  Calendar,
  Gauge,
  Fuel,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicles = getStoredVehicles();
  const vehicle = vehicles.find((v) => v.slug === params.slug) || vehicles[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<string>('overview');
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveSubmitted, setTestDriveSubmitted] = useState(false);

  const [testDriveForm, setTestDriveForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '10:00 AM',
    notes: '',
  });

  if (!vehicle) {
    return notFound();
  }

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testDriveForm.name || !testDriveForm.phone) return;

    saveTestDriveToStore({
      id: `TD-${Date.now().toString().slice(-5)}`,
      vehicle_id: vehicle.id,
      vehicle_title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      customer_name: testDriveForm.name,
      email: testDriveForm.email,
      phone: testDriveForm.phone,
      preferred_date: testDriveForm.date || new Date().toISOString().split('T')[0],
      preferred_time: testDriveForm.time,
      status: 'Pending',
      notes: testDriveForm.notes,
      created_at: new Date().toISOString(),
    });

    setTestDriveSubmitted(true);
    setTimeout(() => {
      setTestDriveSubmitted(false);
      setTestDriveModalOpen(false);
      setTestDriveForm({ name: '', email: '', phone: '', date: '', time: '10:00 AM', notes: '' });
    }, 3000);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347015199204';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Nasseh Autos, I am interested in scheduling a test drive for the ${vehicle.year} ${vehicle.make} ${vehicle.model} (ID: ${vehicle.stock_number}).`
  )}`;

  const toggleAccordion = (sec: string) => {
    setActiveAccordion(activeAccordion === sec ? '' : sec);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      <Breadcrumbs
        items={[
          { label: 'Inventory', href: '/inventory' },
          { label: vehicle.make, href: `/inventory?make=${vehicle.make}` },
          { label: `${vehicle.year} ${vehicle.make} ${vehicle.model}` },
        ]}
      />

      {/* Main Grid: Gallery & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Gallery & Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Image */}
          <div className="relative aspect-[16/10] bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <img
              src={vehicle.images[activeImageIndex] || vehicle.images[0]}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase bg-brand-red text-white shadow-md">
                {vehicle.condition}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {vehicle.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {vehicle.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-brand-red scale-105 shadow-md'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">Vehicle Description</h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {vehicle.description}
            </p>
          </div>

          {/* Specifications Accordions with Subtle Dropdown Animations */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 pb-2">Vehicle Specifications</h3>

            {/* Overview Section */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleAccordion('overview')}
                className="w-full p-4 bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-100 transition-colors"
              >
                <span>Overview & Basic Info</span>
                {activeAccordion === 'overview' ? (
                  <ChevronUp className="w-4 h-4 text-brand-red transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200" />
                )}
              </button>

              {activeAccordion === 'overview' && (
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs animate-dropdown">
                  <div>
                    <span className="text-slate-400 block font-semibold">Make</span>
                    <strong className="text-slate-900">{vehicle.make}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Model</span>
                    <strong className="text-slate-900">{vehicle.model}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Year</span>
                    <strong className="text-slate-900">{vehicle.year}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Body Type</span>
                    <strong className="text-slate-900">{vehicle.body_type}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Transmission</span>
                    <strong className="text-slate-900">{vehicle.transmission}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Fuel Type</span>
                    <strong className="text-slate-900">{vehicle.fuel_type}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Performance Section */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleAccordion('performance')}
                className="w-full p-4 bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-100 transition-colors"
              >
                <span>Engine & Performance</span>
                {activeAccordion === 'performance' ? (
                  <ChevronUp className="w-4 h-4 text-brand-red transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200" />
                )}
              </button>

              {activeAccordion === 'performance' && (
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs animate-dropdown">
                  <div>
                    <span className="text-slate-400 block font-semibold">Engine Specification</span>
                    <strong className="text-slate-900">{vehicle.engine}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Horsepower</span>
                    <strong className="text-slate-900">{vehicle.horsepower} HP</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Color</span>
                    <strong className="text-slate-900">{vehicle.color}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Features List */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleAccordion('features')}
                className="w-full p-4 bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-100 transition-colors"
              >
                <span>Key Features & Options ({vehicle.features.length})</span>
                {activeAccordion === 'features' ? (
                  <ChevronUp className="w-4 h-4 text-brand-red transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200" />
                )}
              </button>

              {activeAccordion === 'features' && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs animate-dropdown">
                  {vehicle.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 font-medium text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & CTAs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Stock ID: {vehicle.stock_number}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-3xl font-black text-brand-red tracking-tight">
                {formattedPrice}
              </p>
            </div>

            {/* Location & Delivery Info */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-red" />
                <span>Location: {vehicle.location}</span>
              </p>
              <p className="text-slate-600">
                Custom clearance fully verified with genuine documentation. Pre-purchase inspection report available on request.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setTestDriveModalOpen(true)}
                className="w-full py-4 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Schedule Test Drive
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:08182700111"
                className="w-full py-3.5 rounded-2xl bg-brand-black hover:bg-zinc-800 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-brand-red" />
                <span>Call Sales: 08182700111</span>
              </a>
            </div>
          </div>

          {/* Embedded Financing Calculator */}
          <FinancingCalculator initialPrice={vehicle.price} />
        </div>
      </div>

      {/* Test Drive Scheduling Modal */}
      {testDriveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-dropdown">
            <button
              onClick={() => setTestDriveModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {testDriveSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Test Drive Scheduled!</h3>
                <p className="text-sm text-slate-600">
                  Our sales representative in Udu will contact you via phone/WhatsApp to confirm your appointment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTestDriveSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Schedule Test Drive</h3>
                  <p className="text-xs text-slate-500">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={testDriveForm.name}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, name: e.target.value })}
                    placeholder="e.g. Chief Ovie Johnson"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={testDriveForm.phone}
                      onChange={(e) => setTestDriveForm({ ...testDriveForm, phone: e.target.value })}
                      placeholder="08012345678"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={testDriveForm.email}
                      onChange={(e) => setTestDriveForm({ ...testDriveForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Preferred Date</label>
                    <input
                      type="date"
                      value={testDriveForm.date}
                      onChange={(e) => setTestDriveForm({ ...testDriveForm, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Preferred Time</label>
                    <select
                      value={testDriveForm.time}
                      onChange={(e) => setTestDriveForm({ ...testDriveForm, time: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm uppercase tracking-wider shadow-lg"
                >
                  Confirm Test Drive Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
