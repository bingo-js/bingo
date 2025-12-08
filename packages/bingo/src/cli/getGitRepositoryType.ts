import { SystemRunner } from "bingo-systems";

export enum GitRepositoryType {
	None,
	Root,
	Subdirectory,
}

export async function getGitRepositoryType(
	runner: SystemRunner,
): Promise<GitRepositoryType> {
	const result = await runner("git rev-parse --git-dir");
	const message = result.stdout?.toString();

	if (!message || message.includes("fatal: not a git repository")) {
		return GitRepositoryType.None;
	}

	if (message === ".git") {
		return GitRepositoryType.Root;
	}

	return GitRepositoryType.Subdirectory;
}
