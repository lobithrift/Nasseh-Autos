export type RequestStatus = 'Pending' | 'AI Responded' | 'Resolved';

export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type RequestCategory = 
  | 'Technical Issue'
  | 'Account Issue'
  | 'Billing'
  | 'Payment'
  | 'Product or Service Inquiry'
  | 'Complaint'
  | 'General Inquiry'
  | 'Feedback'
  | 'Other';

export interface SupportRequest {
  id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  complaint: string;
  category: string | null;
  urgency: UrgencyLevel | null;
  summary: string | null;
  ai_response: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface SupportFormInput {
  name: string;
  email: string;
  subject: string;
  complaint: string;
}

export interface AIAnalysisResult {
  response: string;
  category: string;
  urgency: UrgencyLevel;
  summary: string;
}

export interface DashboardStats {
  total: number;
  pending: number;
  aiResponded: number;
  resolved: number;
}
