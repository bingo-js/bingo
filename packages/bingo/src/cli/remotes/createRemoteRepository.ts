import * as prompts from "@clack/prompts";
import { BingoSystem } from "bingo-systems";
import chalk from "chalk";
import { newGitHubRepository, RepositoryLocator } from "new-github-repository";

import { Template } from "../../types/templates.js";
import { ClackDisplay } from "../display/createClackDisplay.js";
import { runSpinnerTask } from "../display/runSpinnerTask.js";
import { prepareGitRepository } from "../repository/prepareGitRepository.js";

export async function createRemoteRepository(
	display: ClackDisplay,
	locator: RepositoryLocator,
	system: BingoSystem,
	template: Template,
): Promise<Error | undefined> {
	const remoteDescriptor = `${locator.owner}/${locator.repository}`;
	const creationResult = await runSpinnerTask(
		display,
		`Creating repository on GitHub: ${chalk.green(remoteDescriptor)}`,
		`Created repository on GitHub`,
		async (): Promise<undefined> => {
			await newGitHubRepository({
				octokit: system.fetchers.octokit,
				owner: locator.owner,
				repository: locator.repository,
				template: template.about?.repository,
			});
			await prepareGitRepository(locator, system.runner);
		},
	);

	if (creationResult instanceof Error) {
		return creationResult;
	}

	prompts.log.step(
		[
			"You've got a new repository ready to use in:",
			`  ${chalk.green(`https://github.com/${remoteDescriptor}`)}`,
		].join("\n"),
	);
}
