import React from 'react';
import { DashboardStats as StatsType } from '@/types/support';
import { Inbox, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface DashboardStatsProps {
  stats: StatsType;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats,
  activeFilter = 'All',
  onFilterChange,
}) => {
  const cards = [
    {
      id: 'All',
      title: 'Total Requests',
      value: stats.total,
      icon: Inbox,
      color: 'text-slate-700 bg-slate-100 border-slate-200',
      activeColor: 'ring-2 ring-slate-800 bg-slate-50',
    },
    {
      id: 'Pending',
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      activeColor: 'ring-2 ring-amber-500 bg-amber-50/80',
    },
    {
      id: 'AI Responded',
      title: 'AI Responded',
      value: stats.aiResponded,
      icon: Sparkles,
      color: 'text-brand-blue bg-blue-50 border-blue-200',
      activeColor: 'ring-2 ring-brand-blue bg-blue-50/80',
    },
    {
      id: 'Resolved',
      title: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle2,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      activeColor: 'ring-2 ring-emerald-500 bg-emerald-50/80',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => onFilterChange && onFilterChange(card.id)}
            className={`p-5 rounded-2xl border bg-white shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md ${
              card.color
            } ${isActive ? card.activeColor : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                {card.title}
              </span>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white shadow-sm border border-slate-100">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
