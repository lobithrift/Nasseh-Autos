'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Car,
  Wrench,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { CompanyLogo } from '@/components/ui/CompanyLogo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Inventory / Buy', href: '/inventory' },
    { name: 'Sell / Trade-In', href: '/sell' },
    { name: 'Rent a Car', href: '/rent' },
    { name: 'Service & Repair', href: '/services' },
    { name: 'Financing', href: '/financing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-brand-black transition-all duration-300 ${
        isScrolled
          ? 'shadow-xl border-b border-zinc-800 bg-brand-black/95 backdrop-blur-md py-3'
          : 'border-b border-zinc-800/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Professional Company Logo */}
        <Link href="/" className="group focus:outline-none">
          <CompanyLogo size="md" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-brand-red shadow-md shadow-brand-red/20 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-zinc-800/80 hover:scale-[1.02]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/inventory"
            className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-brand-red/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
          >
            <Car className="w-4 h-4" />
            <span>Browse Inventory</span>
          </Link>

          <Link
            href="/service/book"
            className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
          >
            <Wrench className="w-4 h-4 text-brand-red" />
            <span>Book Service</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-slate-200 hover:text-white focus:outline-none transition-transform active:scale-95"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 animate-fadeIn" /> : <Menu className="w-6 h-6 animate-fadeIn" />}
        </button>
      </div>

      {/* Mobile Hamburger Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-black border-b border-zinc-800 animate-dropdown px-4 pt-4 pb-6 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-red text-white shadow-md'
                      : 'text-slate-300 hover:bg-zinc-900 hover:text-white hover:pl-5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/inventory"
              className="w-full py-3 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-center text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98"
            >
              <Car className="w-4 h-4" />
              Browse Inventory
            </Link>
            <Link
              href="/service/book"
              className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold text-center text-sm flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <Wrench className="w-4 h-4 text-brand-red" />
              Book a Service
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
