import { getGitHubAuthToken } from 'get-github-auth-token';

import { createSystemFetchers, type SystemFetchersSettings } from './createSystemFetchers.ts';
import type { SystemFetchers } from './types.ts';

export async function createSystemFetchersWithAuth(
  settings?: Omit<SystemFetchersSettings, 'auth'>,
): Promise<SystemFetchers> {
  const auth = await getGitHubAuthToken();

  return createSystemFetchers({
    ...settings,
    auth: auth.succeeded ? auth.token : undefined,
  });
}
