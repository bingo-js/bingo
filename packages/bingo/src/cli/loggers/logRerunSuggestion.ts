import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { getRerunCommand } from "./getRerunCommand.js";

export function logRerunSuggestion(argv: string[], prompted: object) {
	const promptedEntries = Object.entries(prompted);
	if (!promptedEntries.length) {
		return;
	}

	prompts.log.info(
		[
			chalk.italic(`Tip: to run again with the same input values, use:`),
			chalk.blue(
				[
					getRerunCommand(argv),
					promptedEntries
						.map(([key, value]) => stringifyPair(key, value))
						.join(" "),
				].join(" "),
			),
		].join(" "),
	);
}

function stringifyPair(key: string, value: unknown): string {
	if (Array.isArray(value)) {
		return value.map((element) => stringifyPair(key, element)).join(" ");
	}

	const flag = `--${key}`;

	if (typeof value === "boolean" && value) {
		return flag;
	}

	const valueStringified = String(value);

	return valueStringified.includes(" ")
		? `${flag} "${valueStringified}"`
		: `${flag} ${valueStringified}`;
}
