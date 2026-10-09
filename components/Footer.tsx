import React from 'react';
import { Bot, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">SWII Support AI Platform</p>
              <p className="text-xs text-slate-400">Automated Customer Service & Complaint Management</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" /> Powered by AI
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> Secure & Encrypted
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} SWII. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
