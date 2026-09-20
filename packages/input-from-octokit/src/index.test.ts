import { Endpoints, RequestParameters } from "@octokit/types";
import { runInput, TakeInput } from "bingo";
import { GitHubEndpoint } from "bingo-requests";
import { createMockSystems, testInput } from "bingo-testers";
import { Octokit } from "octokit";
import { describe, expect, expectTypeOf, it, Mock, vi } from "vitest";

import {
	inputFromOctokit,
	InputFromOctokitOptions,
	InputFromOctokitResult,
} from "./index.js";

type DeepReadonly<T> = T extends readonly (infer Item)[]
	? readonly DeepReadonly<Item>[]
	: T extends object
		? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
		: T;

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

	it("infers its result type from the endpoint", async () => {
		const request = vi.fn().mockResolvedValue({ data: [] });
		const fetchers = createMockOctokitFetchers(request);
		const { system, take } = createMockSystems({ fetchers });

		const labels = await take(inputFromOctokit, { endpoint, options });
		const user = await inputFromOctokit({
			...system,
			args: { endpoint: "GET /user" },
			take,
		});
		const issue = await runInput(inputFromOctokit, {
			args: {
				endpoint: "POST /repos/{owner}/{repo}/issues",
				options: { ...options, labels: ["bug"], title: "Title" },
			},
			fetchers,
		});
		const repository = await testInput(inputFromOctokit, {
			args: { endpoint: "GET /repos/{owner}/{repo}", options },
			fetchers,
		});

		expectTypeOf(labels).toEqualTypeOf<
			Endpoints[typeof endpoint]["response"]["data"] | undefined
		>();
		expectTypeOf(labels).toEqualTypeOf<
			InputFromOctokitResult<typeof endpoint>
		>();
		expectTypeOf(user).toEqualTypeOf<
			Endpoints["GET /user"]["response"]["data"] | undefined
		>();
		expectTypeOf(issue).toEqualTypeOf<
			| Endpoints["POST /repos/{owner}/{repo}/issues"]["response"]["data"]
			| undefined
		>();
		expectTypeOf(repository).toEqualTypeOf<
			Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"] | undefined
		>();
	});

	it("reports type errors for args that don't match the endpoint", () => {
		const take = vi.fn() as TakeInput;

		// @ts-expect-error -- options are required by the endpoint
		take(inputFromOctokit, { endpoint });
		// @ts-expect-error -- endpoint is not a known GitHub endpoint
		take(inputFromOctokit, { endpoint: "GET /unknown", options });
		// @ts-expect-error -- options must match the endpoint's parameters
		take(inputFromOctokit, { endpoint, options: { owner: "" } });
		// @ts-expect-error -- endpoint must be a known string literal
		take(inputFromOctokit, { endpoint: endpoint as string, options });

		expect(take).toHaveBeenCalledTimes(4);
	});

	it("accepts the parameters of every endpoint as const options", () => {
		type ConstOptions<Endpoint extends GitHubEndpoint> = DeepReadonly<
			Endpoints[Endpoint]["parameters"]
		> &
			RequestParameters;

		type EndpointsWithUnassignableParameters = {
			[Endpoint in GitHubEndpoint]: ConstOptions<Endpoint> extends InputFromOctokitOptions<Endpoint>
				? never
				: Endpoint;
		}[GitHubEndpoint];

		expectTypeOf<EndpointsWithUnassignableParameters>().toEqualTypeOf<never>();
	});
});
