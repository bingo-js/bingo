import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';

import type { AnyShape } from '../../types/shapes.ts';
import type { Template } from '../../types/templates.ts';
import { cliMessages } from '../messages.ts';
import { cliStatuses } from '../status.ts';
import type { ModeResults } from '../types.ts';
import { logHelpOptions } from './logHelpOptions.ts';
import { logSchemasHelpOptions } from './logSchemasHelpOptions.ts';

export function logHelpText<OptionsShape extends AnyShape, Refinements>(
  mode: string,
  from: string,
  template: Template<OptionsShape, Refinements>,
): ModeResults {
  const packageName = template.about?.name ?? from;

  prompts.log.info(
    [
      'Running ',
      styleText('green', `--help`),
      ' for ',
      styleText('green', `--mode ${mode}`),
      '.',
    ].join(''),
  );

  logHelpOptions('Bingo template', from, [
    {
      examples: ['--directory my-fancy-project'],
      flag: '--directory',
      text: 'What local directory path to run under',
      type: 'string',
    },
    {
      examples: ['--help'],
      flag: '--help',
      text: 'Prints help text.',
      type: 'boolean',
    },
    {
      examples: ['--mode setup', '--mode transition'],
      flag: '--mode',
      text: 'Which mode to run in.',
      type: '"setup" | "transition"',
    },
    {
      examples: ['--offline'],
      flag: '--offline',
      text: 'Whether to run in an "offline" mode that skips network requests.',
      type: 'boolean',
    },
    {
      examples: ['--owner my-org'],
      flag: '--owner',
      text: 'What GitHub organization or user the repository will be under.',
      type: 'string',
    },
    {
      examples: ['--remote'],
      flag: '--remote',
      text: 'Whether to create a remote repository on GitHub if one does not already exist.',
      type: 'boolean',
    },
    {
      examples: ['--repo-visibility private'],
      flag: '--repo-visibility',
      text: 'Whether a newly created remote repository should be public or private. Requires --remote.',
      type: '"public" | "private"',
    },
    {
      examples: ['--repository my-fancy-project'],
      flag: '--repository',
      text: 'What the repository will be named.',
      type: 'string',
    },
    {
      examples: ['--skip-files'],
      flag: '--skip-files',
      text: 'Whether to skip creating files on disk.',
      type: 'boolean',
    },
    {
      examples: ['--skip-requests'],
      flag: '--skip-requests',
      text: 'Whether to skip sending network requests as specified by templates.',
      type: 'boolean',
    },
    {
      examples: ['--skip-scripts'],
      flag: '--skip-scripts',
      text: 'Whether to skip running local scripts as specified by templates.',
      type: 'boolean',
    },
    {
      examples: ['--version'],
      flag: '--version',
      text: 'Prints package versions.',
      type: 'boolean',
    },
  ]);

  logSchemasHelpOptions(packageName, template.options);

  return {
    outro: cliMessages.ok,
    status: cliStatuses.success,
  };
}
