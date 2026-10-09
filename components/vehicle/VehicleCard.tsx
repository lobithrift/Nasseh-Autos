'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vehicle } from '@/types/manasseh';
import { Calendar, Gauge, Fuel, ArrowRight, Heart, Share2, Check, Phone, MessageCircle } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onCompareToggle?: (v: Vehicle) => void;
  isCompared?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onCompareToggle,
  isCompared,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  const formattedMileage = vehicle.mileage.toLocaleString() + ' km';

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347015199204';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Nasseh Autos, I am interested in inquiring about the ${vehicle.year} ${vehicle.make} ${vehicle.model} (Stock ID: ${vehicle.stock_number}).`
  )}`;

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
          <img
            src={vehicle.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Condition Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-red text-white shadow-md">
              {vehicle.condition}
            </span>
            {vehicle.featured && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                Featured Deal
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur transition-all ${
              isFavorite
                ? 'bg-rose-600 text-white'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Stock ID overlay */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur text-slate-300 font-mono text-[10px]">
            ID: {vehicle.stock_number}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Price & Title */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {vehicle.make} &bull; {vehicle.body_type}
            </span>
            <Link href={`/inventory/${vehicle.slug}`}>
              <h3 className="text-xl font-extrabold text-white group-hover:text-brand-red transition-colors line-clamp-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
            </Link>

            <p className="text-2xl font-black text-brand-red tracking-tight mt-1">
              {formattedPrice}
            </p>
          </div>

          {/* Key Quick Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
            <div className="flex flex-col items-center justify-center p-1.5 text-center">
              <Calendar className="w-3.5 h-3.5 text-brand-red mb-1" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1.5 text-center border-x border-slate-800">
              <Gauge className="w-3.5 h-3.5 text-brand-red mb-1" />
              <span className="truncate max-w-full">{formattedMileage}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1.5 text-center">
              <Fuel className="w-3.5 h-3.5 text-brand-red mb-1" />
              <span>{vehicle.fuel_type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-2 space-y-2 border-t border-slate-800 mt-2">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/inventory/${vehicle.slug}`}
            className="flex-1 py-3 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-brand-red/20 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-emerald-950/80 text-emerald-400 hover:bg-emerald-900 border border-emerald-800 transition-colors"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        {onCompareToggle && (
          <button
            onClick={() => onCompareToggle(vehicle)}
            className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1 ${
              isCompared
                ? 'bg-slate-800 text-brand-red border border-brand-red/30'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
            <span>{isCompared ? 'Added to Comparison' : '+ Compare Vehicle'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
