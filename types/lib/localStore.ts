import { SupportRequest, RequestStatus } from '@/types/support';

const LOCAL_STORAGE_KEY = 'swii_support_requests_v1';

export function getClientLocalRequests(): SupportRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SupportRequest[];
  } catch {
    return [];
  }
}

export function saveClientLocalRequest(request: SupportRequest): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getClientLocalRequests();
    const updated = [request, ...existing.filter((r) => r.id !== request.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save request to localStorage:', err);
  }
}

export function getClientLocalRequestById(id: string): SupportRequest | null {
  if (typeof window === 'undefined') return null;
  const existing = getClientLocalRequests();
  return existing.find((r) => r.id === id) || null;
}

export function updateClientLocalRequestStatus(id: string, newStatus: RequestStatus): SupportRequest | null {
  if (typeof window === 'undefined') return null;
  try {
    const existing = getClientLocalRequests();
    let updatedItem: SupportRequest | null = null;

    const updated = existing.map((r) => {
      if (r.id === id) {
        updatedItem = { ...r, status: newStatus, updated_at: new Date().toISOString() };
        return updatedItem;
      }
      return r;
    });

    if (updatedItem) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return updatedItem;
  } catch (err) {
    console.error('Failed to update localStorage status:', err);
    return null;
  }
}
