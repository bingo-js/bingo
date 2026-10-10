import { ProductionMode } from "bingo";
import {
	BlockWithoutProps,
	BlockWithProps,
	produceBlock,
	ProduceBlockSettingsWithProps,
} from "bingo-stratum";
import { BlockCreation } from "bingo-stratum/lib/types/creations.js";
import { StratumTemplateOptions } from "bingo-stratum/lib/types/templates.js";

import { createFailingObject } from "./utils.js";

export interface BlockContextSettingsWithOptionalProps<
	Props extends object,
	Options extends object,
> extends BlockContextSettingsWithoutProps<Options> {
	props?: Partial<Props>;
}

export interface BlockContextSettingsWithoutProps<Options extends object> {
	/**
	 * Which repository mode Bingo to simulate being run in.
	 * @see {@link https://create.bingo/build/concepts/modes}
	 */
	mode?: ProductionMode;

	/**
	 * Whether to simulate being run in an "offline" mode.
	 * @see {@link http://create.bingo/build/details/contexts#options-offline}
	 */
	offline?: boolean;

	/**
	 * Any options values as described by the Block's Base's options schema, as well as preset.
	 */
	options?: Options & StratumTemplateOptions;
}

/**
 * Simulates running a Block in-memory for tests.
 * @see {@link https://www.create.bingo/engines/stratum/packages/bingo-stratum-testers/#testblock}
 */
export function testBlock<Props extends object, Options extends object>(
	block: BlockWithProps<Props, Options>,
	settings: BlockContextSettingsWithOptionalProps<Props, Options>,
): Partial<BlockCreation<Options>>;
export function testBlock<Options extends object>(
	block: BlockWithoutProps<Options>,
	settings?: BlockContextSettingsWithoutProps<Options>,
): Partial<BlockCreation<Options>>;
export function testBlock<Props extends object, Options extends object>(
	block: BlockWithoutProps<Options> | BlockWithProps<Props, Options>,
	settings: BlockContextSettingsWithOptionalProps<Props, Options> = {},
): Partial<BlockCreation<Options>> {
	return produceBlock(
		block as BlockWithProps<Props, Options>,
		{
			...settings,
			options:
				settings.options ??
				(createFailingObject("options", "the Block") as Options),
			props: settings.props ?? {},
		} as ProduceBlockSettingsWithProps<Props, Options>,
	);
}
