import React from 'react';
import Link from 'next/link';

interface CompanyLogoProps {
  variant?: 'light' | 'dark' | 'footer';
  size?: 'sm' | 'md' | 'lg';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  variant = 'light',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Premium Automotive Crest / Shield Logo Icon */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-red via-red-700 to-black p-0.5 shadow-lg shrink-0 group-hover:scale-105 transition-transform`}
      >
        <div className="w-full h-full bg-brand-black rounded-[10px] flex items-center justify-center overflow-hidden relative border border-white/15">
          {/* Stylized Automotive Crown & Shield SVG Emblem */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1.5"
          >
            {/* Outer Shield Outline */}
            <path
              d="M20 4L34 9V19C34 27.5 28 34.5 20 37C12 34.5 6 27.5 6 19V9L20 4Z"
              stroke="#C8102E"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="#0A0A0A"
            />
            {/* Inner Speed Wings / Crown Lines */}
            <path
              d="M12 15L20 10L28 15L25 25L20 28L15 25L12 15Z"
              fill="url(#redGrad)"
              opacity="0.9"
            />
            {/* Sleek Car Silhouette Line */}
            <path
              d="M13 22C16 19.5 24 19.5 27 22"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="redGrad"
                x1="12"
                y1="10"
                x2="28"
                y2="28"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#C8102E" />
                <stop offset="1" stopColor="#E53E3E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-tight ${titleSizes[size]} text-white flex items-center gap-1.5`}>
          <span className="text-brand-red tracking-wider">NASSEH</span>
          <span className="text-white">AUTOS</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] tracking-[0.2em] font-extrabold text-slate-400 uppercase pt-0.5">
          <span>LUXURY</span>
          <span className="text-brand-red font-black">&bull;</span>
          <span>RELIABILITY</span>
        </div>
      </div>
    </div>
  );
};
