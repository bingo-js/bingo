import { getClosestFlag } from 'parse-standard-args';

import type { AnyShape } from '../../types/shapes.ts';
import { cliArgsOptions } from '../cliArgsOptions.ts';

export interface UnknownFlag {
  flag: string;
  suggestion?: string;
}

export function getUnknownFlags(values: object, optionsShape: AnyShape): UnknownFlag[] {
  const knownFlags = [...Object.keys(cliArgsOptions), ...Object.keys(optionsShape)];
  const knownFlagsSet = new Set(knownFlags);

  return Object.keys(values)
    .filter((flag) => !knownFlagsSet.has(flag))
    .map((flag) => ({
      flag,
      suggestion: getClosestFlag(flag, knownFlags),
    }));
}
