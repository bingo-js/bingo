import { describe, expect, it } from "vitest";
import { z } from "zod";

import { getSchemaDescription } from "./getSchemaDescription.js";

describe(getSchemaDescription, () => {
	it("returns undefined when the schema has no description", () => {
		const actual = getSchemaDescription(z.string());

		expect(actual).toBeUndefined();
	});

	it("returns the description when the schema is described", () => {
		const actual = getSchemaDescription(z.string().describe("abc"));

		expect(actual).toBe("abc");
	});

	it("returns the inner description when the described schema has a default", () => {
		const actual = getSchemaDescription(z.string().describe("abc").default(""));

		expect(actual).toBe("abc");
	});

	it("returns the inner description when the described schema is optional", () => {
		const actual = getSchemaDescription(z.string().describe("abc").optional());

		expect(actual).toBe("abc");
	});

	it("returns the outer description when both the schema and its inner schema are described", () => {
		const actual = getSchemaDescription(
			z.string().describe("inner").default("").describe("outer"),
		);

		expect(actual).toBe("outer");
	});
});
