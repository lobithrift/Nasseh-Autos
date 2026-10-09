'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Car,
  Wrench,
  Key,
  ShieldCheck,
  ArrowRight,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  Gauge,
  Fuel,
  Zap,
} from 'lucide-react';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import {
  getStoredVehicles,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
} from '@/lib/manassehStore';

// Hero Car Transition Slides Data
const HERO_SLIDES = [
  {
    id: 1,
    title: '2024 Mercedes-Benz GLE 450 AMG',
    subtitle: 'Pure Luxury & Dynamic Executive Performance',
    tagline: 'Featured Luxury SUV',
    price: '₦78,000,000',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80',
    specs: { engine: '3.0L Turbo V6', power: '362 HP', transmission: '9-Speed Auto', condition: 'Foreign Used (Tokunbo)' },
    slug: 'mercedes-benz-gle-450-2024',
  },
  {
    id: 2,
    title: '2023 Lexus RX 350 F-Sport',
    subtitle: 'Refined Japanese Craftsmanship & Supreme Comfort',
    tagline: 'Best Selling Luxury Crossover',
    price: '₦55,000,000',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2000&q=80',
    specs: { engine: '2.4L Turbo Inline-4', power: '275 HP', transmission: '8-Speed Direct Shift', condition: 'Foreign Used (Tokunbo)' },
    slug: 'lexus-rx350-2023',
  },
  {
    id: 3,
    title: '2024 Toyota Land Cruiser Prado VX',
    subtitle: 'Unstoppable All-Terrain Command & Durability',
    tagline: 'Premium Executive 4x4',
    price: '₦88,000,000',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=80',
    specs: { engine: '2.8L Turbo Diesel', power: '201 HP', transmission: '6-Speed Auto 4WD', condition: 'Brand New' },
    slug: 'toyota-prado-vx-2024',
  },
  {
    id: 4,
    title: '2023 BMW X5 xDrive40i M-Sport',
    subtitle: 'Precision German Engineering & Technological Superiority',
    tagline: 'Ultimate Driving Machine',
    price: '₦62,000,000',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=80',
    specs: { engine: '3.0L TwinPower Turbo', power: '335 HP', transmission: '8-Speed Steptronic', condition: 'Foreign Used (Tokunbo)' },
    slug: 'bmw-x5-2023',
  },
];

export default function HomePage() {
  const [vehicles] = useState(() => getStoredVehicles());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredVehicles = vehicles.filter((v) => v.featured).slice(0, 3);

  // Auto-slide transition effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const activeCar = HERO_SLIDES[currentSlide];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 bg-slate-950 text-slate-100">
      {/* 1. IMPRESSIVE HERO SECTION WITH AUTOMATIC & MANUAL CAR SLIDE TRANSITION */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[88vh] flex items-center">
        {/* Background Image Carousel with Smooth Fade Transitions */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-50 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-10000 ease-linear"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
          </div>
        ))}

        {/* Ambient Gradient Overlays for High Contrast */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full flex flex-col justify-between min-h-[85vh] space-y-12">
          {/* Main Headline & Hero Actions (Left-aligned, leaving right side open for clean car transition viewing) */}
          <div className="max-w-3xl space-y-6 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>Nasseh Autos &bull; Executive Showroom</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
                Experience Unrivaled Luxury.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-amber-400">
                  Drive With Nasseh.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                Discover exceptional luxury vehicle sales, executive rentals, and certified computerized automotive care tailored for discerning drivers.
              </p>
            </div>

            {/* Primary & Secondary Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/inventory"
                className="px-8 py-4 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-base shadow-xl shadow-brand-red/30 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Car className="w-5 h-5" />
                <span>Browse All Cars</span>
              </Link>

              <Link
                href="/service/book"
                className="px-8 py-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-slate-200 border border-zinc-700 font-extrabold text-base flex items-center gap-2.5 backdrop-blur transition-all"
              >
                <Wrench className="w-5 h-5 text-brand-red" />
                <span>Book Service</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800/80 max-w-3xl text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>Verified Customs Clearance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>50-Point Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>Computer Diagnostics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>Nationwide Delivery</span>
              </div>
            </div>
          </div>

          {/* Bottom Integrated Slider Bar (Clean & Non-overlapping) */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-zinc-800">
            {/* Active Vehicle Badge & Quick Link */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="px-2.5 py-1 rounded-md bg-brand-red text-white text-[10px] font-black uppercase tracking-wider">
                Slide 0{currentSlide + 1}
              </span>
              <div className="flex items-baseline gap-2 text-xs sm:text-sm font-bold text-white truncate">
                <span className="text-slate-100">{activeCar.title}</span>
                <span className="text-brand-red font-black">&bull; {activeCar.price}</span>
              </div>
              <Link
                href="/inventory"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-extrabold text-slate-400 hover:text-white transition-colors ml-2"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Slider Controls (Indicators, Play/Pause, Previous/Next) */}
            <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
              {/* Slide Dots */}
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentSlide ? 'w-7 bg-brand-red shadow-md shadow-brand-red/50' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-2 rounded-xl bg-slate-900 border border-zinc-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={isAutoPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-brand-red" />}
                </button>
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-xl bg-slate-900 border border-zinc-800 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white transition-colors cursor-pointer shadow-md shadow-brand-red/20"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICE NAVIGATION (THREE LARGE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* BUY A CAR */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-red/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-2xl group-hover:bg-brand-red group-hover:text-white transition-all">
              <Car className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-white">BUY A CAR</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Find a quality new or foreign used (Tokunbo) vehicle that fits your lifestyle, family needs, and budget.
            </p>
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-red group-hover:text-red-400 pt-2"
            >
              <span>Explore Inventory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* RENT A CAR */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-red/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-2xl group-hover:bg-brand-red transition-all">
              <Key className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-white">RENT A CAR</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Flexible vehicle rentals for corporate travel, executive movement, weddings, and everyday mobility.
            </p>
            <Link
              href="/rent"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-200 group-hover:text-brand-red pt-2"
            >
              <span>View Rental Cars</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* SERVICE & REPAIR */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-red/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <Wrench className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-white">SERVICE & REPAIR</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Keep your vehicle performing at its best with computerized diagnostics, oil changes, and full maintenance.
            </p>
            <Link
              href="/service/book"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-400 group-hover:text-amber-300 pt-2"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED INVENTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
              CURATED AUTOMOBILES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Find Your Next Vehicle
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Explore carefully selected and certified vehicles available right now at Nasseh Autos.
            </p>
          </div>

          <Link
            href="/inventory"
            className="px-6 py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm flex items-center justify-center gap-2 transition-all self-start md:self-auto shadow-md shadow-brand-red/20"
          >
            <span>View All Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
              THE NASSEH ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Why Customers Choose Nasseh Autos
            </h2>
            <p className="text-sm text-slate-400">
              We build long-term relationships through transparency, quality engineering, and dedicated service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Quality Vehicles</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hand-picked vehicles subjected to strict 50-point mechanical & electrical pre-purchase inspections.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Professional Service</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                State-of-the-art diagnostic scanner tools and certified master technicians.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Transparent Process</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No hidden costs. Full custom duty documentation and verified vehicle history reports.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl">
                04
              </div>
              <h3 className="text-lg font-bold text-white">Convenient Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Book maintenance appointments, track repair status online, and chat directly via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOMEPAGE SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-white">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
              AUTOMOTIVE SERVICE CENTER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              More Than a Dealership
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              From routine oil changes to complex suspension overhauls and computerized diagnostics, Nasseh Autos keeps your vehicle dependable long after purchase.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/services"
              className="px-6 py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm text-center shadow-lg transition-all"
            >
              Explore Our Services
            </Link>
            <Link
              href="/service/status"
              className="px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm text-center transition-all"
            >
              Track Repair Status
            </Link>
          </div>
        </div>

        {/* Services Cards Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_SERVICES.slice(0, 4).map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-3 hover:border-brand-red/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{srv.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {srv.description}
              </p>
              <p className="text-xs font-extrabold text-brand-red">
                {srv.price_range || `₦${srv.starting_price.toLocaleString()}`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
            CUSTOMER REVIEWS
          </span>
          <h2 className="text-3xl font-black text-white">What Our Customers Say</h2>
          <p className="text-sm text-slate-400">
            Real feedback from vehicle buyers and executive workshop clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  &quot;{t.review}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-sm font-bold text-white">{t.customer_name}</p>
                <p className="text-xs text-slate-400">{t.vehicle_or_service} &bull; Verified Client</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-brand-red via-red-700 to-red-900 text-white text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to Find Your Next Vehicle?
          </h2>
          <p className="text-base sm:text-lg text-red-100 max-w-2xl mx-auto font-medium">
            Browse our inventory, speak with our automotive specialists, or book a service appointment today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/inventory"
              className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:bg-slate-100 transition-all"
            >
              Browse Inventory
            </Link>
            <Link
              href="/service/book"
              className="px-8 py-4 rounded-2xl bg-slate-950 text-white font-black text-sm uppercase tracking-wider hover:bg-zinc-900 transition-all border border-white/20"
            >
              Book a Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
