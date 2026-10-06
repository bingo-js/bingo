import { describeOptions } from "parse-standard-args";

import { AnyShape } from "../../types/shapes.js";

/**
 * Checks whether a template's options can be described as CLI flags.
 * Option schemas must support Standard JSON Schema, as Zod does as of 4.2.
 * @param options Options shape from a template.
 * @returns An Error explaining why the options can't be used, if they can't.
 */
export function getTemplateOptionsError(options: AnyShape) {
	try {
		describeOptions(options);
		return undefined;
	} catch (error) {
		const outdated = Object.entries(options)
			.filter(([, schema]) => !("jsonSchema" in schema["~standard"]))
			.map(([key]) => `--${key}`);

		return new Error(
			outdated.length
				? `This template's options must be created with Zod 4.2 or newer, but these were created with an older version: ${outdated.join(", ")}.\nUpdate the template's zod dependency to ^4.2.0 or newer.`
				: `This template's options could not be read as CLI flags: ${error instanceof Error ? error.message : String(error)}`,
			{ cause: error },
		);
	}
}
