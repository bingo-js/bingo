import { Octokit, RequestError } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { hasAccessToOwner } from "./hasAccessToOwner.js";

function createOctokit(request: (route: string) => unknown) {
	return { request: vi.fn(request) } as unknown as Octokit;
}

function createRequestError(status: number) {
	return new RequestError("Stub error.", status, {
		request: {
			headers: {},
			method: "GET",
			url: "https://api.github.com/user/memberships/orgs/stub-owner",
		},
	});
}

describe(hasAccessToOwner, () => {
	it("returns true when requesting the authenticated user fails", async () => {
		const actual = await hasAccessToOwner(
			createOctokit(() => {
				throw createRequestError(403);
			}),
			"stub-owner",
		);

		expect(actual).toBe(true);
	});

	it("returns true when the owner matches the authenticated user, ignoring case", async () => {
		const actual = await hasAccessToOwner(
			createOctokit(() => ({ data: { login: "STUB-OWNER" } })),
			"stub-owner",
		);

		expect(actual).toBe(true);
	});

	it("returns true when the authenticated user is an active member of the owner organization", async () => {
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

	it("returns false when the authenticated user's membership in the owner organization is pending", async () => {
		const actual = await hasAccessToOwner(
			createOctokit((route) =>
				route === "GET /user"
					? { data: { login: "other-user" } }
					: { data: { state: "pending" } },
			),
			"stub-owner",
		);

		expect(actual).toBe(false);
	});

	it("returns false when the authenticated user is not a member of the owner organization", async () => {
		const actual = await hasAccessToOwner(
			createOctokit((route) => {
				if (route === "GET /user") {
					return { data: { login: "other-user" } };
				}

				throw createRequestError(404);
			}),
			"stub-owner",
		);

		expect(actual).toBe(false);
	});

	it("returns true when requesting the owner organization membership fails for a reason other than a 404", async () => {
		const actual = await hasAccessToOwner(
			createOctokit((route) => {
				if (route === "GET /user") {
					return { data: { login: "other-user" } };
				}

				throw createRequestError(403);
			}),
			"stub-owner",
		);

		expect(actual).toBe(true);
	});
});
