import { SystemRunner } from "bingo-systems";

export async function hasUncommittedChanges(runner: SystemRunner) {
	const status = await runner(
		"git status --porcelain --untracked-files=normal",
	);

	return status.failed || !!status.stdout?.toString().trim();
}
