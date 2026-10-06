import * as prompts from "@clack/prompts";
import { styleText } from "node:util";

export function logRerunSuggestion(rerunCommand: string, prompted: object) {
	const promptedEntries = Object.entries(prompted);
	if (!promptedEntries.length) {
		return;
	}

	prompts.log.info(
		[
			styleText("italic", `Tip: to run again with the same input values, use:`),
			styleText(
				"blue",
				[
					rerunCommand,
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

	if (typeof value === "boolean") {
		return value ? flag : `${flag}=false`;
	}

	if (typeof value === "object" && value !== null) {
		return `${flag} '${JSON.stringify(value).replaceAll("'", `'\\''`)}'`;
	}

	const valueStringified = String(value);

	return valueStringified.includes(" ")
		? `${flag} "${valueStringified}"`
		: `${flag} ${valueStringified}`;
}
