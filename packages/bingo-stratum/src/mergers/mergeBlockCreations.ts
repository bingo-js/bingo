import { mergeCreations } from 'bingo';
import { withoutUndefinedProperties } from 'without-undefined-properties';

import type { BlockCreation } from '../types/creations.ts';
import { mergeExtensions } from './mergeProps.ts';

export const mergeBlockCreations = <Options extends object>(
  first: Partial<BlockCreation<Options>>,
  second: Partial<BlockCreation<Options>>,
): Partial<BlockCreation<Options>> => {
  return withoutUndefinedProperties({
    ...mergeCreations(first, second),
    extensions: applyMerger(first.extensions, second.extensions, mergeExtensions),
  });
};

const applyMerger = <T>(
  first: T | undefined,
  second: T | undefined,
  merger: (first: T, second: T) => T,
) => {
  if (first == null || second == null) {
    return second ?? first ?? undefined;
  }

  return merger(first, second);
};
