import { z } from "zod";

import { PromptFriendlyZodDef, ZodDefType } from "./types.js";

export function isStringLikeSchema(schema: z.ZodType): boolean {
	const def = schema.def as PromptFriendlyZodDef;

	switch (def.type) {
		case ZodDefType.Boolean:
		case ZodDefType.Enum:
		case ZodDefType.Literal:
		case ZodDefType.Number:
		case ZodDefType.String:
			return true;

		case ZodDefType.Default:
		case ZodDefType.Optional:
			return isStringLikeSchema(def.innerType as z.ZodType);

		case ZodDefType.Union:
			return def.options.every((option) =>
				isStringLikeSchema(option as z.ZodType),
			);

		default:
			return false;
	}
}
