import { NextResponse } from 'next/server';
import { supabase, localRequestsStore } from '@/lib/supabase';
import { RequestStatus, SupportRequest } from '@/types/support';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Request ID is required' },
        { status: 400 }
      );
    }

    // Try fetching from Supabase first
    try {
      const { data, error } = await supabase
        .from('support_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return NextResponse.json({
          success: true,
          request: data,
        });
      }
    } catch (dbErr) {
      console.warn('Supabase GET request by ID error:', dbErr);
    }

    // Fallback to local store
    if (localRequestsStore.has(id)) {
      return NextResponse.json({
        success: true,
        request: localRequestsStore.get(id),
      });
    }

    return NextResponse.json(
      { success: false, message: 'Support request not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('GET /api/requests/[id] error:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving support request' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Request ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    const validStatuses: RequestStatus[] = ['Pending', 'AI Responded', 'Resolved'];
    if (!status || !validStatuses.includes(status as RequestStatus)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value. Allowed: Pending, AI Responded, Resolved' },
        { status: 400 }
      );
    }

    let updatedRecord: SupportRequest | null = null;

    try {
      const { data, error } = await supabase
        .from('support_requests')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        updatedRecord = data as SupportRequest;
      }
    } catch (err) {
      console.warn('Supabase update status failed, updating local store:', err);
    }

    if (!updatedRecord && localRequestsStore.has(id)) {
      const existing = localRequestsStore.get(id)!;
      updatedRecord = {
        ...existing,
        status: status as RequestStatus,
        updated_at: new Date().toISOString(),
      };
      localRequestsStore.set(id, updatedRecord);
    }

    if (!updatedRecord) {
      return NextResponse.json(
        { success: false, message: 'Support request not found to update' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      request: updatedRecord,
    });
  } catch (error) {
    console.error('PATCH /api/requests/[id] error:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating support request' },
      { status: 500 }
    );
  }
}
