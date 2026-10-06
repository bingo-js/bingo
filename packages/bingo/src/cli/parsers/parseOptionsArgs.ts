import { describeOptions, parseRawArgs } from "parse-standard-args";

import { AnyShape, InferredObject } from "../../types/shapes.js";

/**
 * Parses CLI args for options, converting values per their schemas' types.
 * Values aren't validated here: they're validated once all options are known,
 * after preparing defaults and prompting for any missing ones.
 * @param args Raw CLI args, such as `process.argv`.
 * @param options Options shape whose keys are the CLI flags to parse.
 * @returns Parsed values for provided flags, issues converting values, and unknown flags.
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
