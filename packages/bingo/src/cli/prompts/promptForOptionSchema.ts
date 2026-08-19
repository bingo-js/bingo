import * as prompts from "@clack/prompts";
import * as z from "zod";

import { getSchemaDescription } from "../../utils/getSchemaDescription.js";
import { isZodDefaultDef } from "../schemas/isZodDefaultDef.js";
import { PromptFriendlyZodDef } from "../schemas/types.js";
import { validateNumber, validatorFromSchema } from "./validators.js";

export async function promptForOptionSchema(
	key: string,
	schema: z.ZodType,
	description: string | undefined,
	defaultValue: unknown,
) {
	const def = schema.def as PromptFriendlyZodDef;
	if (isZodDefaultDef(def)) {
		const innerType = def.innerType as z.ZodType;

		return await promptForOptionSchema(
			key,
			innerType,
			getSchemaDescription(innerType),
			defaultValue,
		);
	}

	const message = description
		? `What will the ${description} be? (--${key})`
		: `What will the --${key} be?`;
	let value: unknown;

	while (value === undefined || value === "") {
		switch (def.type) {
			case "boolean": {
				value = await prompts.confirm({
					initialValue: defaultValue as boolean,
					message,
				});
				break;
			}

			case "enum": {
				// Clack needs all option values to be the same type, which the values
				// of any one Zod enum are in practice.
				const options = z.core.util
					.getEnumValues(def.entries)
					.map((value) => ({ value })) as { value: string }[];
				const text = await prompts.select({
					initialValue: defaultValue as string,
					message,
					options,
				});

				return cancelOrParse(schema, text);
			}

			case "number":
				value = Number(
					await prompts.text({
						message,
						placeholder: defaultValue as string,
						validate: validateNumber,
					}),
				);
				break;

			case "union": {
				const options = def.options.flatMap((option) =>
					// TODO: Handle non-string-like schema data types
					// https://github.com/bingo-js/bingo/issues/285
					(option as z.ZodLiteral).def.values.map((value) => ({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						value: `${value}`,
					})),
				);
				const text = await prompts.select({
					initialValue: defaultValue as string,
					message,
					options,
				});

				return cancelOrParse(schema, text);
			}

			default: {
				const text = await prompts.text({
					message,
					placeholder: defaultValue as string,
					validate: validatorFromSchema(schema),
				});

				return cancelOrParse(schema, text);
			}
		}
	}

	return value;
}

function cancelOrParse(schema: z.ZodType, text: unknown) {
	return prompts.isCancel(text) ? text : schema.parse(text);
}
