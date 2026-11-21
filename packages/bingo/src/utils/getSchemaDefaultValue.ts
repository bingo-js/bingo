import type { z } from 'zod';

export const getSchemaDefaultValue = (schema: z.ZodType): unknown => {
  return (schema.def as Partial<z.core.$ZodDefaultDef>).defaultValue;
};
