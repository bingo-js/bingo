import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { SystemItemsDump } from "../display/createClackDisplay.js";

export interface OutroErrata {
	items?: SystemItemsDump;
	suggestions?: string[];
}

export function logOutro(
	message: string,
	{ items, suggestions }: OutroErrata = {},
) {
	if (items) {
		for (const [group, groupItems] of Object.entries(items)) {
			for (const [id, item] of Object.entries(groupItems)) {
				if (item.error) {
					const error =
						item.error instanceof Error
							? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								item.error.stack!
							: (item.error as string);

					prompts.log.error(
						`The ${chalk.red(id)} ${group} failed. You should re-run it and fix its complaints.\n${error}`,
					);
				}
			}
		}
	}

	prompts.outro(message);

	if (suggestions?.length) {
		console.log("Be sure to:");
		console.log();

		for (const suggestion of suggestions) {
			console.log(suggestion);
		}

		console.log();
	}
}
