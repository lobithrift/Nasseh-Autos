import { NextResponse } from 'next/server';
import { supabase, localRequestsStore } from '@/lib/supabase';
import { validateSupportInput } from '@/lib/validations';
import { analyzeSupportRequest } from '@/lib/ai';
import { SupportRequest } from '@/types/support';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, complaint } = body || {};

    // Step 1 & 2: Validate input
    const validation = validateSupportInput({ name, email, subject, complaint });
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors, message: 'Invalid support request inputs' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedComplaint = complaint.trim();

    // Step 3: Insert initial support request with status 'Pending'
    const { data: initialRequest, error: insertError } = await supabase
      .from('support_requests')
      .insert({
        customer_name: trimmedName,
        customer_email: trimmedEmail,
        subject: trimmedSubject,
        complaint: trimmedComplaint,
        status: 'Pending',
      })
      .select()
      .single();

    if (insertError) {
      console.warn('Supabase insert notice (using smart local fallback):', insertError.message || insertError);

      // Generate clean readable testing ID
      const timestamp = Date.now().toString().slice(-6);
      const mockId = `SWII-REQ-${timestamp}`;
      const aiResult = await analyzeSupportRequest(trimmedSubject, trimmedComplaint);
      
      const fallbackRequest: SupportRequest = {
        id: mockId,
        customer_name: trimmedName,
        customer_email: trimmedEmail,
        subject: trimmedSubject,
        complaint: trimmedComplaint,
        category: aiResult.category,
        urgency: aiResult.urgency,
        summary: aiResult.summary,
        ai_response: aiResult.response,
        status: 'AI Responded',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Store in server memory
      localRequestsStore.set(mockId, fallbackRequest);

      return NextResponse.json({
        success: true,
        request: fallbackRequest,
        note: 'Saved with local testing ID as database setup is pending.',
      });
    }

    const requestId = initialRequest.id;

    // Step 4 & 5: Run AI Analysis
    try {
      const aiAnalysis = await analyzeSupportRequest(trimmedSubject, trimmedComplaint);

      // Step 6 & 7: Update request record with AI analysis and status 'AI Responded'
      const { data: updatedRequest, error: updateError } = await supabase
        .from('support_requests')
        .update({
          category: aiAnalysis.category,
          urgency: aiAnalysis.urgency,
          summary: aiAnalysis.summary,
          ai_response: aiAnalysis.response,
          status: 'AI Responded',
          updated_at: new Date().toISOString(),
        })
        .eq('id', requestId)
        .select()
        .single();

      if (updateError) {
        console.warn('Supabase update error after AI analysis:', updateError);
        const mergedObj: SupportRequest = {
          ...initialRequest,
          category: aiAnalysis.category,
          urgency: aiAnalysis.urgency,
          summary: aiAnalysis.summary,
          ai_response: aiAnalysis.response,
          status: 'AI Responded',
        };
        localRequestsStore.set(requestId, mergedObj);

        return NextResponse.json({
          success: true,
          request: mergedObj,
        });
      }

      return NextResponse.json({
        success: true,
        request: updatedRequest,
      });
    } catch (aiErr) {
      console.error('AI processing error:', aiErr);
      localRequestsStore.set(requestId, initialRequest);

      return NextResponse.json({
        success: true,
        request: initialRequest,
        warning: 'Your request was successfully submitted, but we could not generate an automatic response at this time. Please check back later.',
      });
    }
  } catch (error) {
    console.error('API /api/support unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
