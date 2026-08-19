import { z } from "zod";

/**
 * Any object containing Zod schemas that are optional.
 * In other words, allows providing an empty object {} value.
 */
export type AnyOptionalShape = Record<
	string,
	z.ZodDefault<z.ZodType> | z.ZodOptional<z.ZodType>
>;

/**
 * Any object containing Zod schemas as values.
 */
export type AnyShape = Record<string, z.ZodType>;

/**
 * Given an object containing Zod schemas, produces the equivalent runtime type.
 * @example
 * ```ts
 * InferredObject<{ value: z.ZodNumber }>
 * ```
 * is the same as:
 * ```ts
 * { value: number }
 * ```
 */
export type InferredObject<OptionsShape extends AnyShape | undefined> =
	OptionsShape extends AnyShape
		? // Zod infers an object schema with no properties as Record<string, never>,
			// which can't be intersected with any other properties.
			keyof OptionsShape extends never
			? object
			: z.infer<z.ZodObject<OptionsShape>>
		: undefined;
