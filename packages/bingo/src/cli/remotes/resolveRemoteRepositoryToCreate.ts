import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';
import type { BingoSystem, SystemRunner } from 'bingo-systems';
import type { Octokit } from 'octokit';
import { describeOptions } from 'parse-standard-args';
import { promptForFlag } from 'parse-standard-args/prompts';

import type { AnyShape } from '../../types/shapes.ts';
import type { RepositoryLocator, Template } from '../../types/templates.ts';
import { hasAccessToOwner } from './hasAccessToOwner.ts';
import type { PartialRepositoryLocator } from './types.ts';

export async function resolveRemoteRepositoryToCreate<
  OptionsShape extends AnyShape = AnyShape,
  Refinements = unknown,
>(
  locator: PartialRepositoryLocator,
  system: BingoSystem,
  template: Template<OptionsShape, Refinements>,
): Promise<Error | RepositoryLocator> {
  if (locator.owner) {
    return (await ownerIsAccessible(system.fetchers.octokit, locator.owner))
      ? { owner: locator.owner, repository: locator.repository }
      : new Error(
          `--remote requested, but the authenticated GitHub user does not have access to the ${locator.owner} owner.`,
        );
  }

  const username = await getUsername(system.runner);
  if (username) {
    return { owner: username, repository: locator.repository };
  }

  if (!('owner' in template.options)) {
    return new Error(
      "--remote requested, but could not infer an owner because this template lacks an 'owner' option.",
    );
  }

  const [ownerFlag] = describeOptions({ owner: template.options.owner });

  if (ownerFlag.kind === 'json' || ownerFlag.multiple) {
    return new Error(
      "--remote requested, but could not infer an owner because this template's owner option is not a string-like.",
    );
  }

  while (true) {
    const prompted = await promptForFlag(
      ownerFlag,
      'What will the organization or username owning the repository be? (--owner)',
    );

    if (typeof prompted !== 'string') {
      return new Error('--remote requested, but no owner was provided.');
    }

    if (await ownerIsAccessible(system.fetchers.octokit, prompted)) {
      return { owner: prompted, repository: locator.repository };
    }

    prompts.log.warn(
      `The authenticated GitHub user does not have access to the ${styleText('green', prompted)} owner.`,
    );
  }
}

async function getUsername(runner: SystemRunner) {
  const value = await runner('gh config get user -h github.com');
  return value instanceof Error ? undefined : value.stdout?.toString();
}

async function ownerIsAccessible(octokit: Octokit | undefined, owner: string) {
  return !octokit || (await hasAccessToOwner(octokit, owner));
}
