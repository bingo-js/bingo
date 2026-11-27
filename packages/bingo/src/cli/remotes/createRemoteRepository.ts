import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';
import type { BingoSystem } from 'bingo-systems';
import { newGitHubRepository, type RepositoryLocator } from 'new-github-repository';

import type { AnyShape } from '../../types/shapes.ts';
import type { Template } from '../../types/templates.ts';
import type { ClackDisplay } from '../display/createClackDisplay.ts';
import { runSpinnerTask } from '../display/runSpinnerTask.ts';
import { prepareGitRepository } from '../repository/prepareGitRepository.ts';
import type { RemoteRepositoryVisibility } from './types.ts';

export async function createRemoteRepository<
  OptionsShape extends AnyShape = AnyShape,
  Refinements = unknown,
>(
  display: ClackDisplay,
  locator: RepositoryLocator,
  system: BingoSystem,
  template: Template<OptionsShape, Refinements>,
  repoVisibility: RemoteRepositoryVisibility = 'public',
): Promise<Error | undefined> {
  const remoteDescriptor = `${locator.owner}/${locator.repository}`;
  const creationResult = await runSpinnerTask(
    display,
    `Creating repository on GitHub: ${styleText('green', remoteDescriptor)}`,
    `Created repository on GitHub`,
    async (): Promise<undefined> => {
      await newGitHubRepository({
        octokit: system.fetchers.octokit,
        owner: locator.owner,
        repository: locator.repository,
        private: repoVisibility === 'private',
        template: template.about?.repository,
      });
      await prepareGitRepository(locator, system.runner);
    },
  );

  if (creationResult instanceof Error) {
    return creationResult;
  }

  prompts.log.step(
    [
      "You've got a new repository ready to use in:",
      `  ${styleText('green', `https://github.com/${remoteDescriptor}`)}`,
    ].join('\n'),
  );
}
