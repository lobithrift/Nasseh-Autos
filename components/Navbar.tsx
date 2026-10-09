import React from 'react';
import Link from 'next/link';
import { Bot, HelpCircle, LayoutDashboard, Send } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-orange flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
              SWII <span className="text-brand-orange text-xs font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-brand-orange-light border border-brand-orange/20">AI Support</span>
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">Smart Support & Request Platform</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-100 transition-colors"
          >
            <Send className="w-4 h-4 text-brand-orange" />
            <span>Submit Request</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-brand-blue text-white hover:bg-brand-blue-hover shadow-sm transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
