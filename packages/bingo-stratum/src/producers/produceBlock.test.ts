import { describe, expect, it } from "vitest";
import { z } from "zod";

import { createBase } from "../creators/createBase.js";
import { produceBlock } from "./produceBlock.js";

const base = createBase({
	options: {
		value: z.string(),
	},
});

const options = {
	value: "Hello, world!",
};

describe(produceBlock, () => {
	it("returns the creation when no Props or mode are defined", () => {
		const block = base.createBlock({
			produce({ options }) {
				return {
					files: { "README.md": options.value },
				};
			},
		});

		const actual = produceBlock(block, { options });

		expect(actual).toEqual({
			files: {
				"README.md": "Hello, world!",
			},
		});
	});

	it("passes Props to the Block when props is defined", () => {
		const block = base.createBlock({
			produce({ options, props }) {
				return {
					files: {
						"README.md": options.value,
						...props.extra,
					},
				};
			},
			props: {
				extra: z.record(z.string(), z.string()).optional(),
			},
		});

		const actual = produceBlock(block, {
			options,
			props: {
				extra: {
					"a.txt": "a",
				},
			},
		});

		expect(actual).toEqual({
			files: {
				"a.txt": "a",
				"README.md": "Hello, world!",
			},
		});
	});

	it("returns only the mode-specific creation when the Block has no produce", () => {
		const block = base.createBlock({
			setup() {
				return {
					files: { "extra.txt": "setup" },
				};
			},
		});

		const actual = produceBlock(block, { mode: "setup", options });

		expect(actual).toEqual({
			files: {
				"extra.txt": "setup",
			},
		});
	});

	it("augments the creation when mode is provided and the Block has that mode-specific producer", () => {
		const block = base.createBlock({
			produce({ options }) {
				return {
					files: { "README.md": options.value },
				};
			},
			setup() {
				return {
					files: { "extra.txt": "setup" },
				};
			},
		});

		const actual = produceBlock(block, {
			mode: "setup",
			options,
		});

		expect(actual).toEqual({
			files: {
				"extra.txt": "setup",
				"README.md": "Hello, world!",
			},
		});
	});
});
