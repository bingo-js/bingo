import { describe, expect, it } from "vitest";
import { z } from "zod";

import { createBase } from "./createBase.js";

const base = createBase({
	options: { name: z.string() },
});

describe(createBase, () => {
	describe("createBlock", () => {
		describe("without Props", () => {
			it("produces without Props", () => {
				const block = base.createBlock({
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
			it("applies Zod defaults when producing with Props", () => {
				const block = base.createBlock({
					produce({ options, props }) {
						const { names } = props;

						return {
							files: {
								"names.txt": [options.preset, options.name, ...names].join(
									"\n",
								),
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
		});
	});
});
