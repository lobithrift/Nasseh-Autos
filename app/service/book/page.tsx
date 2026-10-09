'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { INITIAL_SERVICES, saveServiceBookingToStore } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Wrench, CheckCircle2, User, Car, Calendar, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ServiceBookingPage() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get('serviceId') || INITIAL_SERVICES[0].id;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Customer
    name: '',
    email: '',
    phone: '',
    // Step 2: Vehicle
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    regNumber: '',
    // Step 3: Service
    serviceId: initialServiceId,
    problemDescription: '',
    // Step 4: Appointment
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '10:00 AM',
    location: 'DSC Township Service Center, Udu',
  });

  const selectedService = INITIAL_SERVICES.find((s) => s.id === formData.serviceId) || INITIAL_SERVICES[0];

  const handleNextStep = () => {
    if (currentStep === 1 && (!formData.name || !formData.phone)) {
      alert('Please fill in your name and phone number.');
      return;
    }
    if (currentStep === 2 && (!formData.make || !formData.model)) {
      alert('Please enter your vehicle make and model.');
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const refCode = `HMA-SB-${randomDigits}`;

    saveServiceBookingToStore({
      id: refCode,
      customer_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicle_make: formData.make,
      vehicle_model: formData.model,
      vehicle_year: Number(formData.year),
      registration_number: formData.regNumber || 'N/A',
      service_id: selectedService.id,
      service_name: selectedService.name,
      problem_description: formData.problemDescription || 'Standard Maintenance',
      appointment_date: formData.appointmentDate,
      appointment_time: formData.appointmentTime,
      service_location: formData.location,
      status: 'Booking Received',
      estimated_cost: selectedService.starting_price,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setGeneratedRefId(refCode);
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: 'Book Service' }]} />

      <div className="bg-brand-black text-white p-8 rounded-3xl border border-zinc-800 space-y-2">
        <h1 className="text-3xl font-black">Book Vehicle Servicing</h1>
        <p className="text-xs text-slate-300">
          Schedule an appointment at our DSC Township Udu workshop in 5 simple steps.
        </p>
      </div>

      {bookingConfirmed ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Booking Confirmed!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your service appointment request has been recorded. Save your booking reference code to check repair progress:
            </p>
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 inline-block font-mono text-2xl font-black text-brand-red tracking-widest my-2">
              {generatedRefId}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
            <p className="font-bold text-slate-900">Appointment Details:</p>
            <p><strong>Customer:</strong> {formData.name} ({formData.phone})</p>
            <p><strong>Vehicle:</strong> {formData.year} {formData.make} {formData.model}</p>
            <p><strong>Service:</strong> {selectedService.name}</p>
            <p><strong>Date & Time:</strong> {formData.appointmentDate} at {formData.appointmentTime}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={`/service/status?ref=${generatedRefId}`}
              className="px-6 py-3.5 rounded-2xl bg-brand-red text-white font-extrabold text-sm uppercase tracking-wider shadow-lg"
            >
              Track Repair Status
            </Link>

            <Link
              href="/"
              className="px-6 py-3.5 rounded-2xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50"
            >
              Return Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Step Stepper Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6 grid grid-cols-5 gap-2 text-center text-xs font-bold">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`py-2 rounded-xl transition-all ${
                  currentStep === step
                    ? 'bg-brand-red text-white shadow-sm'
                    : currentStep > step
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200/70 text-slate-500'
                }`}
              >
                Step {step}
              </div>
            ))}
          </div>

          <form onSubmit={handleFinalSubmit} className="p-6 sm:p-8 space-y-6">
            {/* STEP 1: Customer Details */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xl font-bold text-slate-900">Step 1: Customer Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Ovie Okoro"
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
              </div>
            )}

            {/* STEP 2: Vehicle Details */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xl font-bold text-slate-900">Step 2: Vehicle Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Make *</label>
                    <input
                      type="text"
                      required
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      placeholder="e.g. Toyota"
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
                      placeholder="e.g. Camry"
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
                    <label className="text-xs font-bold text-slate-700">Plate Number / Reg</label>
                    <input
                      type="text"
                      value={formData.regNumber}
                      onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                      placeholder="e.g. EFR-452-AA"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Service Selection */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xl font-bold text-slate-900">Step 3: Service & Issue Description</h3>
                <div>
                  <label className="text-xs font-bold text-slate-700">Select Service Required</label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                  >
                    {INITIAL_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} — (Starting ₦{srv.starting_price.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Describe Specific Symptoms or Problems</label>
                  <textarea
                    rows={4}
                    value={formData.problemDescription}
                    onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                    placeholder="Describe any noises, warning lights, or specific repair requests..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Appointment Schedule */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xl font-bold text-slate-900">Step 4: Appointment Schedule</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Preferred Time</label>
                    <select
                      value={formData.appointmentTime}
                      onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                    >
                      <option value="08:30 AM">08:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Summary & Final Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-xl font-bold text-slate-900">Step 5: Review & Confirm Booking</h3>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block font-bold">Customer Name</span>
                      <strong className="text-slate-900">{formData.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Phone Number</span>
                      <strong className="text-slate-900">{formData.phone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Vehicle</span>
                      <strong className="text-slate-900">{formData.year} {formData.make} {formData.model}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Service Selected</span>
                      <strong className="text-brand-red">{selectedService.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Appointment</span>
                      <strong className="text-slate-900">{formData.appointmentDate} at {formData.appointmentTime}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Starting Estimate</span>
                      <strong className="text-slate-900">₦{selectedService.starting_price.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/20 cursor-pointer"
                >
                  Confirm Booking Appointment
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-brand-red text-white font-bold text-xs flex items-center gap-1 shadow-md cursor-pointer"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
