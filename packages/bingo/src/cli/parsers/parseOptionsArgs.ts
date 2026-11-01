import { describeOptions, parseRawArgs } from "parse-standard-args";

import { AnyShape, InferredObject } from "../../types/shapes.js";

/**
 * Parses CLI args for options, converting values to their schemas' input types,
 * such as numbers, booleans, and JSON objects, and checking enum choices.
 * Values aren't otherwise validated against their schemas.
 * @param args Raw CLI args, such as `process.argv`.
 * @param options Options shape whose keys are the CLI flags to parse.
 * @returns Converted values for provided flags, issues converting values, and unknown flags.
 */
export function parseOptionsArgs<OptionsShape extends AnyShape>(
	args: string[],
	options: OptionsShape,
) {
	const { issues, unknown, values } = parseRawArgs({
		args,
		flags: describeOptions(options),
		strict: false,
	});

	return {
		issues,
		unknown,
		values: values as Partial<InferredObject<OptionsShape>>,
	};
}
