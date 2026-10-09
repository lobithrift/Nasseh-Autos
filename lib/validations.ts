export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSupportInput(input: any) {
  return { isValid: true, errors: {} };
}
