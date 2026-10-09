import { NextResponse } from 'next/server';
import { supabase, localRequestsStore } from '@/lib/supabase';
import { SupportRequest } from '@/types/support';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const urgency = searchParams.get('urgency');
    const query = searchParams.get('query') || searchParams.get('search');

    let dbRequests: SupportRequest[] = [];

    try {
      let dbQuery = supabase
        .from('support_requests')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error } = await dbQuery;
      if (!error && data) {
        dbRequests = data as SupportRequest[];
      }
    } catch (dbErr) {
      console.warn('Supabase DB fetch fallback:', dbErr);
    }

    // Merge Supabase requests with local memory store requests (avoiding duplicates)
    const localRequests = Array.from(localRequestsStore.values());
    const existingIds = new Set(dbRequests.map((r) => r.id));
    
    const combinedRequests = [
      ...dbRequests,
      ...localRequests.filter((r) => !existingIds.has(r.id)),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Apply filtering
    let filtered = combinedRequests;

    if (status && status !== 'All') {
      filtered = filtered.filter((r) => r.status === status);
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((r) => r.category === category);
    }

    if (urgency && urgency !== 'All') {
      filtered = filtered.filter((r) => r.urgency === urgency);
    }

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          (r.subject || '').toLowerCase().includes(q) ||
          (r.customer_name || '').toLowerCase().includes(q) ||
          (r.customer_email || '').toLowerCase().includes(q) ||
          (r.complaint || '').toLowerCase().includes(q) ||
          (r.category || '').toLowerCase().includes(q) ||
          (r.summary || '').toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      requests: filtered,
    });
  } catch (error) {
    console.error('GET /api/requests error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch support requests.' },
      { status: 500 }
    );
  }
}
