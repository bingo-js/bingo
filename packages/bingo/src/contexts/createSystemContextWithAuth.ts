import { getGitHubAuthToken } from 'get-github-auth-token';

import type { SystemContext } from '../types/system.ts';
import { createSystemContext, type SystemContextSettings } from './createSystemContext.ts';

export const createSystemContextWithAuth = async (
  settings: Pick<SystemContextSettings, 'auth' | 'directory' | 'display' | 'fetchers' | 'offline'>,
): Promise<SystemContext> => {
  const authToken =
    settings.fetchers?.octokit || settings.auth || settings.offline
      ? undefined
      : await getGitHubAuthToken();
  const auth = authToken?.succeeded ? authToken.token : settings.auth;

  return createSystemContext({ ...settings, auth });
};
