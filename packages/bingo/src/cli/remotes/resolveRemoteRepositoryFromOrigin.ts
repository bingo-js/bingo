import { SystemRunner } from "bingo-systems";
import gitUrlParse from "git-url-parse";
import { RepositoryLocator } from "new-github-repository";

import { tryCatchSafeSync } from "../../utils/tryCatch.js";

export async function resolveRemoteRepositoryFromOrigin(
	runner: SystemRunner,
): Promise<RepositoryLocator | undefined> {
	const { stdout } = await runner("git remote get-url origin");
	if (!stdout) {
		return undefined;
	}

	const parsed = tryCatchSafeSync(() => gitUrlParse(stdout.toString()));

	return (
		parsed && {
			owner: parsed.owner,
			repository: parsed.name,
		}
	);
}
