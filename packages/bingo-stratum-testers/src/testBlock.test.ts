import { createBase } from "bingo-stratum";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { testBlock } from "./testBlock.js";

const base = createBase({
	options: {
		value: z.string(),
	},
});

const blockStandalone = base.createBlock({
	produce() {
		return {
			files: {
				"value.txt": "abc",
			},
		};
	},
});

describe(testBlock, () => {
	it("doesn't throw an error when settings isn't provided and the block uses no settings", () => {
		const actual = testBlock(blockStandalone);

		expect(actual).toEqual({ files: { "value.txt": "abc" } });
	});

	it("doesn't throw an error when settings is {} and the block uses no settings", () => {
		const actual = testBlock(blockStandalone, {});

		expect(actual).toEqual({ files: { "value.txt": "abc" } });
	});

	describe("props", () => {
		const blockUsingProps = base.createBlock({
			produce({ props }) {
				return {
					files: {
						"value.txt": props.value ?? "default",
					},
				};
			},
			props: {
				value: z.string().optional(),
			},
		});

		it("does not throw an error when props aren't provided and a block has props", () => {
			const actual = testBlock(blockUsingProps, {});

			expect(actual).toMatchInlineSnapshot(`
				{
				  "files": {
				    "value.txt": "default",
				  },
				}
			`);
		});

		it("passes props to the block when provided", () => {
			const actual = testBlock(blockUsingProps, {
				props: { value: "abc" },
			});

			expect(actual).toEqual({ files: { "value.txt": "abc" } });
		});
	});

	describe("options", () => {
		const blockUsingOptions = base.createBlock({
			produce({ options }) {
				return {
					files: {
						"value.txt": `${options.value} (${options.preset})`,
					},
				};
			},
		});

		it("throws an error when options isn't provided and a block uses options", () => {
			expect(() =>
				testBlock(blockUsingOptions),
			).toThrowErrorMatchingInlineSnapshot(
				`[Error: Context property 'options' was used by the Block but not provided.]`,
			);
		});

		it("passes options to the block when provided", () => {
			const actual = testBlock(blockUsingOptions, {
				options: { preset: "test", value: "abc" },
			});

			expect(actual).toEqual({
				files: { "value.txt": "abc (test)" },
			});
		});
	});
});
