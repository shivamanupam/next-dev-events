export function normalizeStringArray(input: string[]): string[] {
  if (!input.length) return [];

  try {
    const parsed = JSON.parse(input[0]);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
