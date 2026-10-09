'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { INITIAL_RENTALS, saveRentalBookingToStore } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Key, Users, Fuel, ShieldCheck, CheckCircle2, Calendar, PhoneCall, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function RentalDetailPage({ params }: PageProps) {
  const rental = INITIAL_RENTALS.find((r) => r.slug === params.slug) || INITIAL_RENTALS[0];

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    pickupTime: '09:00 AM',
    returnDate: '',
    returnTime: '05:00 PM',
    location: 'DSC Township, Udu, Delta State',
    notes: '',
  });

  if (!rental) {
    return notFound();
  }

  const formatNaira = (val: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) return;

    saveRentalBookingToStore({
      id: `RB-${Date.now().toString().slice(-5)}`,
      rental_vehicle_id: rental.id,
      vehicle_name: `${rental.year} ${rental.make} ${rental.model}`,
      customer_name: bookingForm.name,
      email: bookingForm.email,
      phone: bookingForm.phone,
      pickup_date: bookingForm.pickupDate || new Date().toISOString().split('T')[0],
      pickup_time: bookingForm.pickupTime,
      return_date: bookingForm.returnDate || new Date().toISOString().split('T')[0],
      return_time: bookingForm.returnTime,
      pickup_location: bookingForm.location,
      status: 'Pending',
      notes: bookingForm.notes,
      created_at: new Date().toISOString(),
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        pickupDate: '',
        pickupTime: '09:00 AM',
        returnDate: '',
        returnTime: '05:00 PM',
        location: 'DSC Township, Udu, Delta State',
        notes: '',
      });
    }, 3000);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347015199204';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Nasseh Autos, I want to book a rental for the ${rental.year} ${rental.make} ${rental.model}.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      <Breadcrumbs
        items={[
          { label: 'Rentals', href: '/rent' },
          { label: `${rental.year} ${rental.make} ${rental.model}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery & Description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[16/10] bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <img src={rental.images[0]} alt={rental.model} className="w-full h-full object-cover" />
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">Rental Terms & Description</h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {rental.description}
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Requirements & Conditions:</h4>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5">
                <li>Valid Driver&apos;s License or Passport identification</li>
                <li>Refundable caution deposit of {formatNaira(rental.deposit)}</li>
                <li>{rental.mileage_policy}</li>
                <li>Professional chauffeur available upon request</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Executive Rental Vehicle
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {rental.year} {rental.make} {rental.model}
              </h1>
              <p className="text-3xl font-black text-brand-red tracking-tight">
                {formatNaira(rental.daily_rate)}
                <span className="text-xs text-slate-500 font-medium"> / day</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Weekly Discounted Rate:</span>
                <span className="text-brand-red">{formatNaira(rental.weekly_rate)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Refundable Deposit:</span>
                <span>{formatNaira(rental.deposit)}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-4 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/20 transition-all cursor-pointer"
              >
                Book This Rental Vehicle
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Rental Booking Submitted!</h3>
                <p className="text-sm text-slate-600">
                  Our manager in Udu will contact you via phone/WhatsApp to confirm your vehicle pickup schedule.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Book {rental.model}</h3>
                  <p className="text-xs text-brand-red font-bold">{formatNaira(rental.daily_rate)}/day</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
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
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="08012345678"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pickup Date</label>
                    <input
                      type="date"
                      value={bookingForm.pickupDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, pickupDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Return Date</label>
                    <input
                      type="date"
                      value={bookingForm.returnDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, returnDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm uppercase tracking-wider shadow-lg"
                >
                  Confirm Rental Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
