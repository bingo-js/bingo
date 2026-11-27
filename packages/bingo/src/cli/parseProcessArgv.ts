import { parseArgs } from 'node:util';

import { cliArgsOptions } from './cliArgsOptions.ts';

export interface RunCliRawValues {
  directory?: boolean | string | undefined;
  help?: boolean | string | undefined;
  mode?: boolean | string | undefined;
  offline?: boolean | string | undefined;
  owner?: boolean | string | undefined;
  remote?: boolean | string | undefined;
  'repo-visibility'?: boolean | string | undefined;
  repository?: boolean | string | undefined;
  'skip-files'?: boolean | string | undefined;
  'skip-requests'?: boolean | string | undefined;
  'skip-scripts'?: boolean | string | undefined;
  version?: boolean | string | undefined;
}

export interface ParsedArgs {
  argv: string[];
  positionals: string[];
  values: RunCliRawValues;
}

export const parseProcessArgv = (): ParsedArgs => {
  return {
    argv: process.argv,
    ...parseArgs({
      args: process.argv.slice(2),
      options: cliArgsOptions,
      strict: false,
    }),
  };
};
