import { createInput, InputContextWithArgs } from "bingo";
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

describe("testInput", () => {
	it("forwards args to the input", () => {
		const actual = testInput(inputDoubler, { args: { value: 2 } });

		expect(actual).toEqual(4);
		expectTypeOf(actual).toEqualTypeOf<number>();
	});

	it("infers the result type of an input from its args", () => {
		const actual = testInput(inputEcho, { args: { value: "abc" } });

		expect(actual).toBe("abc");
		expectTypeOf(actual).toEqualTypeOf<"abc">();
	});

	it("reports type errors for args that don't match an input's args schema", () => {
		// @ts-expect-error -- args are the wrong type
		expect(() => testInput(inputDoubler, { args: { value: "abc" } })).toThrow();
		expect(
			// @ts-expect-error -- args have an unknown property
			testInput(inputDoubler, { args: { other: true, value: 2 } }),
		).toBe(4);
		// @ts-expect-error -- args are the wrong type
		expect(() => testInput(inputEcho, { args: { value: true } })).toThrow();
	});
});
