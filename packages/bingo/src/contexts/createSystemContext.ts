import {
  type BingoSystem,
  createSystemFetchers,
  createSystemFetchersOffline,
  createSystemRunner,
  createWritingFileSystem,
} from 'bingo-systems';

import type { InputWithArgs, TakeInput } from '../types/inputs.ts';
import type { AnyShape, InferredObject } from '../types/shapes.ts';
import type { SystemContext } from '../types/system.ts';
import { createDisplay, type Display } from './createDisplay.ts';

export interface SystemContextSettings extends Partial<BingoSystem> {
  auth?: string;
  directory: string;
  display?: Display;
  offline?: boolean;
}

export const createSystemContext = (settings: SystemContextSettings): SystemContext => {
  const system: BingoSystem = {
    fetchers:
      settings.fetchers ??
      (settings.offline ? createSystemFetchersOffline() : createSystemFetchers(settings)),
    fs: settings.fs ?? createWritingFileSystem(),
    runner: settings.runner ?? createSystemRunner(settings.directory),
  };

  const take = ((input: InputWithArgs<unknown, AnyShape>, args: InferredObject<AnyShape>) =>
    input({ args, offline: settings.offline, take, ...system })) as TakeInput;

  return {
    ...system,
    directory: settings.directory,
    display: settings.display ?? createDisplay(),
    take,
  };
};
