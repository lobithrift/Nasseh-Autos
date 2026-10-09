import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 py-2 overflow-x-auto">
      <Link href="/" className="hover:text-brand-red flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-red transition-colors truncate">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-bold truncate">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
