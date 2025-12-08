import { SystemRunner } from "bingo-systems";
import { RepositoryLocator } from "new-github-repository";

import { clearLocalGitTags } from "./clearLocalGitTags.js";
import { createInitialCommit } from "./createInitialCommit.js";
import { createTrackingBranches } from "./createTrackingBranches.js";

export async function prepareGitRepository(
	locator: RepositoryLocator | undefined,
	runner: SystemRunner,
) {
	await createTrackingBranches(locator, runner);
	await createInitialCommit(runner, { push: !!locator });
	await clearLocalGitTags(runner);
}
