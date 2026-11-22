import type { AnyOptionalShape, InferredObject } from 'bingo';
import { z } from 'zod';

import type { Block } from '../types/blocks.ts';

export function applyZodDefaults<Shape extends AnyOptionalShape>(
  shape: Shape,
  value: InferredObject<Shape> | undefined,
  blockName?: string,
): InferredObject<Shape> {
  const result = z.strictObject(shape).safeParse(value ?? {});
  if (result.success) {
    return result.data as InferredObject<Shape>;
  }

  const unrecognized = result.error.issues.find((issue) => issue.code === 'unrecognized_keys');
  if (unrecognized) {
    throw new Error(
      `Unknown Prop(s) for ${blockName ? `Block ${blockName}` : 'Block'}: ${unrecognized.keys.join(', ')}.`,
    );
  }

  throw result.error;
}

export const isBlockWithName = <Props extends object | undefined, Options extends object>(
  block: Block<Props, Options>,
): block is Block<Props, Options> & { about: { name: string } } => {
  return !!block.about?.name;
};

export const isDefinitionWithProps = (
  definition: object,
): definition is object & { props: unknown } => {
  return 'props' in definition;
};
