import { z } from "zod";

import { getSchemaInner } from "./getSchemaInner.js";

export function getSchemaDescription(schema: z.ZodType) {
	// Zod stores descriptions per schema, so wrappers such as .default() don't
	// have the description of the schema they wrap.
	return schema.description ?? getSchemaInner(schema).description;
}
