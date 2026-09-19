import * as prompts from "@clack/prompts";
import { BingoSystem, SystemRunner } from "bingo-systems";
import { styleText } from "node:util";
import { Octokit } from "octokit";

import { RepositoryLocator, Template } from "../../types/templates.js";
import { promptForOptionSchema } from "../prompts/promptForOptionSchema.js";
import { isStringLikeSchema } from "../schemas/isStringLikeSchema.js";
import { hasAccessToOwner } from "./hasAccessToOwner.js";
import { PartialRepositoryLocator } from "./types.js";

export async function resolveRemoteRepositoryToCreate(
	locator: PartialRepositoryLocator,
	system: BingoSystem,
	template: Template,
): Promise<Error | RepositoryLocator> {
	if (locator.owner) {
		return (await ownerIsAccessible(system.fetchers.octokit, locator.owner))
			? { owner: locator.owner, repository: locator.repository }
			: new Error(
					`--remote requested, but the authenticated GitHub user does not have access to the ${locator.owner} owner.`,
				);
	}

	const username = await getUsername(system.runner);
	if (username) {
		return { owner: username, repository: locator.repository };
	}

	if (!("owner" in template.options)) {
		return new Error(
			"--remote requested, but could not infer an owner because this template lacks an 'owner' option.",
		);
	}

	const ownerSchema = template.options.owner;

	if (!isStringLikeSchema(ownerSchema)) {
		return new Error(
			"--remote requested, but could not infer an owner because this template's owner option is not a string-like.",
		);
	}

	while (true) {
		const prompted = await promptForOptionSchema(
			"owner",
			ownerSchema,
			"organization or username owning the repository",
			undefined,
		);

		if (typeof prompted !== "string") {
			return new Error("--remote requested, but no owner was provided.");
		}

		if (await ownerIsAccessible(system.fetchers.octokit, prompted)) {
			return { owner: prompted, repository: locator.repository };
		}

		prompts.log.warn(
			`The authenticated GitHub user does not have access to the ${styleText("green", prompted)} owner.`,
		);
	}
}

async function getUsername(runner: SystemRunner) {
	const value = await runner("gh config get user -h github.com");
	return value instanceof Error ? undefined : value.stdout?.toString();
}

async function ownerIsAccessible(octokit: Octokit | undefined, owner: string) {
	return !octokit || (await hasAccessToOwner(octokit, owner));
}
