import { z } from "zod";

/**
 * The known Zod schema definitions that we know how to prompt for with Clack.
 */
export type PromptFriendlyZodDef =
	| z.core.$ZodBooleanDef
	| z.core.$ZodDefaultDef
	| z.core.$ZodEnumDef
	| z.core.$ZodLiteralDef<z.core.util.Literal>
	| z.core.$ZodNumberDef
	| z.core.$ZodOptionalDef
	| z.core.$ZodStringDef
	| z.core.$ZodUnionDef;
