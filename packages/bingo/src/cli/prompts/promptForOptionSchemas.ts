import { describeOptions } from "parse-standard-args";
import { promptForOptions } from "parse-standard-args/prompts";
import { z } from "zod";

import { AnyShape, InferredObject } from "../../types/shapes.js";
import { SystemContext } from "../../types/system.js";
import { Template } from "../../types/templates.js";

export type PromptedOptions<Options extends object> =
	| PromptedOptionsCancelled<Options>
	| PromptedOptionsProduced<Options>;

export interface PromptedOptionsCancelled<Options extends object> {
	cancelled: true;
	prompted: Partial<Options>;
}

export interface PromptedOptionsProduced<Options extends object> {
	cancelled: false;
	completed: Options;
	prompted: Partial<Options>;
}

export interface PromptForOptionsSettings<OptionsShape extends AnyShape> {
	existing: Partial<InferredObject<OptionsShape>>;
	system: SystemContext;
}

export async function promptForOptionSchemas<
	OptionsShape extends AnyShape,
	Refinements,
>(
	template: Template<OptionsShape, Refinements>,
	{ existing, system }: PromptForOptionsSettings<OptionsShape>,
): Promise<PromptedOptions<InferredObject<OptionsShape>>> {
	type Options = InferredObject<OptionsShape>;

	const result = await promptForOptions({
		flags: describeOptions(template.options),
		values: {
			directory: system.directory,
			...existing,
		},
	});

	if (result.cancelled) {
		return result as PromptedOptionsCancelled<Options>;
	}

	// Prompted values are kept as entered, so they can be suggested as CLI flags.
	// Templates are given their schemas' outputs, such as transformed values.
	const parsed = await Promise.all(
		Object.entries(result.prompted).map(async ([key, value]) => [
			key,
			await getSchemaOutput(template.options[key], value),
		]),
	);

	return {
		cancelled: false,
		completed: {
			...result.completed,
			...Object.fromEntries(parsed),
		} as Options,
		prompted: result.prompted as Partial<Options>,
	};
}

async function getSchemaOutput(schema: z.ZodType, value: unknown) {
	const result = await schema["~standard"].validate(value);

	return result.issues ? value : result.value;
}
