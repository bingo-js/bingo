import { execFileSync } from "node:child_process";
import { describe, expect, it, test, vi } from "vitest";
import { z } from "zod";

import { parseOptionsArgs } from "../parsers/parseOptionsArgs.js";
import {
	logRerunSuggestion,
	stringifyRerunArgs,
} from "./logRerunSuggestion.js";

const mockLog = {
	info: vi.fn(),
};

vi.mock("@clack/prompts", () => ({
	get log() {
		return mockLog;
	},
}));

/**
 * Splits text into args the same way a POSIX shell would.
 */
function splitWithShell(text: string) {
	return execFileSync("sh", ["-c", `printf '%s\\0' ${text}`], {
		encoding: "utf8",
	})
		.split("\0")
		.slice(0, -1);
}

describe(logRerunSuggestion, () => {
	it("does not log when there are no values", () => {
		logRerunSuggestion("npx my-app", {}, {});

		expect(mockLog.info).not.toHaveBeenCalled();
	});

	it("does not log when all values are undefined", () => {
		logRerunSuggestion(
			"npx my-app",
			{ abc: undefined },
			{ abc: z.string().optional() },
		);

		expect(mockLog.info).not.toHaveBeenCalled();
	});

	it("logs the rerun command with values when there are values", () => {
		logRerunSuggestion("npx my-app", { abc: "def" }, { abc: z.string() });

		expect(mockLog.info.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "Tip: to run again with the same input values, use: npx my-app --abc def",
			  ],
			]
		`);
	});
});

describe(stringifyRerunArgs, () => {
	test("value stringification", () => {
		const actual = stringifyRerunArgs(
			{
				"is-false": false,
				"is-true": true,
				multiple: ["def", 456],
				multipleBooleans: [true, false],
				multipleObjects: [{ a: 1 }, { b: "it's" }],
				numeric: 123,
				object: { a: "b c", d: [1] },
				spaced: "a bb ccc",
				stringy: "abc",
				unknown: "$HOME",
			},
			{
				"is-false": z.boolean(),
				"is-true": z.boolean(),
				multiple: z.array(z.union([z.string(), z.number()])),
				multipleBooleans: z.array(z.boolean()),
				multipleObjects: z.array(z.object({})),
				numeric: z.number(),
				object: z.object({}),
				spaced: z.string(),
				stringy: z.string(),
			},
		);

		expect(actual).toMatchInlineSnapshot(
			`"--is-false=false --is-true --multiple def --multiple 456 --multipleBooleans '[true,false]' --multipleObjects '[{"a":1},{"b":"it'\\''s"}]' --numeric 123 --object '{"a":"b c","d":[1]}' --spaced "a bb ccc" --stringy abc --unknown '$HOME'"`,
		);
	});

	const roundTrips = {
		arrayOfArrays: {
			schema: z.array(z.array(z.string())),
			value: [["a", "b"], ["c"], []],
		},
		arrayOfBooleans: {
			schema: z.array(z.boolean()),
			value: [true, false, true],
		},
		arrayOfEnums: {
			schema: z.array(z.enum(["a", "b", "c"])),
			value: ["c", "a"],
		},
		arrayOfNumbers: {
			schema: z.array(z.number()),
			value: [1, -2.5, 3],
		},
		arrayOfObjects: {
			schema: z.array(z.object({ a: z.string() })),
			value: [{ a: "it's" }, { a: "-b" }],
		},
		arrayOfStrings: {
			schema: z.array(z.string()),
			value: ["a b", "-c", "--d", "", "it's"],
		},
		booleanFalse: {
			schema: z.boolean(),
			value: false,
		},
		booleanTrue: {
			schema: z.boolean(),
			value: true,
		},
		emptyJsonArray: {
			schema: z.array(z.boolean()),
			value: [],
		},
		enum: {
			schema: z.enum(["a", "b"]),
			value: "b",
		},
		integer: {
			schema: z.number().int(),
			value: 42,
		},
		literal: {
			schema: z.literal("abc"),
			value: "abc",
		},
		mixedChoice: {
			schema: z.union([z.literal("auto"), z.number()]),
			value: "auto",
		},
		mixedNumber: {
			schema: z.union([z.literal("auto"), z.number()]),
			value: -4,
		},
		number: {
			schema: z.number(),
			value: -1.5,
		},
		object: {
			schema: z.object({ alt: z.string(), src: z.string() }),
			value: { alt: `A "quoted" $logo`, src: "logo.png" },
		},
		record: {
			schema: z.record(z.string(), z.string()),
			value: { "my-bin": "./bin/index.js" },
		},
		string: {
			schema: z.string(),
			value: "abc",
		},
		stringDashed: {
			schema: z.string(),
			value: "-abc",
		},
		stringEmpty: {
			schema: z.string(),
			value: "",
		},
		stringSpecial: {
			schema: z.string(),
			value: 'it\'s a `$test` "with" \\ !special* characters;',
		},
		tuple: {
			schema: z.tuple([z.string(), z.number()]),
			value: ["a", 1],
		},
	};

	test.each(Object.entries(roundTrips))(
		"%s values are parsed back into the same value",
		(key, { schema, value }) => {
			const options = { [key]: schema };

			const args = splitWithShell(
				stringifyRerunArgs({ [key]: value }, options),
			);

			expect(parseOptionsArgs(args, options)).toEqual({
				issues: [],
				unknown: {},
				values: { [key]: value },
			});
		},
	);

	test("all values together are parsed back into the same values", () => {
		const options = Object.fromEntries(
			Object.entries(roundTrips).map(([key, { schema }]) => [key, schema]),
		);
		const values = Object.fromEntries(
			Object.entries(roundTrips).map(([key, { value }]) => [key, value]),
		);

		const args = splitWithShell(stringifyRerunArgs(values, options));

		expect(parseOptionsArgs(args, options)).toEqual({
			issues: [],
			unknown: {},
			values,
		});
	});
});
