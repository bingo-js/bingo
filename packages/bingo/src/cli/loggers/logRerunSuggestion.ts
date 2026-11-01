import * as prompts from "@clack/prompts";
import { styleText } from "node:util";
import { describeOptions, FlagDescriptor } from "parse-standard-args";

import { AnyShape } from "../../types/shapes.js";

export function logRerunSuggestion(
	rerunCommand: string,
	values: object,
	options: AnyShape,
) {
	const args = stringifyRerunArgs(values, options);
	if (!args) {
		return;
	}

	prompts.log.info(
		[
			styleText("italic", `Tip: to run again with the same input values, use:`),
			styleText("blue", `${rerunCommand} ${args}`),
		].join(" "),
	);
}

/**
 * Creates shell text for CLI flags that parse back into the same values.
 * @param values Option values, such as ones that were prompted for.
 * @param options Option schemas, which determine how each flag is parsed.
 * @returns Space-separated flags and values, quoted for a POSIX shell.
 */
export function stringifyRerunArgs(values: object, options: AnyShape) {
	const flags = new Map(
		describeOptions(options).map((flag) => [flag.key, flag]),
	);

	return Object.entries(values)
		.flatMap(([key, value]) => stringifyPair(key, value, flags.get(key)))
		.join(" ");
}

/**
 * Quotes text for a POSIX shell, if it has any characters special to shells.
 */
function quoteForShell(text: string) {
	if (/^[\w%+,./:=@-]+$/.test(text)) {
		return text;
	}

	if (/^[\w %+,./:=@-]+$/.test(text)) {
		return `"${text}"`;
	}

	return `'${text.replaceAll("'", `'\\''`)}'`;
}

function stringifyFlagValue(flag: string, value: string) {
	// Values starting with "-" must be inline, so they aren't parsed as flags.
	return value.startsWith("-")
		? `${flag}=${quoteForShell(value)}`
		: `${flag} ${quoteForShell(value)}`;
}

function stringifyPair(
	key: string,
	value: unknown,
	descriptor: FlagDescriptor | undefined,
): string[] {
	if (value === undefined) {
		return [];
	}

	const flag = `--${key}`;

	// JSON values are parsed from one arg, with arrays spread into repeatable flags.
	// Providing the whole value at once keeps nested arrays and tuples intact.
	if (descriptor?.kind === "json") {
		return [stringifyFlagValue(flag, JSON.stringify(value))];
	}

	if (Array.isArray(value)) {
		return value.flatMap((element) => stringifyPair(key, element, descriptor));
	}

	if (typeof value === "boolean") {
		return [value ? flag : `${flag}=false`];
	}

	return [
		stringifyFlagValue(
			flag,
			typeof value === "string" ? value : JSON.stringify(value),
		),
	];
}
