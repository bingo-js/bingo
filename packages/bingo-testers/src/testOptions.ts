import { allPropertiesLazy, type AwaitedLazyProperties } from 'all-properties-lazy';
import type {
  AnyShape,
  HasOptionsAndMaybePrepare,
  InferredObject,
  LazyOptionalOptions,
  OptionsContext,
} from 'bingo';

import { createFailingFunction } from './utils.ts';

export type TestOptions<OptionsShape extends AnyShape> = Promise<
  | Partial<InferredObject<OptionsShape>>
  | AwaitedLazyProperties<LazyOptionalOptions<Partial<InferredObject<OptionsShape>>>>
  | undefined
>;

export const testOptions = async <OptionsShape extends AnyShape>(
  base: HasOptionsAndMaybePrepare<OptionsShape>,
  context: Partial<OptionsContext<InferredObject<OptionsShape>>> = {},
): TestOptions<OptionsShape> => {
  if (!base.prepare) {
    return context.options;
  }

  return await allPropertiesLazy({
    ...base.prepare({
      ...context,
      log: context.log ?? createFailingFunction('log', 'prepare()'),
      options: context.options ?? {},
      take: context.take ?? createFailingFunction('take', 'prepare()'),
    }),
    ...context.options,
  });
};
