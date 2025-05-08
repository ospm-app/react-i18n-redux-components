export const normalizeNameForRoute = (name: string): string => {
  const cleanedName = name.replace(/[^\w-]/g, '');

  return encodeURIComponent(cleanedName);
};
