'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { INITIAL_BLOGS } from '@/lib/manassehStore';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const post = INITIAL_BLOGS.find((b) => b.slug === params.slug) || INITIAL_BLOGS[0];

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-red text-white">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-b border-slate-200 pb-4">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4 text-brand-red" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-brand-red" />
            {post.read_time}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-brand-red" />
            {new Date(post.published_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="aspect-[16/9] bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 text-slate-800 text-sm leading-relaxed space-y-4 whitespace-pre-line shadow-sm">
        {post.content}
      </div>

      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>
    </div>
  );
}
