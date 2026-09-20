import { CreatedDirectory } from "bingo-fs";
import { stripVTControlCharacters } from "node:util";
import c from "tinyrainbow";
import { describe, expect, test } from "vitest";

import {
	diffCreatedDirectory,
	DiffedCreatedDirectory,
} from "./diffCreatedDirectory.js";

function withoutColors(value: unknown): unknown {
	if (typeof value === "string") {
		return stripVTControlCharacters(value);
	}

	if (Array.isArray(value)) {
		return value.map(withoutColors);
	}

	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).map(([key, inner]) => [key, withoutColors(inner)]),
		);
	}

	return value;
}

describe("diffCreatedDirectory", () => {
	test.each([
		[{}, {}, undefined],
		[{}, { a: "" }, { a: "" }],
		[{}, { a: { b: "" } }, { a: { b: "" } }],
		[{ a: "" }, { a: "" }, undefined],
		[
			{ a: "" },
			{ a: "b\n" },
			{
				a: `+ b
+`,
			},
		],
		[{ a: "b\n" }, { a: "b\n" }, undefined],
		[
			{ a: "abc\n" },
			{ a: "bbc\n" },
			{
				a: `- abc
+ bbc
`,
			},
		],
		[{ a: "b\n" }, {}, undefined],
		[{ a: "" }, { a: [""] }, undefined],
		[{ a: "" }, { a: ["", { executable: undefined }] }, undefined],
		[{ a: "" }, { a: ["", { executable: true }] }, undefined],
		[{ a: [""] }, { a: ["", { executable: false }] }, undefined],
		[{ a: [""] }, { a: ["", { executable: true }] }, undefined],
		[
			{ a: ["", { executable: undefined }] },
			{ a: ["", { executable: undefined }] },
			undefined,
		],
		[
			{ a: ["", { executable: undefined }] },
			{ a: ["", { executable: true }] },
			undefined,
		],
		[
			{ a: ["", { executable: true }] },
			{ a: ["", { executable: true }] },
			undefined,
		],
		[{ a: ["", { executable: true }] }, { a: [""] }, undefined],
		[{ a: ["", { executable: true }] }, { a: ["", {}] }, undefined],
		[
			{ a: ["", { executable: true }] },
			{ a: ["", { executable: undefined }] },
			undefined,
		],
		[
			{ a: ["", { executable: true }] },
			{ a: ["", { executable: false }] },
			{
				a: [
					undefined,
					{
						executable: `- true
+ false`,
					},
				],
			},
		],
		[
			{ a: "" },
			{ a: { b: {} } },
			{ a: "Mismatched a: actual is string; created is object." },
		],
		[
			{ a: [""] },
			{ a: { b: {} } },
			{ a: "Mismatched a: actual is created file; created is object." },
		],
		[{ a: [""] }, { a: "" }, undefined],
		[
			{ a: ["b\n"] },
			{ a: "" },
			{
				a: `- b
-`,
			},
		],
		[
			{ a: { b: {} } },
			{ a: "" },
			{ a: "Mismatched a: actual is object; created is string." },
		],
		[
			{ a: { b: {} } },
			{ a: [""] },
			{ a: "Mismatched a: actual is object; created is created file." },
		],
		[{ a: "" }, { a: [""] }, undefined],
		[{ a: { b: "c\n" } }, {}, undefined],
		[{ a: { b: "c\n" } }, { b: {} }, undefined],
		[{ a: { b: "c\n" } }, { a: { b: "c\n" } }, undefined],
		[
			{ a: { b: "c\n" } },
			{ a: { b: "d\n" } },
			{
				a: {
					b: `- c
+ d
`,
				},
			},
		],
		[{ a: { b: "c\n" } }, { a: { d: "e\n" } }, { a: { d: "e\n" } }],
		[
			{ a: { b: { c: undefined } } },
			{ a: { b: { c: { d: "e\n" } } } },
			{ a: { b: { c: { d: "e\n" } } } },
		],
		[
			{ a: { b: { c: { d: "e\n" } } } },
			{ a: { b: { c: undefined } } },
			undefined,
		],
		[{ a: { b: "c\n" } }, { a: { d: "e\n" } }, { a: { d: "e\n" } }],
		[
			{ a: { b: { c: { d: "e\n" } } } },
			{ a: { b: { f: "g\n" } } },
			{ a: { b: { f: "g\n" } } },
		],
	] satisfies [
		CreatedDirectory,
		CreatedDirectory,
		DiffedCreatedDirectory | undefined,
	][])("%j and %j", (actual, created, expected) => {
		expect(withoutColors(diffCreatedDirectory(actual, created))).toEqual(
			expected,
		);
	});

	test("processes text with a processText option", () => {
		const actual = diffCreatedDirectory(
			{ a: "b\n" },
			{ a: "b\n\n" },
			{ processText: (text) => text.trim() },
		);

		expect(actual).toBeUndefined();
	});

	describe("colors", () => {
		test("colors removed and added lines", () => {
			const actual = diffCreatedDirectory({ a: "b\n" }, { a: "c\n" });

			expect(actual).toEqual({
				a: [c.red("- b"), c.green("+ c"), ""].join("\n"),
			});
		});

		test("highlights the changed segments within lines", () => {
			const actual = diffCreatedDirectory(
				{ a: "const value = 123;\nunchanged\n" },
				{ a: "const value = 456;\nunchanged\n" },
			);

			expect(actual).toEqual({
				a: [
					c.red(`- const value = ${c.inverse("123")};`),
					c.green(`+ const value = ${c.inverse("456")};`),
					c.dim("  unchanged"),
					"",
				].join("\n"),
			});
		});

		test("colors metadata diffs", () => {
			const actual = diffCreatedDirectory(
				{ a: ["", { executable: true }] },
				{ a: ["", { executable: false }] },
			);

			expect(actual).toEqual({
				a: [
					undefined,
					{
						executable: [
							c.red(`- ${c.inverse("tru")}e`),
							// cspell:disable-next-line
							c.green(`+ ${c.inverse("fals")}e`),
						].join("\n"),
					},
				],
			});
		});
	});
});
