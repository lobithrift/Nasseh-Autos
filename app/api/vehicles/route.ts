import { NextResponse } from 'next/server';
import { getStoredVehicles } from '@/lib/manassehStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const vehicles = getStoredVehicles();
  return NextResponse.json({ success: true, vehicles });
}
