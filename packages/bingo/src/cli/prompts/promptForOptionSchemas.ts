import { describeOptions } from "parse-standard-args";
import { promptForOptions } from "parse-standard-args/prompts";

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
	return (await promptForOptions({
		flags: describeOptions(template.options),
		values: {
			directory: system.directory,
			...existing,
		},
	})) as PromptedOptions<InferredObject<OptionsShape>>;
}
