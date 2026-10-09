'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Vehicle } from '@/types/manasseh';
import { getStoredVehicles } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Car, X, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const allVehicles = getStoredVehicles();

  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const ids = idsParam.split(',');
      const matches = allVehicles.filter((v) => ids.includes(v.id));
      setSelectedVehicles(matches);
    } else {
      setSelectedVehicles(allVehicles.slice(0, 3));
    }
  }, [searchParams, allVehicles]);

  const removeVehicle = (id: string) => {
    setSelectedVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const addVehicle = (v: Vehicle) => {
    if (selectedVehicles.length >= 4) return;
    if (!selectedVehicles.some((x) => x.id === v.id)) {
      setSelectedVehicles((prev) => [...prev, v]);
    }
  };

  const formatNaira = (val: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Inventory', href: '/inventory' }, { label: 'Compare Vehicles' }]} />

      <div className="bg-brand-black text-white p-8 rounded-3xl border border-zinc-800 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black">Compare Vehicles Side-by-Side</h1>
        <p className="text-xs text-slate-300">
          Compare specifications, prices, and features to choose the perfect vehicle.
        </p>
      </div>

      {selectedVehicles.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
          <Car className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Vehicles Selected for Comparison</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our vehicle inventory and click &quot;Compare Vehicle&quot; to compare up to 4 models.
          </p>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red text-white font-bold text-xs"
          >
            <span>Browse Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto pb-6">
          <table className="w-full min-w-[700px] border-collapse bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-left font-bold text-slate-500 uppercase tracking-wider w-48">
                  Specification
                </th>
                {selectedVehicles.map((v) => (
                  <th key={v.id} className="p-4 text-left relative min-w-[220px]">
                    <button
                      onClick={() => removeVehicle(v.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-500"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img
                      src={v.images[0]}
                      alt={v.model}
                      className="w-full h-32 object-cover rounded-xl mb-2"
                    />
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {v.year} {v.make} {v.model}
                    </h4>
                    <p className="text-brand-red font-black text-base mt-1">{formatNaira(v.price)}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              <tr>
                <td className="p-4 text-slate-500 font-bold bg-slate-50">Condition</td>
                {selectedVehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    <span className="px-2 py-0.5 rounded bg-brand-red/10 text-brand-red font-bold">
                      {v.condition}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 font-bold bg-slate-50">Year</td>
                {selectedVehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    {v.year}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 font-bold bg-slate-50">Mileage</td>
                {selectedVehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    {v.mileage.toLocaleString()} km
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 font-bold bg-slate-50">Transmission</td>
                {selectedVehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    {v.transmission}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 font-bold bg-slate-50">Fuel Type</td>
                {selectedVehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    {v.fuel_type}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 font-bold bg-slate-50">Body Type</td>
                {selectedVehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    {v.body_type}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 font-bold bg-slate-50">Engine & Power</td>
                {selectedVehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    {v.engine} ({v.horsepower} HP)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-slate-500 font-bold bg-slate-50">Action</td>
                {selectedVehicles.map((v) => (
                  <td key={v.id} className="p-4">
                    <Link
                      href={`/inventory/${v.slug}`}
                      className="px-4 py-2 rounded-xl bg-brand-red text-white font-bold block text-center shadow-sm hover:bg-brand-red-hover"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
