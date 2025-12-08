import { describe, expect, it, vi } from "vitest";

import { resolveRemoteRepositoryFromOrigin } from "./resolveRemoteRepositoryFromOrigin.js";

describe(resolveRemoteRepositoryFromOrigin, () => {
	it("returns undefined when there is no origin remote", async () => {
		const runner = vi.fn().mockResolvedValue({ stdout: "" });

		const result = await resolveRemoteRepositoryFromOrigin(runner);

		expect(result).toBeUndefined();
	});

	it("returns undefined when the origin is not a valid Git URL", async () => {
		const runner = vi.fn().mockResolvedValue({ stdout: "invalid" });

		const result = await resolveRemoteRepositoryFromOrigin(runner);

		expect(result).toBeUndefined();
	});

	it("returns a locator when the origin is a valid Git URL", async () => {
		const runner = vi.fn().mockResolvedValue({ stdout: "abc/def.git" });

		const result = await resolveRemoteRepositoryFromOrigin(runner);

		expect(result).toEqual({
			owner: "abc",
			repository: "def",
		});
	});
});
