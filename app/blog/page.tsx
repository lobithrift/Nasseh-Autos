'use client';

import React from 'react';
import { INITIAL_BLOGS } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Blog & Resources' }]} />

      <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl border border-zinc-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
          AUTOMOTIVE GUIDES & NEWS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">Car Buying & Maintenance Tips</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          Expert automotive advice, Nigerian driving tips, and maintenance guides compiled by Nasseh Autos technical specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_BLOGS.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[16/9] bg-zinc-900 overflow-hidden relative">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-brand-red text-white shadow-md">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-brand-red" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-red" />
                    {post.read_time}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-brand-red transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-red hover:text-brand-red-hover"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
