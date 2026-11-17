import * as prompts from '@clack/prompts';
import { intakeDirectory } from 'bingo-fs';

import { createSystemContextWithAuth } from '../../contexts/createSystemContextWithAuth.ts';
import { prepareOptions } from '../../preparation/prepareOptions.ts';
import { runTemplate } from '../../runners/runTemplate.ts';
import { AnyShape } from '../../types/shapes.ts';
import { RequestedSkips } from '../../types/skips.ts';
import { Template } from '../../types/templates.ts';
import { ClackDisplay } from '../display/createClackDisplay.ts';
import { runSpinnerTask } from '../display/runSpinnerTask.ts';
import { logRerunSuggestion } from '../loggers/logRerunSuggestion.ts';
import { logStartText } from '../loggers/logStartText.ts';
import { CLIMessage } from '../messages.ts';
import { parseZodArgs } from '../parsers/parseZodArgs.ts';
import { promptForOptionSchemas } from '../prompts/promptForOptionSchemas.ts';
import { checkUncommittedChanges } from '../repository/checkUncommittedChanges.ts';
import { clearLocalGitTags } from '../repository/clearLocalGitTags.ts';
import { createInitialCommit } from '../repository/createInitialCommit.ts';
import { resolveLocalRepository } from '../repository/resolveLocalRepository.ts';
import { CLIStatus } from '../status.ts';
import { ModeResults } from '../types.ts';
import { clearTemplateFiles } from './clearTemplateFiles.ts';
import { getForkedRepositoryLocator } from './getForkedRepositoryLocator.ts';
import { readConfigSettings } from './readConfigSettings.ts';

export interface RunModeTransitionSettings<
  OptionsShape extends AnyShape = AnyShape,
  Refinements = unknown,
> {
  argv: string[];
  configFile: string | undefined;
  directory?: string;
  display: ClackDisplay;
  from: string;
  offline?: boolean;
  remote?: boolean;
  rerunCommand: string;
  skips?: RequestedSkips;
  template: Template<OptionsShape, Refinements>;
}

export async function runModeTransition<
  OptionsShape extends AnyShape = AnyShape,
  Refinements = unknown,
>({
  argv,
  configFile,
  directory = '.',
  display,
  from,
  offline = false,
  remote: requestedRemote,
  rerunCommand,
  skips = {},
  template,
}: RunModeTransitionSettings<OptionsShape, Refinements>): Promise<ModeResults> {
  logStartText('transition', offline);

  const system = await createSystemContextWithAuth({
    directory,
    display,
    offline,
  });

  const repositoryLocator =
    template.about?.repository &&
    (await getForkedRepositoryLocator(directory, template.about.repository));

  const providedOptions = parseZodArgs(argv, template.options);

  const loadedConfig = await readConfigSettings(configFile, directory, template);
  if (loadedConfig instanceof Error) {
    logRerunSuggestion(rerunCommand, providedOptions);
    return { error: loadedConfig, status: CLIStatus.Error };
  }

  // Templates infer options from files on disk, so clearing must happen before
  // prepareOptions. It can't be undone, so it's refused on uncommitted changes.
  if (repositoryLocator) {
    const uncommittedChanges = await checkUncommittedChanges(system.runner);
    if (uncommittedChanges !== 'clean') {
      logRerunSuggestion(rerunCommand, providedOptions);
      return {
        error: new Error(
          uncommittedChanges === 'changes'
            ? `Transitioning a repository cloned from ${repositoryLocator} clears all of its files, but this one has uncommitted changes. Commit or stash them, then re-run.`
            : `Transitioning a repository cloned from ${repositoryLocator} clears all of its files, but it couldn't be determined whether this one has uncommitted changes. Make sure git is installed and this is a git repository, then re-run.`,
        ),
        status: CLIStatus.Error,
      };
    }

    await runSpinnerTask(
      display,
      `Clearing from ${repositoryLocator}`,
      `Cleared from ${repositoryLocator}`,
      async () => {
        await clearTemplateFiles(directory);
        await clearLocalGitTags(system.runner);
      },
    );
  }

  const preparedOptions =
    Object.keys(template.options).length &&
    (await runSpinnerTask(
      display,
      'Inferring options from existing repository',
      'Inferred options from existing repository',
      async () => {
        return await prepareOptions(template, {
          ...system,
          existing: {
            ...loadedConfig?.options,
            ...providedOptions,
            directory,
          },
          offline,
        });
      },
    ));
  if (preparedOptions instanceof Error) {
    logRerunSuggestion(rerunCommand, providedOptions);
    return { status: CLIStatus.Error };
  }

  const baseOptions = await promptForOptionSchemas(template, {
    existing: { ...providedOptions, ...preparedOptions },
    system,
  });
  if (baseOptions.cancelled) {
    logRerunSuggestion(rerunCommand, baseOptions.prompted);
    return { status: CLIStatus.Cancelled };
  }

  const { message, remote } = await resolveLocalRepository(
    display,
    { repository: directory, ...baseOptions.completed },
    { offline, remote: requestedRemote },
    system,
    template,
  );

  if (remote instanceof Error) {
    logRerunSuggestion(rerunCommand, baseOptions.prompted);
    return { error: remote, status: CLIStatus.Error };
  }

  if (message) {
    prompts.log[message.level](message.text);
  }

  const files = await intakeDirectory(directory, {
    exclude: /node_modules|^\.git$/,
  });

  const creation = await runSpinnerTask(
    display,
    `Running ${from}`,
    `Ran ${from}`,
    async () =>
      await runTemplate(template, {
        ...system,
        directory,
        files,
        mode: 'transition',
        offline,
        options: baseOptions.completed,
        refinements: loadedConfig?.refinements,
        skips: {
          ...skips,
          requests: skips.requests ?? !remote,
        },
      }),
  );
  if (creation instanceof Error) {
    logRerunSuggestion(rerunCommand, baseOptions.prompted);
    return {
      outro: CLIMessage.Leaving,
      status: CLIStatus.Error,
    };
  }

  const commit =
    repositoryLocator || requestedRemote
      ? await runSpinnerTask(
          display,
          'Creating initial commit',
          'Created initial commit',
          async () => {
            await createInitialCommit(system.runner, {
              amend: true,
              push: !offline,
            });
          },
        )
      : undefined;

  logRerunSuggestion(rerunCommand, baseOptions.prompted);

  return commit instanceof Error
    ? {
        outro: CLIMessage.Leaving,
        status: CLIStatus.Error,
      }
    : {
        outro: repositoryLocator ? CLIMessage.New : CLIMessage.Done,
        status: CLIStatus.Success,
        suggestions: creation.suggestions,
      };
}
