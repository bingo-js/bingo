import { createSystemFetchers } from './createSystemFetchers.ts';
import { SystemFetchers } from './types.ts';

export function createSystemFetchersOffline(): SystemFetchers {
  return createSystemFetchers({
    fetch: () =>
      Promise.reject(new Error('Offline specified. This request should be caught by its Input.')),
  });
}
