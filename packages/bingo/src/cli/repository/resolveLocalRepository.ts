import type { BingoSystem } from 'bingo-systems';
import type { RepositoryLocator } from 'new-github-repository';

import type { AnyShape } from '../../types/shapes.ts';
import type { Template } from '../../types/templates.ts';
import type { ClackDisplay } from '../display/createClackDisplay.ts';
import { getGitRepositoryType, type GitRepositoryType } from '../getGitRepositoryType.ts';
import { createRemoteRepository } from '../remotes/createRemoteRepository.ts';
import { resolveRemoteRepositoryFromOrigin } from '../remotes/resolveRemoteRepositoryFromOrigin.ts';
import { resolveRemoteRepositoryToCreate } from '../remotes/resolveRemoteRepositoryToCreate.ts';
import type { PartialRepositoryLocator, RemoteRepositoryVisibility } from '../remotes/types.ts';

export interface RemoteRepositoryRequest {
  offline?: boolean | undefined;
  remote?: boolean | undefined;
  repoVisibility?: RemoteRepositoryVisibility | undefined;
}

export interface ResolvedRemoteMessage {
  level: 'step' | 'warn';
  text: string;
}

export interface ResolvedRepository {
  message?: ResolvedRemoteMessage | undefined;
  remote: Error | RepositoryLocator | undefined;
  repositoryType: GitRepositoryType;
}

export async function resolveLocalRepository<
  OptionsShape extends AnyShape = AnyShape,
  Refinements = unknown,
>(
  display: ClackDisplay,
  locator: PartialRepositoryLocator,
  request: RemoteRepositoryRequest,
  system: BingoSystem,
  template: Template<OptionsShape, Refinements>,
): Promise<ResolvedRepository> {
  const repositoryType = await getGitRepositoryType(system.runner);

  if (request.offline) {
    return {
      remote: request.remote ? new Error('--offline cannot be combined with --remote.') : undefined,
      repositoryType,
    };
  }

  if (repositoryType === 'subdirectory') {
    return {
      remote: request.remote
        ? new Error(
            '--remote can only be used when in a non-Git directory or in the root of a Git directory.',
          )
        : undefined,
      repositoryType,
    };
  }

  const origin =
    repositoryType === 'root' && (await resolveRemoteRepositoryFromOrigin(system.runner));

  if (origin) {
    if (request.remote) {
      return {
        remote: new Error('--remote requested, but an origin remote already exists.'),
        repositoryType,
      };
    }

    return {
      message: {
        level: 'step',
        text: `Detected existing remote origin repository`,
      },
      remote: origin,
      repositoryType,
    };
  }

  if (!request.remote) {
    return { remote: undefined, repositoryType };
  }

  if (!system.fetchers.octokit) {
    return {
      remote: new Error(
        '--remote requested, but no existing repository or GitHub authentication found. Please log in with the GitHub CLI or set a GH_AUTH env variable.',
      ),
      repositoryType,
    };
  }

  const creationLocator = await resolveRemoteRepositoryToCreate(locator, system, template);
  if (creationLocator instanceof Error) {
    return { remote: creationLocator, repositoryType };
  }

  const creationError = await createRemoteRepository(
    display,
    creationLocator,
    system,
    template,
    request.repoVisibility ?? 'public',
  );

  return { remote: creationError ?? creationLocator, repositoryType };
}
