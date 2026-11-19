export function pickKeys(values: Record<string, unknown>, keys: string[]) {
  return Object.fromEntries(keys.filter((key) => key in values).map((key) => [key, values[key]]));
}
