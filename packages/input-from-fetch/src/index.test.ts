import {
	createMockFetchers,
	createMockSystems,
	testInput,
} from "bingo-testers";
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

	it("returns undefined when running offline", async () => {
		const fetch = vi.fn();
		const { system, take } = createMockSystems({
			fetchers: createMockFetchers(fetch),
		});

		const actual = await inputFromFetch({
			...system,
			args: { resource: "https://example.com" },
			offline: true,
			take,
		});

		expect(actual).toBeUndefined();
		expect(fetch).not.toHaveBeenCalled();
	});

	it("returns the error when the network request rejects", async () => {
		const expected = new Error("Oh no!");
		const fetch = vi.fn().mockRejectedValue(expected);

		const actual = await testInput(inputFromFetch, {
			args: { resource: "https://example.com" },
			fetchers: createMockFetchers(fetch),
		});

		expect(actual).toBe(expected);
	});

	it("passes a typed array body through to fetch unchanged", async () => {
		const resource = "https://example.com";
		const init = { body: new Uint8Array([1, 2, 3]) };
		const fetch = vi.fn().mockResolvedValue({});

		await testInput(inputFromFetch, {
			args: { init, resource },
			fetchers: createMockFetchers(fetch),
		});

		expect(fetch).toHaveBeenCalledWith(resource, init);
	});

	it("passes a stream body and duplex through to fetch unchanged", async () => {
		const resource = "https://example.com";
		const init = {
			body: new ReadableStream(),
			duplex: "half" as const,
			method: "POST",
		};
		const fetch = vi.fn().mockResolvedValue({});

		await testInput(inputFromFetch, {
			args: { init, resource },
			fetchers: createMockFetchers(fetch),
		});

		expect(fetch).toHaveBeenCalledWith(resource, init);
	});

	it("passes a null body through to fetch unchanged", async () => {
		const resource = "https://example.com";
		const init = { body: null };
		const fetch = vi.fn().mockResolvedValue({});

		await testInput(inputFromFetch, {
			args: { init, resource },
			fetchers: createMockFetchers(fetch),
		});

		expect(fetch).toHaveBeenCalledWith(resource, init);
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
