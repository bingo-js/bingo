import type { SystemFetchers } from 'bingo-systems';
import { Octokit } from 'octokit';

import type { Fetch } from './types.ts';
import { createFailingFunction } from './utils.ts';

export function createMockFetchers(
  fetch: Fetch = createFailingFunction('fetch', 'an input'),
): SystemFetchers {
  return {
    fetch,
    octokit: new Octokit({ request: { fetch } }),
  };
}
