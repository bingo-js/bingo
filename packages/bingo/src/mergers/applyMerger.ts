export const applyMerger = <T>(
  first: T | undefined,
  second: T | undefined,
  merger: (first: T, second: T) => T,
): T | undefined => {
  if (first == null || second == null) {
    return second ?? first ?? undefined;
  }

  return merger(first, second);
};
