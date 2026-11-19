import type { FlagDescriptor } from 'parse-standard-args';

function booleanFlag(key: string): FlagDescriptor {
  return { key, kind: 'boolean', multiple: false, required: false };
}

function stringFlag(key: string): FlagDescriptor {
  return { key, kind: 'string', multiple: false, required: false };
}

export const cliFlags: FlagDescriptor[] = [
  stringFlag('directory'),
  booleanFlag('help'),
  { ...stringFlag('mode'), choices: ['setup', 'transition'] },
  booleanFlag('offline'),
  stringFlag('owner'),
  booleanFlag('remote'),
  stringFlag('repository'),
  booleanFlag('skip-files'),
  booleanFlag('skip-requests'),
  booleanFlag('skip-scripts'),
  booleanFlag('version'),
];
