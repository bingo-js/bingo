import { Octokit } from "octokit";
import { describe, expect, expectTypeOf, it, vi } from "vitest";
import { z } from "zod";

import { createInput } from "../creators/createInput.js";
import { InputContextWithArgs, TakeInput } from "../types/inputs.js";
import { createSystemContext } from "./createSystemContext.js";

const mockOfflineFetchers = {
	variant: "offline",
};

const mockSystemFetchers = {
	variant: "system",
};

const mockSystemRunner = vi.fn();

const mockWritingFileSystem = {
	glob: vi.fn(),
	readDirectory: vi.fn(),
	readFile: vi.fn(),
	writeDirectory: vi.fn(),
	writeFile: vi.fn(),
};

vi.mock("bingo-systems", () => ({
	createSystemFetchers: () => mockSystemFetchers,
	createSystemFetchersOffline: () => mockOfflineFetchers,
	createSystemRunner: () => mockSystemRunner,
	createWritingFileSystem: () => mockWritingFileSystem,
}));

const inputDoubler = createInput({
	args: {
		value: z.number(),
	},
	produce({ args }) {
		return args.value * 2;
	},
});

const inputNoArgs = createInput({
	produce: () => 123,
});

const inputEchoArgs = {
	value: z.union([z.number(), z.string()]),
};

/**
 * An input whose result type depends on its args.
 */
interface InputEcho {
	<Value extends number | string>(
		context: InputContextWithArgs<{ value: Value }>,
	): Value;
	args: typeof inputEchoArgs;
}

const inputEcho = createInput({
	args: inputEchoArgs,
	produce: ({ args }) => args.value,
}) as InputEcho;

const inputEchoAllArgs = {
	values: z.array(z.union([z.number(), z.string()])),
};

/**
 * An input whose result type depends on its array args.
 */
interface InputEchoAll {
	<Value extends number | string>(
		context: InputContextWithArgs<{ values: readonly Value[] }>,
	): Value[];
	args: typeof inputEchoAllArgs;
}

const inputEchoAll = createInput({
	args: inputEchoAllArgs,
	produce: ({ args }) => args.values,
}) as InputEchoAll;

const mockDisplay = {
	item: vi.fn(),
	log: vi.fn(),
};

vi.mock("./createDisplay.js", () => ({
	createDisplay: () => mockDisplay,
}));

describe("createSystemContext", () => {
	describe("display", () => {
		it("uses the provided display when it exists", () => {
			const provided = {
				item: vi.fn(),
				log: vi.fn(),
			};

			const { display } = createSystemContext({
				directory: ".",
				display: provided,
			});

			expect(display).toBe(provided);
		});

		it("creates a system display when display is not provided", () => {
			const { display } = createSystemContext({ directory: "." });

			expect(display).toBe(mockDisplay);
		});
	});

	describe("fetchers", () => {
		it("uses the provided fetchers when it exists", () => {
			const provided = {
				fetch: vi.fn(),
				octokit: {} as Octokit,
			};

			const { fetchers } = createSystemContext({
				directory: ".",
				fetchers: provided,
			});

			expect(fetchers).toBe(provided);
		});

		it("creates standard fetchers when fetchers and offline are not provided", () => {
			const { fetchers } = createSystemContext({ directory: "." });

			expect(fetchers).toBe(mockSystemFetchers);
		});

		it("creates offline fetchers when fetchers is not provided and offline is true", () => {
			const { fetchers } = createSystemContext({
				directory: ".",
				offline: true,
			});

			expect(fetchers).toBe(mockOfflineFetchers);
		});
	});

	describe("fs", () => {
		it("uses the provided fs when it exists", () => {
			const provided = {
				glob: vi.fn(),
				readDirectory: vi.fn(),
				readFile: vi.fn(),
				writeDirectory: vi.fn(),
				writeFile: vi.fn(),
			};

			const { fs } = createSystemContext({
				directory: ".",
				fs: provided,
			});

			expect(fs).toBe(provided);
		});

		it("creates a writing file system when fs is not provided", () => {
			const { fs } = createSystemContext({ directory: "." });

			expect(fs).toBe(mockWritingFileSystem);
		});
	});

	describe("runner", () => {
		it("uses the provided runner when it exists", () => {
			const provided = vi.fn();

			const { runner } = createSystemContext({
				directory: ".",
				runner: provided,
			});

			expect(runner).toBe(provided);
		});

		it("creates a writing file system when runner is not provided", () => {
			const { runner } = createSystemContext({ directory: "." });

			expect(runner).toBe(mockSystemRunner);
		});
	});

	describe("take", () => {
		it("does not enable offline when settings.offline is not enabled", () => {
			const input = vi.fn();
			const { take } = createSystemContext({ directory: "." });

			take(input);

			expect(input).toHaveBeenCalledWith(
				expect.objectContaining({
					offline: undefined,
				}),
			);
		});

		it("enables offline when settings.offline is true", () => {
			const input = vi.fn();
			const { take } = createSystemContext({ directory: ".", offline: true });

			take(input);

			expect(input).toHaveBeenCalledWith(
				expect.objectContaining({
					offline: true,
				}),
			);
		});

		it("passes args to an input with an args schema", () => {
			const { take } = createSystemContext({ directory: "." });

			const actual = take(inputDoubler, { value: 2 });

			expect(actual).toBe(4);
			expectTypeOf(actual).toEqualTypeOf<number>();
		});

		it("infers the result type of an input from its args", () => {
			const { take } = createSystemContext({ directory: "." });

			const actual = take(inputEcho, { value: "abc" });

			expect(actual).toBe("abc");
			expectTypeOf(actual).toEqualTypeOf<"abc">();
		});

		it("infers the result type of an input from its array args", () => {
			const { take } = createSystemContext({ directory: "." });

			const actual = take(inputEchoAll, { values: ["abc", 123] });

			expect(actual).toEqual(["abc", 123]);
			expectTypeOf(actual).toEqualTypeOf<(123 | "abc")[]>();
		});

		it("reports type errors for args that don't match an input's args schema", () => {
			const take = vi.fn() as TakeInput;

			// @ts-expect-error -- args are the wrong type
			take(inputDoubler, { value: "abc" });
			// @ts-expect-error -- args have an unknown property
			take(inputDoubler, { other: true, value: 2 });
			// @ts-expect-error -- args are the wrong type
			take(inputEcho, { value: true });
			// @ts-expect-error -- args are not accepted by an input without an args schema
			take(inputNoArgs, { value: 2 });

			expect(take).toHaveBeenCalledTimes(4);
		});
	});
});
