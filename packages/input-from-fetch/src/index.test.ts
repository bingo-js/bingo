import { createMockFetchers, testInput } from "bingo-testers";
import { describe, expect, it, vi } from "vitest";

import { inputFromFetch } from "./index.js";

describe("inputFromFetch", () => {
	it("returns the result from running the network request", async () => {
		const resource = "https://example.com";
		const expected = { stdout: "123" };
		const fetch = vi.fn().mockResolvedValue(expected);

		const actual = await testInput(inputFromFetch, {
			args: { resource },
			fetchers: createMockFetchers(fetch),
		});

		expect(actual).toBe(expected);
		expect(fetch).toHaveBeenCalledWith(resource, undefined);
	});

	it("passes class-based init values through to fetch unchanged", async () => {
		const resource = "https://example.com";
		const init = {
			body: new URLSearchParams({ key: "value" }),
			headers: new Headers({ "content-type": "text/plain" }),
			signal: AbortSignal.timeout(1000),
		};
		const fetch = vi.fn().mockResolvedValue({});

		await testInput(inputFromFetch, {
			args: { init, resource },
			fetchers: createMockFetchers(fetch),
		});

		expect(fetch).toHaveBeenCalledWith(resource, init);
	});

	it("passes init to fetch when provided", async () => {
		const resource = "https://example.com";
		const init = { method: "POST" };
		const expected = { stdout: "123" };
		const fetch = vi.fn().mockResolvedValue(expected);

		const actual = await testInput(inputFromFetch, {
			args: { init, resource },
			fetchers: createMockFetchers(fetch),
		});

		expect(actual).toBe(expected);
		expect(fetch).toHaveBeenCalledWith(resource, init);
	});
});
