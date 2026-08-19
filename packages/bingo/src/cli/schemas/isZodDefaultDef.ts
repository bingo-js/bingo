import { z } from "zod";

export function isZodDefaultDef(
	def: z.core.$ZodTypeDef,
): def is z.core.$ZodDefaultDef {
	return def.type === "default";
}
