import { createMockSystems, testInput } from "bingo-testers";
import { Octokit } from "octokit";
import { describe, expect, it, Mock, vi } from "vitest";

import { inputFromOctokit } from "./index.js";

const endpoint = "GET /repos/{owner}/{repo}/labels";
const options = { owner: "TestOwner", repo: "test-repo" };

function createMockOctokitFetchers(request: Mock) {
	return {
		fetch: vi.fn(),
		octokit: { request } as unknown as Octokit,
	};
}

describe("inputFromOctokit", () => {
	it("returns undefined when there is no octokit", async () => {
		const actual = await testInput(inputFromOctokit, {
			args: { endpoint, options },
			fetchers: { fetch: vi.fn(), octokit: undefined },
		});

		expect(actual).toBeUndefined();
	});

	it("returns undefined when running offline", async () => {
		const request = vi.fn();
		const { system, take } = createMockSystems({
			fetchers: createMockOctokitFetchers(request),
		});

		const actual = await inputFromOctokit({
			...system,
			args: { endpoint, options },
			offline: true,
			take,
		});

		expect(actual).toBeUndefined();
		expect(request).not.toHaveBeenCalled();
	});

	it("returns the response data when the request resolves", async () => {
		const data = [{ name: "bug" }];
		const request = vi.fn().mockResolvedValue({ data });

		const actual = await testInput(inputFromOctokit, {
			args: { endpoint, options },
			fetchers: createMockOctokitFetchers(request),
		});

		expect(actual).toBe(data);
		expect(request).toHaveBeenCalledWith(endpoint, {
			...options,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
			request: {
				retries: 0,
			},
		});
	});

	it("merges options with the default request parameters", async () => {
		const request = vi.fn().mockResolvedValue({ data: undefined });

		await testInput(inputFromOctokit, {
			args: {
				endpoint: "GET /user",
				options: {
					headers: { accept: "application/vnd.github.raw+json" },
					request: { timeout: 1000 },
				},
			},
			fetchers: createMockOctokitFetchers(request),
		});

		expect(request).toHaveBeenCalledWith("GET /user", {
			headers: {
				accept: "application/vnd.github.raw+json",
				"X-GitHub-Api-Version": "2022-11-28",
			},
			request: {
				retries: 0,
				timeout: 1000,
			},
		});
	});

	it("allows options to override the default request parameters", async () => {
		const request = vi.fn().mockResolvedValue({ data: undefined });

		await testInput(inputFromOctokit, {
			args: {
				endpoint: "GET /user",
				options: {
					headers: { "X-GitHub-Api-Version": "2023-01-01" },
					request: { retries: 2 },
				},
			},
			fetchers: createMockOctokitFetchers(request),
		});

		expect(request).toHaveBeenCalledWith("GET /user", {
			headers: {
				"X-GitHub-Api-Version": "2023-01-01",
			},
			request: {
				retries: 2,
			},
		});
	});

	it("returns undefined when the request rejects", async () => {
		const request = vi.fn().mockRejectedValue(new Error("Oh no!"));

		const actual = await testInput(inputFromOctokit, {
			args: { endpoint, options },
			fetchers: createMockOctokitFetchers(request),
		});

		expect(actual).toBeUndefined();
	});
});
