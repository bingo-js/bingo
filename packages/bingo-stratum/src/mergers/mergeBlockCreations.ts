import { mergeCreations } from 'bingo';
import { withoutUndefinedProperties } from 'without-undefined-properties';

import { BlockCreation } from '../types/creations.ts';
import { mergeExtensions } from './mergeProps.ts';

export function mergeBlockCreations<Options extends object>(
  first: Partial<BlockCreation<Options>>,
  second: Partial<BlockCreation<Options>>,
) {
  return withoutUndefinedProperties({
    ...mergeCreations(first, second),
    extensions: applyMerger(first.extensions, second.extensions, mergeExtensions),
  });
}

function applyMerger<T>(
  first: T | undefined,
  second: T | undefined,
  merger: (first: T, second: T) => T,
) {
  if (first == null || second == null) {
    return second ?? first ?? undefined;
  }

  return merger(first, second);
}
