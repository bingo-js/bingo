import { describe, expect, it, vi } from "vitest";

import {
	getGitRepositoryType,
	GitRepositoryType,
} from "./getGitRepositoryType.js";

describe(getGitRepositoryType, () => {
	it("returns GitRepositoryType.None when git rev-parse --git-dir has no output", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			stdout: undefined,
		});

		const actual = await getGitRepositoryType(runner);

		expect(actual).toBe(GitRepositoryType.None);
	});

	it("returns GitRepositoryType.None when git rev-parse --git-dir has a fatal stdout", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			stdout: "fatal: not a git repository ...",
		});

		const actual = await getGitRepositoryType(runner);

		expect(actual).toBe(GitRepositoryType.None);
	});

	it("returns GitRepositoryType.Root when git rev-parse --git-dir returns just .git", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			stdout: ".git",
		});

		const actual = await getGitRepositoryType(runner);

		expect(actual).toBe(GitRepositoryType.Root);
	});

	it("returns GitRepositoryType.Subdirectory when git rev-parse --git-dir returns a subdirectory", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			stdout: "/parent/directory/.git",
		});

		const actual = await getGitRepositoryType(runner);

		expect(actual).toBe(GitRepositoryType.Subdirectory);
	});
});
