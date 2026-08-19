import { z } from "zod";

export function getSchemaDefaultValue(schema: z.ZodType) {
	return (schema.def as Partial<z.core.$ZodDefaultDef>).defaultValue;
}
