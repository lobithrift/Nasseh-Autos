import React from 'react';
import { Filter } from 'lucide-react';

interface RequestFiltersProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  urgencyFilter: string;
  onUrgencyChange: (urgency: string) => void;
  categories: string[];
}

export const RequestFilters: React.FC<RequestFiltersProps> = ({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  urgencyFilter,
  onUrgencyChange,
  categories,
}) => {
  const statuses = ['All', 'Pending', 'AI Responded', 'Resolved'];
  const urgencies = ['All', 'Low', 'Medium', 'High', 'Critical'];

  return (
    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
      {/* Status Tabs */}
      <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 max-w-full overflow-x-auto">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === status
                ? 'bg-white text-brand-blue shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Category Dropdown */}
      <div className="relative">
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-blue cursor-pointer"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Urgency Dropdown */}
      <div className="relative">
        <select
          value={urgencyFilter}
          onChange={(e) => onUrgencyChange(e.target.value)}
          className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-blue cursor-pointer"
        >
          <option value="All">All Urgency</option>
          {urgencies.slice(1).map((u) => (
            <option key={u} value={u}>
              {u} Urgency
            </option>
          ))}
        </select>
        <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};
