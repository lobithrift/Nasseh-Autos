import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryBadgeProps {
  category: string | null | undefined;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const label = category || 'General Inquiry';

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-brand-blue-light text-brand-blue border border-blue-200/80 ${className}`}
    >
      <Tag className="w-3 h-3 text-brand-blue" />
      {label}
    </span>
  );
};
