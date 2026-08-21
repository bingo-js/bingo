// TODO: Split out into standalone package
// https://github.com/bingo-js/bingo/issues/285
import { parseArgs, ParseArgsConfig } from "node:util";
import { z } from "zod";

import { AnyShape, InferredObject } from "../../types/shapes.js";

// TODO: Send issue/PR to DefinitelyTyped to export these from node:util...
// https://github.com/bingo-js/bingo/issues/284

type ParseArgsOptionsConfig = NonNullable<ParseArgsConfig["options"]>;

type ParseArgsOptionsType = ParseArgsOptionsConfig[string]["type"];

export function parseZodArgs<OptionsShape extends AnyShape>(
	args: string[],
	options: OptionsShape,
): InferredObject<OptionsShape> {
	const argsOptions: ParseArgsConfig["options"] = {};

	for (const [key, value] of Object.entries(options)) {
		const argsOption = zodValueToArgsOption(key, value);

		if (!(argsOption instanceof Error)) {
			argsOptions[key] = argsOption;
		}
	}

	return parseArgs({
		args,
		options: argsOptions,
		strict: false,
	}).values as InferredObject<OptionsShape>;
}

function zodValueToArgsOption(
	key: string,
	zodValue: z.ZodType,
): Error | ParseArgsOptionsConfig[string] {
	const def = zodValue.def;

	switch (def.type) {
		case "boolean":
		case "literal":
		case "string":
			return {
				type: zodValueTypeToArgsOptionType(def),
			};

		case "default":
		case "optional":
			return zodValueToArgsOption(
				key,
				(def as z.core.$ZodOptionalDef).innerType as z.ZodType,
			);

		case "union":
			return zodValueToArgsOption(
				key,
				(def as z.core.$ZodUnionDef).options[0] as z.ZodType,
			);
	}

	return new Error(
		`create does not know how to parse --${key}'s Zod type on the CLI: ${def.type}`,
	);
}

function zodValueTypeToArgsOptionType(
	def: z.core.$ZodTypeDef,
): ParseArgsOptionsType {
	if (def.type === "boolean") {
		return "boolean";
	}

	if (def.type === "literal") {
		const [value] = (def as z.core.$ZodLiteralDef<z.core.util.Literal>).values;
		const typeofValue = typeof value;

		if (typeofValue === "boolean" || typeofValue === "string") {
			return typeofValue;
		}

		throw new Error(
			`create does not know how to parse this Zod literal on the CLI: ${String(value)}`,
		);
	}

	return "string";
}
