import { SystemRunner } from "bingo-systems";

export async function isInGitRepository(runner: SystemRunner) {
	try {
		await runner("git rev-parse --git-dir");
		return true;
	} catch {
		return false;
	}
}
