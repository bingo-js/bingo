import type { z } from 'zod';

import { type PromptFriendlyZodDef } from './types.ts';

export function isStringLikeSchema(schema: z.ZodType): boolean {
  const def = schema.def as unknown as PromptFriendlyZodDef;

  switch (def.type) {
    case 'boolean':
    case 'enum':
    case 'literal':
    case 'number':
    case 'string':
      return true;

    case 'default':
    case 'optional':
      return isStringLikeSchema(def.innerType as z.ZodType);

    case 'union':
      return def.options.every((option) => isStringLikeSchema(option as z.ZodType));

    default:
      return false;
  }
}
