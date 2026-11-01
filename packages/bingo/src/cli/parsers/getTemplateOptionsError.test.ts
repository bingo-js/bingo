import { describe, expect, it } from "vitest";
import { z } from "zod";

import { getTemplateOptionsError } from "./getTemplateOptionsError.js";

function createSchemaWithoutJsonSchema() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { jsonSchema, ...standard } = z.string()["~standard"];

	return { "~standard": standard } as unknown as z.ZodType;
}

describe(getTemplateOptionsError, () => {
	it("returns undefined when options support Standard JSON Schema", () => {
		const actual = getTemplateOptionsError({
			count: z.number(),
			title: z.string(),
		});

		expect(actual).toBeUndefined();
	});

	it("returns an error naming outdated options when options don't support Standard JSON Schema", () => {
		const actual = getTemplateOptionsError({
			count: createSchemaWithoutJsonSchema(),
			description: z.string(),
			title: createSchemaWithoutJsonSchema(),
		});

		expect(actual).toEqual(
			new Error(
				"This template's options must be created with Zod 4.2 or newer, but these were created with an older version: --count, --title.\nUpdate the template's zod dependency to ^4.2.0 or newer.",
			),
		);
	});

	it("returns an error with the cause's message when options otherwise can't be described", () => {
		const standard = z.string()["~standard"];
		const actual = getTemplateOptionsError({
			title: {
				"~standard": {
					...standard,
					jsonSchema: {
						...standard.jsonSchema,
						input: () => {
							throw new Error("Oh no!");
						},
					},
				},
			} as unknown as z.ZodType,
		});

		expect(actual?.message).toMatch(
			/^This template's options could not be read as CLI flags: Could not convert a schema from zod to JSON Schema \(Oh no!\)/,
		);
	});
});
