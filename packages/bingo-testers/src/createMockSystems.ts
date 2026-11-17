import { AnyShape, InferredObject, InputWithArgs, TakeInput } from 'bingo';
import { BingoSystem } from 'bingo-systems';

import { createMockFetchers } from './createMockFetchers.ts';
import { createMockFileSystem } from './createMockFileSystem.ts';
import { MockSystemOptions } from './types.ts';
import { createFailingFunction } from './utils.ts';

export interface MockSystems {
  system: BingoSystem;
  take: TakeInput;
}

export function createMockSystems(settings: MockSystemOptions = {}): MockSystems {
  const fetchers = settings.fetchers ?? createMockFetchers(fetch);
  const fs = createMockFileSystem(settings.fs);
  const runner = settings.runner ?? createFailingFunction('runner', 'an input');

  const system = { fetchers, fs, runner };

  const take =
    settings.take ??
    (((input: InputWithArgs<unknown, AnyShape>, args: InferredObject<AnyShape>) =>
      input({ args, take, ...system })) as TakeInput);

  return { system, take };
}
