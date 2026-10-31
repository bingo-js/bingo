import { describe, expect, it } from "vitest";
import { z } from "zod";

import { createBlock } from "./createBlock.js";

describe(createBlock, () => {
	describe("without Props", () => {
		it("produces nothing when the Block has no produce", () => {
			const block = createBlock<{ name: string }>({
				setup() {
					return { files: { "setup.txt": "setup" } };
				},
			});

			const production = block.produce({
				options: { name: "abc", preset: "test" },
			});

			expect(production).toEqual({});
		});

		it("produces without Props", () => {
			const block = createBlock<{ name: string }>({
				produce({ options }) {
					return {
						files: {
							"name.txt": `${options.name} (${options.preset})`,
						},
					};
				},
			});

			const production = block.produce({
				options: { name: "abc", preset: "test" },
			});

			expect(production).toEqual({
				files: {
					"name.txt": "abc (test)",
				},
			});
		});
	});

	describe("with Props", () => {
		it("produces nothing when the Block has no produce", () => {
			const block = createBlock<
				{ names: z.ZodDefault<z.ZodArray<z.ZodString>> },
				{ name: string }
			>({
				props: {
					names: z.array(z.string()).default([]),
				},
				setup() {
					return { files: { "setup.txt": "setup" } };
				},
			});

			const production = block.produce({
				options: { name: "abc", preset: "test" },
				props: { names: ["def"] },
			});

			expect(production).toEqual({});
		});

		it("snapshots with the Block's name when the Block has an about name", () => {
			const block = createBlock<
				{ names: z.ZodDefault<z.ZodArray<z.ZodString>> },
				{ name: string }
			>({
				about: { name: "Example" },
				produce: () => ({}),
				props: {
					names: z.array(z.string()).default([]),
				},
			});

			expect(block({ names: ["def"] })).toMatchInlineSnapshot(`
				{
				  "block": "[Block Example]",
				  "props": {
				    "names": [
				      "def",
				    ],
				  },
				}
			`);
		});

		it("snapshots the Block as-is when the Block has no about name", () => {
			const block = createBlock<
				{ names: z.ZodDefault<z.ZodArray<z.ZodString>> },
				{ name: string }
			>({
				produce: () => ({}),
				props: {
					names: z.array(z.string()).default([]),
				},
			});

			expect(block({ names: ["def"] })).toMatchInlineSnapshot(`
				{
				  "block": [Function],
				  "props": {
				    "names": [
				      "def",
				    ],
				  },
				}
			`);
		});

		it("applies Zod defaults when producing with Props", () => {
			const block = createBlock<
				{ names: z.ZodDefault<z.ZodArray<z.ZodString>> },
				{ name: string }
			>({
				produce({ options, props }) {
					const { names } = props;

					return {
						files: {
							"names.txt": [options.preset, options.name, ...names].join("\n"),
						},
					};
				},
				props: {
					names: z.array(z.string()).default([]),
				},
			});

			const production = block.produce({
				options: { name: "abc", preset: "test" },
				props: { names: ["def"] },
			});

			expect(production).toEqual({
				files: {
					"names.txt": "test\nabc\ndef",
				},
			});
		});

		it("throws when producing with an unknown Prop and the Block has an about name", () => {
			const block = createBlock<
				{ names: z.ZodDefault<z.ZodArray<z.ZodString>> },
				{ name: string }
			>({
				about: { name: "Example" },
				props: {
					names: z.array(z.string()).default([]),
				},
			});

			expect(() =>
				block.produce({
					options: { name: "abc", preset: "test" },
					props: { names: [], unknown: true } as { names: string[] },
				}),
			).toThrowErrorMatchingInlineSnapshot(
				`[Error: Unknown Prop(s) for Block Example: unknown.]`,
			);
		});

		it("throws when producing with an unknown Prop and the Block has no about name", () => {
			const block = createBlock<
				{ names: z.ZodDefault<z.ZodArray<z.ZodString>> },
				{ name: string }
			>({
				props: {
					names: z.array(z.string()).default([]),
				},
			});

			expect(() =>
				block.produce({
					options: { name: "abc", preset: "test" },
					props: { names: [], unknown: true } as { names: string[] },
				}),
			).toThrowErrorMatchingInlineSnapshot(
				`[Error: Unknown Prop(s) for Block: unknown.]`,
			);
		});

		it("produces Props for another Block", () => {
			const blockReceiving = createBlock<
				{ names: z.ZodDefault<z.ZodArray<z.ZodString>> },
				{ name: string }
			>({
				produce() {
					return {};
				},
				props: {
					names: z.array(z.string()).default([]),
				},
			});
			const blockProviding = createBlock<{ name: string }>({
				produce() {
					return {
						extensions: [blockReceiving({ names: ["def"] })],
					};
				},
			});

			const production = blockProviding.produce({
				options: { name: "abc", preset: "test" },
			});

			expect(production).toEqual({
				extensions: [{ block: blockReceiving, props: { names: ["def"] } }],
			});
		});
	});
});
