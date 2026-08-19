import { z } from "zod";

/**
 * The `def.type` values of the Zod schemas we know how to prompt for.
 */
export enum ZodDefType {
	Boolean = "boolean",
	Default = "default",
	Enum = "enum",
	Literal = "literal",
	Number = "number",
	Optional = "optional",
	String = "string",
	Union = "union",
}

type WithZodDefType<Def, Type extends ZodDefType> = Omit<Def, "type"> & {
	type: Type;
};

/**
 * The known Zod schema definitions that we know how to prompt for with Clack.
 */
export type PromptFriendlyZodDef =
	| WithZodDefType<z.core.$ZodBooleanDef, ZodDefType.Boolean>
	| WithZodDefType<z.core.$ZodDefaultDef, ZodDefType.Default>
	| WithZodDefType<z.core.$ZodEnumDef, ZodDefType.Enum>
	| WithZodDefType<
			z.core.$ZodLiteralDef<z.core.util.Literal>,
			ZodDefType.Literal
	  >
	| WithZodDefType<z.core.$ZodNumberDef, ZodDefType.Number>
	| WithZodDefType<z.core.$ZodOptionalDef, ZodDefType.Optional>
	| WithZodDefType<z.core.$ZodStringDef, ZodDefType.String>
	| WithZodDefType<z.core.$ZodUnionDef, ZodDefType.Union>;
