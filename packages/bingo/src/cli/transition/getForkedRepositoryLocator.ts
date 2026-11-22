import hostedGitInfo from 'hosted-git-info';
import { readPackage } from 'read-pkg';

import type { RepositoryLocator } from '../../types/templates.ts';

export const getForkedRepositoryLocator = async (
  directory: string,
  repository: RepositoryLocator,
): Promise<string | undefined> => {
  const packageData = await readPackage({ cwd: directory });
  if (!packageData.repository?.url) {
    return undefined;
  }

  const gitInfo = hostedGitInfo.fromUrl(packageData.repository.url);

  if (gitInfo?.user !== repository.owner || gitInfo.project !== repository.repository) {
    return undefined;
  }

  return `${repository.owner}/${repository.repository}`;
};
