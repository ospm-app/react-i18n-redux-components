export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}
