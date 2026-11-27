import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';
import { z } from 'zod';

import { createSystemContextWithAuth } from '../../contexts/createSystemContextWithAuth.ts';
import { prepareOptions } from '../../preparation/prepareOptions.ts';
import { runTemplate } from '../../runners/runTemplate.ts';
import type { AnyShape } from '../../types/shapes.ts';
import type { RequestedSkips } from '../../types/skips.ts';
import type { Template } from '../../types/templates.ts';
import type { ClackDisplay } from '../display/createClackDisplay.ts';
import { runSpinnerTask } from '../display/runSpinnerTask.ts';
import { logRerunSuggestion } from '../loggers/logRerunSuggestion.ts';
import { logStartText } from '../loggers/logStartText.ts';
import { cliMessages } from '../messages.ts';
import { parseZodArgs } from '../parsers/parseZodArgs.ts';
import { promptForDirectory } from '../prompts/promptForDirectory.ts';
import { promptForOptionSchemas } from '../prompts/promptForOptionSchemas.ts';
import type { RemoteRepositoryVisibility } from '../remotes/types.ts';
import { prepareGitRepository } from '../repository/prepareGitRepository.ts';
import { resolveLocalRepository } from '../repository/resolveLocalRepository.ts';
import { cliStatuses } from '../status.ts';
import type { ModeResults } from '../types.ts';
import { makeRelative } from '../utils.ts';

export interface RunModeSetupSettings<
  OptionsShape extends AnyShape = AnyShape,
  Refinements = unknown,
> {
  argv: string[];
  directory?: string;
  display: ClackDisplay;
  from: string;
  offline?: boolean;
  remote?: boolean;
  repoVisibility?: RemoteRepositoryVisibility;
  repository?: string;
  rerunCommand: string;
  skips?: RequestedSkips;
  template: Template<OptionsShape, Refinements>;
}

export async function runModeSetup<
  OptionsShape extends AnyShape = AnyShape,
  Refinements = unknown,
>({
  argv,
  repository: requestedRepository,
  directory: requestedDirectory = requestedRepository,
  display,
  from,
  offline = false,
  remote: requestedRemote,
  repoVisibility = 'public',
  rerunCommand,
  skips = {},
  template,
}: RunModeSetupSettings<OptionsShape, Refinements>): Promise<ModeResults> {
  logStartText('setup', offline);

  const directory = await promptForDirectory({
    requestedDirectory,
    requestedRepository,
    template,
  });
  if (directory === undefined) {
    return { status: cliStatuses.cancelled };
  }

  const system = await createSystemContextWithAuth({
    directory,
    display,
    offline,
  });

  const providedTemplateOptions = parseZodArgs(argv, template.options);
  const providedOptions = {
    ...parseZodArgs(argv, {
      directory: z.string().optional(),
      owner: z.string().optional(),
      repository: z.string().optional(),
    }),
    ...providedTemplateOptions,
  };

  const rerunOptions = {
    ...providedOptions,
    ...(requestedRemote ? { remote: true } : {}),
    ...(repoVisibility === 'private'
      ? { 'repo-visibility': repoVisibility }
      : {}),
  };

  const preparedOptions = await runSpinnerTask(
    display,
    'Inferring default options from system',
    'Inferred default options from system',
    async () => {
      return await prepareOptions(template, {
        ...system,
        existing: { ...providedTemplateOptions, directory },
        offline,
      });
    },
  );
  if (preparedOptions instanceof Error) {
    logRerunSuggestion(rerunCommand, rerunOptions);
    return { status: cliStatuses.error };
  }

  const repository = requestedRepository ?? directory;
  const baseOptions = await promptForOptionSchemas(template, {
    existing: {
      directory,
      repository,
      ...providedOptions,
      ...preparedOptions,
    },
    system,
  });
  if (baseOptions.cancelled) {
    logRerunSuggestion(rerunCommand, baseOptions.prompted);
    return { status: cliStatuses.cancelled };
  }

  const { message, remote, repositoryType } = await resolveLocalRepository(
    display,
    { repository, ...baseOptions.completed },
    { offline, remote: requestedRemote, repoVisibility },
    system,
    template,
  );

  if (remote instanceof Error) {
    logRerunSuggestion(rerunCommand, baseOptions.prompted);
    return { error: remote, status: cliStatuses.error };
  }

  if (message) {
    prompts.log[message.level](message.text);
  }

  const descriptor = template.about?.name ?? from;

  const creation = await runSpinnerTask(
    display,
    `Running the ${descriptor} template`,
    `Ran the ${descriptor} template`,
    async () =>
      await runTemplate(template, {
        ...system,
        directory,
        mode: 'setup',
        offline,
        options: baseOptions.completed,
        skips: {
          ...skips,
          requests: skips.requests ?? !remote,
        },
      }),
  );
  if (creation instanceof Error) {
    logRerunSuggestion(rerunCommand, baseOptions.prompted);
    return {
      outro: cliMessages.leaving,
      status: cliStatuses.error,
    };
  }

  const preparationError =
    repositoryType !== 'subdirectory' &&
    (await runSpinnerTask(
      display,
      'Preparing local Git repository',
      'Prepared local Git repository',
      async () => {
        await prepareGitRepository(remote, system.runner);
      },
    ));

  if (!remote && repositoryType !== 'subdirectory') {
    prompts.log.info(
      [
        `Run ${styleText('blue', `${rerunCommand} --remote`)} in ${styleText('green', makeRelative(directory))}`,
        `to create and sync a remote repository on GitHub.`,
      ].join('\n'),
    );
  }

  logRerunSuggestion(rerunCommand, baseOptions.prompted);

  if (preparationError) {
    return {
      outro: cliMessages.leaving,
      status: cliStatuses.error,
    };
  }

  return {
    outro: `Thanks for using ${styleText(['bgGreenBright', 'black'], from)}! 💝`,
    status: cliStatuses.success,
    suggestions: creation.suggestions,
  };
}
