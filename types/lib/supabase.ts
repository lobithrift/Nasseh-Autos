import { createClient } from '@supabase/supabase-js';
import { SupportRequest } from '@/types/support';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jyzgkidumospqgyqmdfb.supabase.co';
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// In-memory store fallback for development & preview testing when database is pending configuration
const globalForStore = globalThis as unknown as {
  localRequestsStore: Map<string, SupportRequest> | undefined;
};

export const localRequestsStore =
  globalForStore.localRequestsStore ?? new Map<string, SupportRequest>();

if (process.env.NODE_ENV !== 'production') {
  globalForStore.localRequestsStore = localRequestsStore;
}
