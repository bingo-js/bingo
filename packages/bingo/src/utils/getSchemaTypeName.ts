// TODO: Split Zod generation out into standalone package
// https://github.com/bingo-js/bingo/issues/285
import { z } from "zod";

import { getSchemaInner } from "./getSchemaInner.js";

export function getSchemaTypeName(schema: z.ZodType): string {
	const schemaInner = getSchemaInner(schema);
	const def = schemaInner.def;

	switch (def.type) {
		case "array":
			return `${getSchemaTypeName((def as z.core.$ZodArrayDef).element as z.ZodType)}[]`;

		case "literal":
			return (def as z.core.$ZodLiteralDef<z.core.util.Literal>).values
				.map((value) => JSON.stringify(value))
				.join(" | ");

		case "union":
			return (
				(def as z.core.$ZodUnionDef).options
					.map((constituent) => getSchemaTypeName(constituent as z.ZodType))
					// TODO: Once these can be parsed as args, reuse that here...
					// https://github.com/bingo-js/bingo/issues/285
					.filter((typeName) => !["object", "record"].includes(typeName))
					.join(" | ")
			);

		default:
			return def.type;
	}
}
