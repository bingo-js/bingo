import { IntakeFileEntry } from "bingo-fs";
import { describe, expect, it, test, vi } from "vitest";
import { z } from "zod";

import { createBase } from "../creators/createBase.js";
import { produceBlocks } from "./produceBlocks.js";

const base = createBase({
	options: {
		value: z.string(),
	},
});

describe(produceBlocks, () => {
	test("files from one block", () => {
		const block = base.createBlock({
			about: {
				name: "Example Block",
			},
			produce({ options }) {
				return {
					files: { "README.md": options.value },
				};
			},
		});

		const result = produceBlocks([block], {
			options: { value: "Hello, world!" },
		});

		expect(result).toEqual({
			files: {
				"README.md": "Hello, world!",
			},
		});
	});

	it("adds props when provided only under blockExtensions", () => {
		const block = base.createBlock({
			about: {
				name: "Example Block",
			},
			produce({ options, props }) {
				return {
					files: { "README.md": [options.value, props.extra].join("\n") },
				};
			},
			props: {
				extra: z.string().optional(),
			},
		});

		const result = produceBlocks([block], {
			blockExtensions: [block({ extra: "line" })],
			options: { value: "Hello, world!" },
		});

		expect(result).toEqual({
			files: {
				"README.md": "Hello, world!\nline",
			},
		});
	});

	it("adds props when provided only via Block intake", () => {
		const block = base.createBlock({
			about: {
				name: "Example Block",
			},
			intake({ files }) {
				return {
					extra: (files["README.md"] as IntakeFileEntry)[0].split("\n").at(-1),
				};
			},
			produce({ options, props }) {
				return {
					files: { "README.md": [options.value, props.extra].join("\n") },
				};
			},
			props: {
				extra: z.string().optional(),
			},
		});

		const result = produceBlocks([block], {
			files: {
				"README.md": ["Before\nline"],
			},
			options: { value: "Hello, world!" },
		});

		expect(result).toEqual({
			files: {
				"README.md": "Hello, world!\nline",
			},
		});
	});

	it("merges props when provided by Block intake and blockExtensions", () => {
		const block = base.createBlock({
			about: {
				name: "Example Block",
			},
			intake() {
				return {
					a: "intake a",
					b: "intake b",
				};
			},
			produce({ options, props }) {
				return {
					files: {
						"README.md": [options.value, props.a, props.b, props.c].join("\n"),
					},
				};
			},
			props: {
				a: z.string().optional(),
				b: z.string().optional(),
				c: z.string().optional(),
			},
		});

		const result = produceBlocks([block], {
			blockExtensions: [
				block({
					b: "provided b",
					c: "provided c",
				}),
			],
			options: { value: "Hello, world!" },
		});

		expect(result).toEqual({
			files: {
				"README.md": "Hello, world!\nintake a\nprovided b\nprovided c",
			},
		});
	});

	it("doesn't include props to blocks that aren't defined", () => {
		const blockKnown = base.createBlock({
			about: {
				name: "Known Block",
			},
			produce({ options }) {
				return {
					extensions: [blockUnknown({ extra: "line" })],
					files: { "README.md": options.value },
				};
			},
		});

		const blockUnknown = base.createBlock({
			about: {
				name: "Unknown Block",
			},
			produce: vi.fn(),
			props: {
				extra: z.string().optional(),
			},
		});

		const result = produceBlocks([blockKnown], {
			options: { value: "Hello, world!" },
		});

		expect(result).toEqual({
			extensions: [blockUnknown({ extra: "line" })],
			files: {
				"README.md": "Hello, world!",
			},
		});
	});

	it("merges props produced by a Block into another Block's existing props", () => {
		const blockReceiving = base.createBlock({
			about: {
				name: "Receiving Block",
			},
			produce({ props }) {
				return {
					files: { "README.md": props.lines.join("\n") },
				};
			},
			props: {
				lines: z.array(z.string()).default([]),
			},
		});

		const blockProducing = base.createBlock({
			about: {
				name: "Producing Block",
			},
			produce() {
				return {
					extensions: [blockReceiving({ lines: ["b", "c"] })],
				};
			},
		});

		const result = produceBlocks([blockReceiving, blockProducing], {
			blockExtensions: [blockReceiving({ lines: ["a", "b"] })],
			options: { value: "Hello, world!" },
		});

		expect(result).toEqual({
			extensions: [blockReceiving({ lines: ["b", "c"] })],
			files: {
				"README.md": "a\nb\nc",
			},
		});
	});

	it("throws an error when a Block produces extensions that conflict with another Block's existing props", () => {
		const blockReceiving = base.createBlock({
			about: {
				name: "Receiving Block",
			},
			produce({ props }) {
				return {
					files: { "README.md": props.nested?.value },
				};
			},
			props: {
				nested: z.object({ value: z.string() }).optional(),
			},
		});

		const blockProducingFirst = base.createBlock({
			about: {
				name: "First Producing Block",
			},
			produce() {
				return {
					extensions: [blockReceiving({ nested: { value: "a" } })],
				};
			},
		});

		const blockProducingSecond = base.createBlock({
			about: {
				name: "Second Producing Block",
			},
			produce() {
				return {
					extensions: [blockReceiving({ nested: { value: "b" } })],
				};
			},
		});

		expect(() =>
			produceBlocks(
				[blockReceiving, blockProducingFirst, blockProducingSecond],
				{ options: { value: "Hello, world!" } },
			),
		).toThrowError(
			`Could not merge the props from Block Second Producing Block's extension into Block Receiving Block. Mismatched props at 'nested.value': existing 'a' vs. new 'b'.`,
		);
	});

	it("describes Blocks as anonymous in merge errors when they don't have names", () => {
		const blockReceiving = base.createBlock({
			produce({ props }) {
				return {
					files: { "README.md": props.value },
				};
			},
			props: {
				value: z.string().optional(),
			},
		});

		const blockProducing = base.createBlock({
			produce() {
				return {
					extensions: [blockReceiving({ value: "b" })],
				};
			},
		});

		expect(() =>
			produceBlocks([blockReceiving, blockProducing], {
				blockExtensions: [blockReceiving({ value: "a" })],
				options: { value: "Hello, world!" },
			}),
		).toThrowError(
			`Could not merge the props from Block (anonymous)'s extension into Block (anonymous). Mismatched props at 'value': existing 'a' vs. new 'b'.`,
		);
	});

	describe("modes", () => {
		const block = base.createBlock({
			about: {
				name: "Example Block",
			},
			produce({ options }) {
				return {
					files: { "README.md": options.value },
				};
			},
			setup({ options }) {
				return {
					files: {
						"data.txt": options.value,
					},
				};
			},
			transition() {
				return {
					scripts: ["rm old.txt"],
				};
			},
		});

		it("does not augment creations with a Block's setup() or transition() when mode is undefined", () => {
			const result = produceBlocks([block], {
				options: { value: "Hello, world!" },
			});

			expect(result).toEqual({
				files: {
					"README.md": "Hello, world!",
				},
			});
		});

		it("augments creations with a Block's setup() when mode is 'setup'", () => {
			const result = produceBlocks([block], {
				mode: "setup",
				options: { value: "Hello, world!" },
			});

			expect(result).toEqual({
				files: {
					"data.txt": "Hello, world!",
					"README.md": "Hello, world!",
				},
			});
		});

		it("augments creations with a Block's transition() when mode is 'transition'", () => {
			const result = produceBlocks([block], {
				mode: "transition",
				options: { value: "Hello, world!" },
			});

			expect(result).toEqual({
				files: {
					"README.md": "Hello, world!",
				},
				scripts: ["rm old.txt"],
			});
		});
	});
});
