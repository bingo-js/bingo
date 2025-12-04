import { SystemRunner } from "bingo-systems";

export async function isInGitRepository(runner: SystemRunner) {
	const result = await runner("git rev-parse --git-dir");
	return result.message
		? !result.message.includes("fatal: not a git repository")
		: false;
}
