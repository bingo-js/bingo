import type { z } from 'zod';

import { getSchemaInner } from './getSchemaInner.ts';

export const getSchemaDescription = (schema: z.ZodType): string | undefined => {
  return schema.description ?? getSchemaInner(schema).description;
};
