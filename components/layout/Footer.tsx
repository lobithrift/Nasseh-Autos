'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { CompanyLogo } from '@/components/ui/CompanyLogo';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347015199204';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Nasseh Autos, I would like to inquire about your vehicles/services.'
  )}`;

  return (
    <footer className="bg-brand-black text-slate-400 border-t border-zinc-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-zinc-900 via-slate-900 to-brand-black rounded-3xl border border-zinc-800 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Stay in the Driver&apos;s Seat
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Get new vehicle arrivals, exclusive discount offers, and seasonal auto maintenance tips delivered to your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px] max-w-md">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                Thank you for subscribing to Nasseh Autos!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-brand-red placeholder-zinc-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm shrink-0 transition-colors flex items-center gap-1.5 shadow-md shadow-brand-red/20 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <CompanyLogo size="md" />

            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Premier Automobile Dealership & Automotive Services Platform in DSC Township, Udu, Delta State, Nigeria. Providing quality new & foreign used car sales, executive rentals, computerized diagnostics, and full servicing support.
            </p>

            <div className="pt-2 space-y-2 text-xs font-medium text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                <span>DSC Township, Udu, Delta State, Nigeria</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <span>Phone: 08182700111</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: 07015199204</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <span>nassehautos@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Column 1: Vehicles */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Vehicles</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/inventory?condition=Foreign+Used" className="hover:text-brand-red transition-colors">
                  Foreign Used (Tokunbo)
                </Link>
              </li>
              <li>
                <Link href="/inventory?condition=New" className="hover:text-brand-red transition-colors">
                  New Cars
                </Link>
              </li>
              <li>
                <Link href="/inventory?bodyType=SUV" className="hover:text-brand-red transition-colors">
                  SUVs & 4x4 Trucks
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-brand-red transition-colors">
                  Car Rentals Fleet
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-brand-red transition-colors">
                  Compare Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/services" className="hover:text-brand-red transition-colors">
                  Service & Repair Menu
                </Link>
              </li>
              <li>
                <Link href="/service/book" className="hover:text-brand-red transition-colors">
                  Book Service Appointment
                </Link>
              </li>
              <li>
                <Link href="/service/status" className="hover:text-brand-red transition-colors">
                  Track Repair Status
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-brand-red transition-colors">
                  Sell / Trade-In Valuation
                </Link>
              </li>
              <li>
                <Link href="/financing" className="hover:text-brand-red transition-colors">
                  Financing Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/about" className="hover:text-brand-red transition-colors">
                  About Nasseh Autos
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-brand-red transition-colors">
                  Service Center Location
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-red transition-colors">
                  Blog & Auto Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-red transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-red transition-colors text-slate-500">
                  Staff Login / Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nasseh Autos. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-brand-red" /> Verified Quality & Trusted Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
