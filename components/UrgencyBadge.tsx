import React from 'react';
import { UrgencyLevel } from '@/types/support';
import { AlertCircle, AlertTriangle, Info, Flame } from 'lucide-react';

interface UrgencyBadgeProps {
  urgency: UrgencyLevel | null | undefined;
  className?: string;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, className = '' }) => {
  if (!urgency) {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 ${className}`}>
        Normal
      </span>
    );
  }

  switch (urgency) {
    case 'Low':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
          <Info className="w-3 h-3 text-slate-500" />
          Low Urgency
        </span>
      );
    case 'Medium':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 ${className}`}>
          <AlertCircle className="w-3 h-3 text-amber-600" />
          Medium Urgency
        </span>
      );
    case 'High':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-800 border border-orange-200 ${className}`}>
          <AlertTriangle className="w-3 h-3 text-orange-600" />
          High Urgency
        </span>
      );
    case 'Critical':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-800 border border-rose-300 font-semibold animate-pulse ${className}`}>
          <Flame className="w-3.5 h-3.5 text-rose-600" />
          Critical Urgency
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 ${className}`}>
          {urgency}
        </span>
      );
  }
};
