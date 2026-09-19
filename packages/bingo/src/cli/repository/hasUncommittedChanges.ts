import { SystemRunner } from "bingo-systems";

export async function hasUncommittedChanges(runner: SystemRunner) {
	const status = await runner(
		"git status --porcelain --untracked-files=normal",
	);

	// If the status can't be read, the tree can't be verified as safe to clear.
	return status.failed || !!status.stdout?.toString().trim();
}
