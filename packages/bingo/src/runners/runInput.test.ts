import path from "node:path";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { createInput } from "../creators/createInput.js";
import { runInput } from "./runInput.js";

const input = createInput({
	args: {
		value: z.number(),
	},
	async produce({ args, runner }) {
		return {
			directory:
				process.platform === "win32"
					? (await runner("cd")).stdout
					: (await runner("pwd")).stdout,
			doubled: args.value * 2,
		};
	},
});

describe("runInput", () => {
	it("defaults directory to '.' when not provided", async () => {
		const actual = await runInput(input, { args: { value: 2 } });

		expect(actual).toEqual({
			directory: process.cwd(),
			doubled: 4,
		});
	});

	it("sets directory when provided", async () => {
		const directory = path.join(process.cwd(), "..");

		const actual = await runInput(input, {
			args: { value: 2 },
			directory,
		});

		expect(actual).toEqual({
			directory,
			doubled: 4,
		});
	});

	it("reports type errors for args that don't match an input's args schema", async () => {
		// @ts-expect-error -- args are the wrong type
		expect(() => runInput(input, { args: { value: "abc" } })).toThrow();
		await expect(
			// @ts-expect-error -- args have an unknown property
			runInput(input, { args: { other: true, value: 2 } }),
		).resolves.toEqual({ directory: process.cwd(), doubled: 4 });
	});
});
