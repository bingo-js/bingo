import { parseRawArgs } from 'parse-standard-args';

import { cliFlags } from './cliFlags.ts';

/**
 * Parses only the CLI's own flags and positionals from the process args,
 * before a template is known. Other flags are left for runCLI to check.
 */
export function parseProcessArgv() {
  const args = process.argv.slice(2);

  return {
    args,
    ...parseRawArgs({
      args,
      flags: cliFlags,
      positionals: { kinds: [], rest: 'string' },
      strict: false,
    }),
  };
}
