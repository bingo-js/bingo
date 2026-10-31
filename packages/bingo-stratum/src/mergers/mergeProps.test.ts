import { describe, expect, it, test, vi } from "vitest";

import { BlockWithProps } from "../types/blocks.js";
import { mergeExtensions } from "./mergeProps.js";

const blockFirst: BlockWithProps<object, object> = Object.assign(vi.fn(), {
	about: { name: "Block First" },
	produce: vi.fn(),
});

const blockSecond: BlockWithProps<object, object> = Object.assign(vi.fn(), {
	about: { name: "BlockSecond" },
	produce: vi.fn(),
});

const sharedObject = { value: true };

describe(mergeExtensions, () => {
	test.each([
		[
			[{ block: blockFirst, props: [null] }],
			[{ block: blockFirst, props: [undefined] }],
			[{ block: blockFirst, props: [] }],
		],
		[
			[{ block: blockFirst, props: ["a"] }],
			[{ block: blockFirst, props: [123] }],
			[{ block: blockFirst, props: ["a", 123] }],
		],
		[
			[{ block: blockFirst, props: ["a"] }],
			[{ block: blockFirst, props: ["b"] }],
			[{ block: blockFirst, props: ["a", "b"] }],
		],
		[
			[{ block: blockFirst, props: ["a", "b"] }],
			[{ block: blockFirst, props: ["b"] }],
			[{ block: blockFirst, props: ["a", "b"] }],
		],
		[
			[{ block: blockFirst, props: ["a", "b"] }],
			[{ block: blockFirst, props: ["b", "c"] }],
			[{ block: blockFirst, props: ["a", "b", "c"] }],
		],
		[
			[{ block: blockFirst, props: ["a", "b"] }],
			[{ block: blockFirst, props: ["b", "c", "d"] }],
			[{ block: blockFirst, props: ["a", "b", "c", "d"] }],
		],
		[
			[{ block: blockFirst, props: ["a"] }],
			[{ block: blockFirst, props: [null] }],
			[{ block: blockFirst, props: ["a"] }],
		],
		[
			[{ block: blockFirst, props: ["a", undefined, null, "b"] }],
			[{ block: blockFirst, props: [null] }],
			[{ block: blockFirst, props: ["a", "b"] }],
		],
		[
			[{ block: blockFirst, props: ["a"] }],
			[{ block: blockSecond, props: ["a"] }],
			[
				{ block: blockFirst, props: ["a"] },
				{ block: blockSecond, props: ["a"] },
			],
		],
		[
			[{ block: blockFirst, props: [{ values: ["a"] }] }],
			[{ block: blockFirst, props: [{ values: ["a"] }] }],
			[{ block: blockFirst, props: [{ values: ["a"] }] }],
		],
		[
			[{ block: blockFirst, props: [{ values: ["a", { b: "c" }] }] }],
			[{ block: blockFirst, props: [{ values: ["a", { b: "c" }] }] }],
			[{ block: blockFirst, props: [{ values: ["a", { b: "c" }] }] }],
		],
		[
			[{ block: blockFirst, props: [{ value: {} }] }],
			[{ block: blockFirst, props: [{ value: { inner: true } }] }],
			[
				{
					block: blockFirst,
					props: [{ value: {} }, { value: { inner: true } }],
				},
			],
		],
		[
			[{ block: blockFirst, props: [{ value: { inner: true } }] }],
			[{ block: blockFirst, props: [{ value: {} }] }],
			[
				{
					block: blockFirst,
					props: [{ value: { inner: true } }, { value: {} }],
				},
			],
		],
		[
			[{ block: blockFirst, props: [{ value: { inner: true } }] }],
			[{ block: blockFirst, props: [{ value: [true] }] }],
			[
				{
					block: blockFirst,
					props: [{ value: { inner: true } }, { value: [true] }],
				},
			],
		],
		[
			[{ block: blockFirst, props: [{ value: { inner: false } }] }],
			[{ block: blockFirst, props: [{ value: { inner: true } }] }],
			[
				{
					block: blockFirst,
					props: [{ value: { inner: false } }, { value: { inner: true } }],
				},
			],
		],
		[
			[{ block: blockFirst, props: [sharedObject] }],
			[{ block: blockFirst, props: [sharedObject] }],
			[{ block: blockFirst, props: [sharedObject] }],
		],
		[
			[
				{
					block: blockFirst,
					props: [{ name: "First", steps: ["a", "b"] }],
				},
			],
			[
				{
					block: blockFirst,
					props: [{ name: "Second", steps: ["c", "d"] }],
				},
			],
			[
				{
					block: blockFirst,
					props: [
						{ name: "First", steps: ["a", "b"] },
						{ name: "Second", steps: ["c", "d"] },
					],
				},
			],
		],
		[
			[
				{
					block: blockFirst,
					props: [
						{ name: "First", steps: ["a", "b"] },
						{ name: "Second", steps: ["c", "d"] },
					],
				},
			],
			[
				{
					block: blockFirst,
					props: [
						{ name: "Second", steps: ["c", "d"] },
						{ name: "Third", steps: ["e", "f"] },
					],
				},
			],
			[
				{
					block: blockFirst,
					props: [
						{ name: "First", steps: ["a", "b"] },
						{ name: "Second", steps: ["c", "d"] },
						{ name: "Third", steps: ["e", "f"] },
					],
				},
			],
		],
		[
			[{ block: blockFirst, props: { files: ["a"] } }],
			[{ block: blockFirst, props: { files: ["b"] } }],
			[{ block: blockFirst, props: { files: ["a", "b"] } }],
		],
		[
			[{ block: blockFirst, props: { files: ["a", "b"] } }],
			[{ block: blockFirst, props: { files: ["b", "c"] } }],
			[{ block: blockFirst, props: { files: ["a", "b", "c"] } }],
		],
		[
			[{ block: blockFirst, props: { first: ["a"] } }],
			[{ block: blockFirst, props: { second: ["b"] } }],
			[{ block: blockFirst, props: { first: ["a"], second: ["b"] } }],
		],
		[
			[{ block: blockFirst, props: { nested: { values: ["a"] } } }],
			[{ block: blockFirst, props: { nested: { values: ["b"] } } }],
			[{ block: blockFirst, props: { nested: { values: ["a", "b"] } } }],
		],
		[
			[{ block: blockFirst, props: { value: "first" } }],
			[{ block: blockFirst, props: { value: "second" } }],
			[{ block: blockFirst, props: { value: "first" } }],
		],
	])("%j and %j", (first, second, expected) => {
		expect(mergeExtensions(first, second)).toEqual(expected);
	});

	it("snapshots merged props with their Block's name", () => {
		const actual = mergeExtensions(
			[{ block: blockFirst, props: ["a"] }],
			[{ block: blockFirst, props: ["b"] }],
		);

		expect(actual).toMatchInlineSnapshot(`
			[
			  {
			    "block": "[Block Block First]",
			    "props": [
			      "a",
			      "b",
			    ],
			  },
			]
		`);
	});
});
