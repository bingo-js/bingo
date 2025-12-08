import { BingoSystem } from "bingo-systems";

import { RepositoryLocator, Template } from "../../types/templates.js";
import { promptForOptionSchema } from "../prompts/promptForOptionSchema.js";
import { isStringLikeSchema } from "../schemas/isStringLikeSchema.js";
import { PartialRepositoryLocator } from "./types.js";

export async function resolveRemoteRepositoryToCreate(
	locator: PartialRepositoryLocator,
	system: BingoSystem,
	template: Template,
): Promise<Error | RepositoryLocator> {
	if (locator.owner) {
		return { owner: locator.owner, repository: locator.repository };
	}

	const username = await getUsername();
	if (username) {
		return { owner: username, repository: locator.repository };
	}

	if (!("owner" in template.options)) {
		return new Error(
			"--remote requested, but could not infer an owner because this template lacks an 'owner' option.",
		);
	}

	if (!isStringLikeSchema(template.options.owner)) {
		return new Error(
			"--remote requested, but could not infer an owner because this template's owner option is not a string-like.",
		);
	}

	const prompted = await promptForOptionSchema(
		"owner",
		template.options.owner,
		"organization or username owning the repository",
		undefined,
	);

	return typeof prompted === "string"
		? { owner: prompted, repository: locator.repository }
		: new Error("--remote requested, but no owner was provided.");

	async function getUsername() {
		const value = await system.runner("gh config get user -h github.com");
		return value instanceof Error ? undefined : value.stdout?.toString();
	}
}
