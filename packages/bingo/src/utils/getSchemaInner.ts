import { z } from "zod";

/**
 * Unwraps any schema wrappers, such as defaults and optionals, from a schema.
 */
export function getSchemaInner(schema: z.ZodType): z.ZodType {
	const def = schema.def;

	switch (def.type) {
		case "default":
		case "nullable":
		case "optional":
			return getSchemaInner(
				(def as z.core.$ZodOptionalDef).innerType as z.ZodType,
			);

		case "pipe":
			return getSchemaInner((def as z.core.$ZodPipeDef).in as z.ZodType);

		default:
			return schema;
	}
}
