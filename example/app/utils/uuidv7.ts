export function uuidV7(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const timestamp = Date.now();

  const serializedTimestamp = timestamp.toString(16).padStart(12, '0');

  const baseUUID = window.crypto.randomUUID();

  return `${serializedTimestamp.slice(0, 8)}-${serializedTimestamp.slice(8, 12)}-7${baseUUID.slice(15)}`;
}
