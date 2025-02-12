import { NativeSystem } from "bingo-systems";

import { createSystemContextWithAuth } from "../contexts/createSystemContextWithAuth.js";
import { mergeCreations } from "../mergers/mergeCreations.js";
import { AnyShape, InferredObject } from "../options.js";
import { Creation } from "../types/creations.js";
import { ProductionMode } from "../types/modes.js";
import { Template } from "../types/templates.js";

export interface ProduceTemplateSettings<OptionsShape extends AnyShape>
	extends Partial<NativeSystem> {
	directory?: string;
	mode?: ProductionMode;
	offline?: boolean;
	options: InferredObject<OptionsShape>;
}

export async function produceTemplate<OptionsShape extends AnyShape>(
	template: Template<OptionsShape>,
	settings: ProduceTemplateSettings<OptionsShape>,
): Promise<Partial<Creation>> {
	const system = await createSystemContextWithAuth({
		directory: ".",
		...settings,
	});

	const context = {
		...system,
		options: settings.options,
	};

	let creation = template.produce(context);

	// From engine/runtime/execution.md:
	// 2.2. If a mode is specified, additionally generate the appropriate Block Creations
	const augmenter = settings.mode && template[settings.mode];
	if (augmenter) {
		creation = mergeCreations(creation, augmenter(context));
	}

	return creation;
}
