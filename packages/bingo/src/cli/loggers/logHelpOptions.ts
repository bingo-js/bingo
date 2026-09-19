import * as prompts from "@clack/prompts";
import { styleText } from "node:util";

import { formatFlag } from "./formatFlag.js";

export interface HelpOption {
	examples?: string[];
	flag: string;
	text?: string;
	type: string;
}

export function logHelpOptions(
	category: string,
	packageName: string,
	options: HelpOption[],
) {
	const message = [
		`${styleText(["bgGreenBright", "black"], category)} options:`,
		"",
		...options.map((option) => {
			const text = option.text ? styleText("blue", option.text) : "";
			return [
				`  ${formatFlag(option.flag, option.type)}${text}`,
				option.examples?.length &&
					`\n${option.examples
						.map((example) =>
							styleText("blue", `      npx ${packageName} ${example}\n`),
						)
						.join("")}`,
			]
				.filter(Boolean)
				.join("");
		}),
	].join("\n");

	prompts.log.message(message.slice(0, `${message}\n`.lastIndexOf("\n")));
}
