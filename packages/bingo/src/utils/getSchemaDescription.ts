import { z } from 'zod';

import { getSchemaInner } from './getSchemaInner.ts';

export function getSchemaDescription(schema: z.ZodType) {
  return schema.description ?? getSchemaInner(schema).description;
}
