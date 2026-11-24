import { type CreatedEntry, intake } from 'bingo-fs';

import { executeTemplatesRecursive } from './executeTemplatesRecursive.ts';
import { getSourceFromDirectory } from './getSourceFromDirectory.ts';

export const loadHandlebars = async (
  directoryPath: string,
  optionsDefaults?: object,
): Promise<(sourcePath: string, options?: object) => CreatedEntry | undefined> => {
  const sources = await intake(directoryPath);

  if (!sources) {
    throw new Error(
      `loadHandlebars() must be given a path to a directory. '${directoryPath}' does not exist.`,
    );
  }

  if (Array.isArray(sources)) {
    throw new Error(
      `loadHandlebars() must be given a path to a directory. '${directoryPath}' is a file.`,
    );
  }

  return (sourcePath: string, options?: object): CreatedEntry | undefined => {
    const source = getSourceFromDirectory(directoryPath, sources, sourcePath);

    return executeTemplatesRecursive(source, {
      ...optionsDefaults,
      ...options,
    });
  };
};
