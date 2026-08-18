import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { hasAccessToOwner } from "./hasAccessToOwner.js";

function createOctokit(request: (route: string) => unknown) {
	return { request: vi.fn(request) } as unknown as Octokit;
}

describe(hasAccessToOwner, () => {
	it("returns true when the owner matches the authenticated user, ignoring case", async () => {
		const actual = await hasAccessToOwner(
			createOctokit(() => ({ data: { login: "STUB-OWNER" } })),
			"stub-owner",
		);

		expect(actual).toBe(true);
	});

	it("returns true when the authenticated user is a member of the owner organization", async () => {
		const actual = await hasAccessToOwner(
			createOctokit((route) =>
				route === "GET /user"
					? { data: { login: "other-user" } }
					: { data: { state: "active" } },
			),
			"stub-owner",
		);

		expect(actual).toBe(true);
	});

	it("returns false when the authenticated user is not a member of the owner organization", async () => {
		const actual = await hasAccessToOwner(
			createOctokit((route) => {
				if (route === "GET /user") {
					return { data: { login: "other-user" } };
				}

				throw new Error("Not Found");
			}),
			"stub-owner",
		);

		expect(actual).toBe(false);
	});
});
