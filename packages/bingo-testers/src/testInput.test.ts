import { createInput } from "bingo";
import { describe, expect, expectTypeOf, it } from "vitest";
import { z } from "zod";

import { testInput } from "./testInput.js";

const inputDoubler = createInput({
	args: {
		value: z.number(),
	},
	produce({ args }) {
		return args.value * 2;
	},
});

describe("testInput", () => {
	it("forwards args to the input", () => {
		const actual = testInput(inputDoubler, { args: { value: 2 } });

		expect(actual).toEqual(4);
		expectTypeOf(actual).toEqualTypeOf<number>();
	});

	it("reports type errors for args that don't match an input's args schema", () => {
		// @ts-expect-error -- args are the wrong type
		expect(() => testInput(inputDoubler, { args: { value: "abc" } })).toThrow();
		expect(
			// @ts-expect-error -- args have an unknown property
			testInput(inputDoubler, { args: { other: true, value: 2 } }),
		).toBe(4);
	});
});
