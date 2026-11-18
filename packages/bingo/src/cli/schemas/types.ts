import type { z } from 'zod';

/**
 * The `def.type` values of the Zod schemas we know how to prompt for.
 */
export type ZodDefType =
  | 'boolean'
  | 'default'
  | 'enum'
  | 'literal'
  | 'number'
  | 'optional'
  | 'string'
  | 'union';

type WithZodDefType<Def, Type extends ZodDefType> = Omit<Def, 'type'> & {
  type: Type;
};

/**
 * The known Zod schema definitions that we know how to prompt for with Clack.
 */
export type PromptFriendlyZodDef =
  | WithZodDefType<z.core.$ZodBooleanDef, 'boolean'>
  | WithZodDefType<z.core.$ZodDefaultDef, 'default'>
  | WithZodDefType<z.core.$ZodEnumDef, 'enum'>
  | WithZodDefType<z.core.$ZodLiteralDef<z.core.util.Literal>, 'literal'>
  | WithZodDefType<z.core.$ZodNumberDef, 'number'>
  | WithZodDefType<z.core.$ZodOptionalDef, 'optional'>
  | WithZodDefType<z.core.$ZodStringDef, 'string'>
  | WithZodDefType<z.core.$ZodUnionDef, 'union'>;
