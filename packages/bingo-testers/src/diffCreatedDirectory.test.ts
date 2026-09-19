import { CreatedDirectory } from "bingo-fs";
import { styleText } from "node:util";
import { describe, expect, test } from "vitest";

import {
	diffCreatedDirectory,
	DiffedCreatedDirectory,
} from "./diffCreatedDirectory.js";

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
				a: `@@ -0,0 +1,1 @@
+b
`,
			},
		],
		[{ a: "b\n" }, { a: "b\n" }, undefined],
		[
			{ a: "abc\n" },
			{ a: "bbc\n" },
			{
				a: `@@ -1,1 +1,1 @@
-abc
+bbc
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
						executable: `@@ -1,1 +1,1 @@
-true
\\ No newline at end of file
+false
\\ No newline at end of file
`,
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
				a: `@@ -1,1 +0,0 @@
-b
`,
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
					b: `@@ -1,1 +1,1 @@
-c
+d
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
		expect(diffCreatedDirectory(actual, created, (text) => text)).toEqual(
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
		const escape = "\u001b[";
		const color = (style: Parameters<typeof styleText>[0], text: string) =>
			styleText(style, text, { validateStream: false });
		const cyan = (text: string) => color("cyan", text);
		const dim = (text: string) => color("dim", text);
		const green = (text: string) => color("green", text);
		const inverse = (text: string) => color("inverse", text);
		const red = (text: string) => color("red", text);

		test.each([
			[{ a: "b\n" }, { a: "c\n" }, undefined],
			[{ a: "b\n" }, { a: "c\n" }, { colors: false }],
			[{ a: "b\n" }, { a: "c\n" }, (text: string) => text],
			[{ a: "b\n" }, { a: "c\n" }, { processText: (text: string) => text }],
			[
				{ a: ["", { executable: true }] },
				{ a: ["", { executable: false }] },
				{},
			],
		] satisfies [
			CreatedDirectory,
			CreatedDirectory,
			Parameters<typeof diffCreatedDirectory>[2],
		][])(
			"does not add colors for %j, %j, and %s",
			(actual, created, options) => {
				const diffed = diffCreatedDirectory(actual, created, options);

				expect(diffed).toBeDefined();
				expect(JSON.stringify(diffed)).not.toContain(escape);
			},
		);

		test.each([
			[{ a: "b\n" }, { a: "b\n" }, undefined],
			[
				{ a: "b\n" },
				{ a: "" },
				{
					a: [cyan("@@ -1,1 +0,0 @@"), red("-b"), ""].join("\n"),
				},
			],
			[
				{ a: "" },
				{ a: "b\n" },
				{
					a: [cyan("@@ -0,0 +1,1 @@"), green("+b"), ""].join("\n"),
				},
			],
			[
				{ a: "const value = 123;\n" },
				{ a: "const value = 456;\n" },
				{
					a: [
						cyan("@@ -1,1 +1,1 @@"),
						red(`-const value = ${inverse("123")};`),
						green(`+const value = ${inverse("456")};`),
						"",
					].join("\n"),
				},
			],
			[
				{ a: "a b\n" },
				{ a: "a  b\n" },
				{
					a: [
						cyan("@@ -1,1 +1,1 @@"),
						red(`-a${inverse(" ")}b`),
						green(`+a${inverse("  ")}b`),
						"",
					].join("\n"),
				},
			],
			[
				{ a: "first\nunchanged\nsecond line\n" },
				{ a: "first!\nunchanged\nsecond change\n" },
				{
					a: [
						cyan("@@ -1,3 +1,3 @@"),
						red("-first"),
						green(`+first${inverse("!")}`),
						" unchanged",
						red(`-second ${inverse("line")}`),
						green(`+second ${inverse("change")}`),
						"",
					].join("\n"),
				},
			],
			[
				{ a: "one 1\ntwo 2\nthree 3\n" },
				{ a: "one 4\ntwo 5\n" },
				{
					a: [
						cyan("@@ -1,3 +1,2 @@"),
						red(`-one ${inverse("1")}`),
						red(`-two ${inverse("2")}`),
						red("-three 3"),
						green(`+one ${inverse("4")}`),
						green(`+two ${inverse("5")}`),
						"",
					].join("\n"),
				},
			],
			[
				{ a: "one 1\n" },
				{ a: "one 2\ntwo 3\n" },
				{
					a: [
						cyan("@@ -1,1 +1,2 @@"),
						red(`-one ${inverse("1")}`),
						green(`+one ${inverse("2")}`),
						green("+two 3"),
						"",
					].join("\n"),
				},
			],
			[
				{ a: "b" },
				{ a: "c" },
				{
					a: [
						cyan("@@ -1,1 +1,1 @@"),
						red(`-${inverse("b")}`),
						dim("\\ No newline at end of file"),
						green(`+${inverse("c")}`),
						dim("\\ No newline at end of file"),
						"",
					].join("\n"),
				},
			],
			[
				{ a: "-a\n+b\n@@ c\n\\ d\n" },
				{ a: "-a\n+b\n@@ c\n\\ d\ne\n" },
				{
					a: [
						cyan("@@ -1,4 +1,5 @@"),
						" -a",
						" +b",
						" @@ c",
						" \\ d",
						green("+e"),
						"",
					].join("\n"),
				},
			],
			[
				{ a: "a 1\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk 2\n" },
				{ a: "a 3\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk 4\n" },
				{
					a: [
						cyan("@@ -1,5 +1,5 @@"),
						red(`-a ${inverse("1")}`),
						green(`+a ${inverse("3")}`),
						" b",
						" c",
						" d",
						" e",
						cyan("@@ -7,5 +7,5 @@"),
						" g",
						" h",
						" i",
						" j",
						red(`-k ${inverse("2")}`),
						green(`+k ${inverse("4")}`),
						"",
					].join("\n"),
				},
			],
			[
				{ a: "a 1\nb 2" },
				{ a: "a 3\nb 4" },
				{
					a: [
						cyan("@@ -1,2 +1,2 @@"),
						red(`-a ${inverse("1")}`),
						red(`-b ${inverse("2")}`),
						dim("\\ No newline at end of file"),
						green(`+a ${inverse("3")}`),
						green(`+b ${inverse("4")}`),
						dim("\\ No newline at end of file"),
						"",
					].join("\n"),
				},
			],
			[
				{ a: ["", { executable: true }] },
				{ a: ["", { executable: false }] },
				{
					a: [
						undefined,
						{
							executable: [
								cyan("@@ -1,1 +1,1 @@"),
								red(`-${inverse("true")}`),
								dim("\\ No newline at end of file"),
								green(`+${inverse("false")}`),
								dim("\\ No newline at end of file"),
								"",
							].join("\n"),
						},
					],
				},
			],
		] satisfies [
			CreatedDirectory,
			CreatedDirectory,
			DiffedCreatedDirectory | undefined,
		][])("adds colors for %j and %j", (actual, created, expected) => {
			expect(diffCreatedDirectory(actual, created, { colors: true })).toEqual(
				expected,
			);
		});

		test("does not highlight segments within lines when their diff times out", () => {
			const createLine = (seed: string) =>
				Array.from({ length: 5000 }, (_, i) => seed + i.toString()).join(" ");

			const actual = diffCreatedDirectory(
				{ a: `${createLine("a")}\n` },
				{ a: `${createLine("b")}\n` },
				{ colors: true },
			);

			expect(actual).toEqual({
				a: [
					cyan("@@ -1,1 +1,1 @@"),
					red(`-${createLine("a")}`),
					green(`+${createLine("b")}`),
					"",
				].join("\n"),
			});
		});

		test("uses basic 16-color ANSI codes when colors are enabled", () => {
			const actual = diffCreatedDirectory(
				{ a: "b 1\n" },
				{ a: "b 2\n" },
				{ colors: true },
			);

			expect(actual).toEqual({
				a: [
					`${escape}36m@@ -1,1 +1,1 @@${escape}39m`,
					`${escape}31m-b ${escape}7m1${escape}27m${escape}39m`,
					`${escape}32m+b ${escape}7m2${escape}27m${escape}39m`,
					"",
				].join("\n"),
			});
		});
	});
});
