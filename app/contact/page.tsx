'use client';

import React, { useState } from 'react';
import { saveContactMessageToStore } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    saveContactMessageToStore({
      id: `MSG-${Date.now().toString().slice(-5)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'General Inquiry',
      message: formData.message,
      status: 'Unread',
      created_at: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347015199204';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Nasseh Autos, I am reaching out from your Contact page.'
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
          GET IN TOUCH
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">We&apos;re Here for Every Part of Your Journey</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          Speak with our automotive specialists, schedule a workshop visit, or inquire about vehicle availability in Udu, Delta State.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">Contact Details</h3>

            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-sm">Dealership & Workshop Address:</strong>
                  <span>DSC Township, Udu, Delta State, Nigeria</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-sm">Phone Line:</strong>
                  <a href="tel:08182700111" className="hover:text-brand-red text-slate-900 font-bold">
                    08182700111
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-sm">WhatsApp Line:</strong>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-emerald-600 font-bold"
                  >
                    07015199204 (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-sm">Email Address:</strong>
                  <span>nassehautos@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Business Hours</h4>
              <p className="text-xs text-slate-600">Monday – Saturday: 8:00 AM – 6:00 PM</p>
              <p className="text-xs text-slate-600">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-2xl font-black text-slate-900">Send Us a Direct Message</h3>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting Nasseh Autos. Our representative will respond to your inquiry shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Chief Ovie Johnson"
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div>
                  <label className="text-xs font-bold text-slate-700">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Vehicle Inquiry"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you today? Please explain your question or request..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-brand-red mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-red/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
