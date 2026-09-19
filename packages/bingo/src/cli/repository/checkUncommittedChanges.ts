import { SystemRunner } from "bingo-systems";

export type UncommittedChangesStatus = "changes" | "clean" | "unknown";

export async function checkUncommittedChanges(
	runner: SystemRunner,
): Promise<UncommittedChangesStatus> {
	const status = await runner(
		"git status --porcelain --untracked-files=normal",
	);

	if (status.failed) {
		return "unknown";
	}

	if (status.stdout?.toString().trim()) {
		return "changes";
	}

	return "clean";
}
