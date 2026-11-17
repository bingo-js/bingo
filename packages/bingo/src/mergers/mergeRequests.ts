import { CreatedFetchRequest, CreatedOctokitRequest, CreatedRequest } from 'bingo-requests';

import { groupBy } from '../utils/groupBy.ts';
import { mergeFetchRequests } from './mergeFetchRequests.ts';
import { mergeOctokitRequests } from './mergeOctokitRequests.ts';

export function mergeRequests(firsts: CreatedRequest[], seconds: CreatedRequest[]) {
  const byType = groupBy(firsts, (request) => request.type);

  for (const added of seconds) {
    switch (added.type) {
      case 'fetch':
        byType.fetch = mergeFetchRequests(byType.fetch as CreatedFetchRequest[], added);
        break;

      case 'octokit':
        byType.octokit = mergeOctokitRequests(byType.octokit as CreatedOctokitRequest[], added);
        break;
    }
  }

  return Object.values(byType).flat();
}
