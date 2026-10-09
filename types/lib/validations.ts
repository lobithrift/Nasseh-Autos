import { SupportFormInput } from '@/types/support';

export interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  complaint?: string;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateSupportInput(input: SupportFormInput): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!input.name || !input.name.trim()) {
    errors.name = 'Full name is required';
  }

  if (!input.email || !input.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(input.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!input.subject || !input.subject.trim()) {
    errors.subject = 'Subject is required';
  }

  if (!input.complaint || !input.complaint.trim()) {
    errors.complaint = 'Detailed complaint or support request is required';
  } else if (input.complaint.trim().length < 10) {
    errors.complaint = 'Please provide more details (at least 10 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
