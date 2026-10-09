'use client';

import React, { useState, useMemo } from 'react';
import { Vehicle, VehicleFilterState } from '@/types/manasseh';
import { getStoredVehicles } from '@/lib/manassehStore';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Search, Filter, RotateCcw, Car, SlidersHorizontal, Check } from 'lucide-react';
import Link from 'next/link';

export default function InventoryPage() {
  const [allVehicles] = useState(() => getStoredVehicles());
  const [comparedVehicles, setComparedVehicles] = useState<Vehicle[]>([]);

  // Filter state
  const [filters, setFilters] = useState<VehicleFilterState>({
    searchQuery: '',
    condition: 'All',
    make: 'All',
    model: 'All',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    maxMileage: '',
    fuelType: 'All',
    transmission: 'All',
    bodyType: 'All',
    status: 'All',
    sortBy: 'featured',
  });

  const handleFilterChange = (field: keyof VehicleFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      condition: 'All',
      make: 'All',
      model: 'All',
      minYear: '',
      maxYear: '',
      minPrice: '',
      maxPrice: '',
      maxMileage: '',
      fuelType: 'All',
      transmission: 'All',
      bodyType: 'All',
      status: 'All',
      sortBy: 'featured',
    });
  };

  // Filter and sort logic
  const filteredVehicles = useMemo(() => {
    return allVehicles
      .filter((v) => {
        if (filters.condition !== 'All' && v.condition !== filters.condition) return false;
        if (filters.make !== 'All' && v.make !== filters.make) return false;
        if (filters.bodyType !== 'All' && v.body_type !== filters.bodyType) return false;
        if (filters.fuelType !== 'All' && v.fuel_type !== filters.fuelType) return false;
        if (filters.transmission !== 'All' && v.transmission !== filters.transmission) return false;
        if (filters.status !== 'All' && v.status !== filters.status) return false;

        if (filters.minPrice && v.price < Number(filters.minPrice)) return false;
        if (filters.maxPrice && v.price > Number(filters.maxPrice)) return false;
        if (filters.minYear && v.year < Number(filters.minYear)) return false;
        if (filters.maxYear && v.year > Number(filters.maxYear)) return false;

        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchMake = v.make.toLowerCase().includes(q);
          const matchModel = v.model.toLowerCase().includes(q);
          const matchStock = v.stock_number.toLowerCase().includes(q);
          const matchDesc = v.description.toLowerCase().includes(q);
          return matchMake || matchModel || matchStock || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'year-new') return b.year - a.year;
        if (filters.sortBy === 'mileage-low') return a.mileage - b.mileage;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [allVehicles, filters]);

  // Extract unique makes for filter dropdown
  const uniqueMakes = useMemo(() => {
    const set = new Set<string>();
    allVehicles.forEach((v) => set.add(v.make));
    return Array.from(set);
  }, [allVehicles]);

  const handleCompareToggle = (vehicle: Vehicle) => {
    if (comparedVehicles.some((v) => v.id === vehicle.id)) {
      setComparedVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
    } else {
      if (comparedVehicles.length >= 4) {
        alert('You can compare a maximum of 4 vehicles at a time.');
        return;
      }
      setComparedVehicles((prev) => [...prev, vehicle]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Vehicle Inventory' }]} />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-black text-white p-8 rounded-3xl border border-zinc-800">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Find the Right Car for You
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Browse certified foreign used (Tokunbo) and new vehicles available at Nasseh Autos in Delta State.
          </p>
        </div>

        {comparedVehicles.length > 0 && (
          <Link
            href={`/compare?ids=${comparedVehicles.map((v) => v.id).join(',')}`}
            className="px-5 py-3 rounded-2xl bg-brand-red text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
          >
            <span>Compare ({comparedVehicles.length}) Vehicles</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="space-y-6 bg-slate-50 p-6 rounded-3xl border border-slate-200/80 h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-brand-red" />
              Filter Vehicles
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-brand-red font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Make, model, keyword..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-brand-red"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Condition
            </label>
            <select
              value={filters.condition}
              onChange={(e) => handleFilterChange('condition', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-brand-red"
            >
              <option value="All">All Conditions</option>
              <option value="Foreign Used">Foreign Used (Tokunbo)</option>
              <option value="New">New</option>
              <option value="Locally Used">Locally Used</option>
            </select>
          </div>

          {/* Make */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Vehicle Make
            </label>
            <select
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-brand-red"
            >
              <option value="All">All Makes</option>
              {uniqueMakes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Body Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Body Type
            </label>
            <select
              value={filters.bodyType}
              onChange={(e) => handleFilterChange('bodyType', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-brand-red"
            >
              <option value="All">All Body Types</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>

          {/* Max Price Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Max Price (₦)
            </label>
            <select
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-brand-red"
            >
              <option value="">No Maximum Limit</option>
              <option value="30000000">Under ₦30,000,000</option>
              <option value="50000000">Under ₦50,000,000</option>
              <option value="80000000">Under ₦80,000,000</option>
              <option value="100000000">Under ₦100,000,000</option>
            </select>
          </div>
        </aside>

        {/* Main Vehicle Grid */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs font-extrabold text-slate-700">
              Showing <span className="text-brand-red">{filteredVehicles.length}</span> Vehicles Available
            </p>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Sort By:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-brand-red"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="mileage-low">Mileage: Lowest First</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredVehicles.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <Car className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Vehicles Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No vehicles match your current filter selections. Try clearing your filters to see available inventory.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-brand-red text-white font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onCompareToggle={handleCompareToggle}
                  isCompared={comparedVehicles.some((v) => v.id === vehicle.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
