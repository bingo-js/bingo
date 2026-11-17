import { withoutUndefinedProperties } from 'without-undefined-properties';

import { Creation } from '../types/creations.ts';
import { applyMerger } from './applyMerger.ts';
import { mergeCreatedDirectories } from './mergeCreatedDirectories.ts';
import { mergeRequests } from './mergeRequests.ts';
import { mergeScripts } from './mergeScripts.ts';
import { mergeSuggestions } from './mergeSuggestions.ts';

export function mergeCreations<First extends Partial<Creation>, Second extends Partial<Creation>>(
  first: First,
  second: Second,
): First & Second {
  return withoutUndefinedProperties({
    files: applyMerger(first.files, second.files, mergeCreatedDirectories),
    requests: applyMerger(first.requests, second.requests, mergeRequests),
    scripts: applyMerger(first.scripts, second.scripts, mergeScripts),
    suggestions: applyMerger(first.suggestions, second.suggestions, mergeSuggestions),
  }) as First & Second;
}
