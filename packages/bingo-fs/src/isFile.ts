import type { CreatedEntry } from './types.ts';

export function isFile(entry: CreatedEntry | undefined): entry is CreatedEntry {
  return typeof entry === 'string' || Array.isArray(entry);
}
