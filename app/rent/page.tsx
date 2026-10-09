'use client';

import React, { useState } from 'react';
import { INITIAL_RENTALS, saveRentalBookingToStore } from '@/lib/manassehStore';
import { RentalVehicle } from '@/types/manasseh';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Key, Users, Fuel, ShieldCheck, CheckCircle2, Calendar, Clock, X, Send } from 'lucide-react';
import Link from 'next/link';

export default function RentPage() {
  const [rentals] = useState<RentalVehicle[]>(INITIAL_RENTALS);
  const [selectedRental, setSelectedRental] = useState<RentalVehicle | null>(null);
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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRental || !bookingForm.name || !bookingForm.phone) return;

    saveRentalBookingToStore({
      id: `RB-${Date.now().toString().slice(-5)}`,
      rental_vehicle_id: selectedRental.id,
      vehicle_name: `${selectedRental.year} ${selectedRental.make} ${selectedRental.model}`,
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
      setSelectedRental(null);
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

  const formatNaira = (val: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Car Rentals' }]} />

      {/* Hero */}
      <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
          EXECUTIVE CAR RENTALS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">Your Journey. Your Vehicle. Your Way.</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          Flexible vehicle rentals for corporate travel, executive movement, weddings, site inspections, and everyday mobility in Delta State.
        </p>
      </div>

      {/* Rentals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rentals.map((rental) => (
          <div
            key={rental.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            <div>
              <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                <img
                  src={rental.images[0]}
                  alt={rental.model}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                  {rental.availability_status}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {rental.year} {rental.make} {rental.model}
                  </h3>
                  <p className="text-2xl font-black text-brand-red mt-1">
                    {formatNaira(rental.daily_rate)}
                    <span className="text-xs text-slate-500 font-medium"> / day</span>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block font-normal">Weekly Rate</span>
                    <strong>{formatNaira(rental.weekly_rate)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-normal">Refundable Deposit</span>
                    <strong>{formatNaira(rental.deposit)}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-red" />
                    {rental.seats} Seats
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-brand-red" />
                    {rental.fuel_type}
                  </span>
                  <span>{rental.transmission}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {rental.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-2">
              <button
                onClick={() => setSelectedRental(rental)}
                className="w-full py-3.5 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-brand-red/20 transition-all cursor-pointer"
              >
                Request Rental
              </button>

              <Link
                href={`/rent/${rental.slug}`}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs text-center block hover:bg-slate-50"
              >
                View Full Rental Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedRental && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedRental(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Rental Request Submitted!</h3>
                <p className="text-sm text-slate-600">
                  Our rental manager in Delta State will contact you via phone/WhatsApp to confirm vehicle availability and pickup arrangements.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Request Rental</h3>
                  <p className="text-xs text-brand-red font-bold">
                    {selectedRental.year} {selectedRental.make} {selectedRental.model} (
                    {formatNaira(selectedRental.daily_rate)}/day)
                  </p>
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
                  Submit Rental Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
