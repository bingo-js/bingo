/**
 * Picks the entries of an object whose keys are in a list.
 * @param values Object to pick entries from.
 * @param keys Keys to pick, if present in the object.
 * @returns A new object with only the picked entries.
 */
export function pickKeys(values: Record<string, unknown>, keys: string[]) {
  return Object.fromEntries(keys.filter((key) => key in values).map((key) => [key, values[key]]));
}
