import { ProductionMode } from "bingo";

import { mergeBlockCreations } from "../mergers/mergeBlockCreations.js";
import { BlockWithoutProps, BlockWithProps } from "../types/blocks.js";
import { BlockCreation } from "../types/creations.js";
import { StratumTemplateOptions } from "../types/templates.js";

/**
 * Settings to run a Block with {@link produceBlock} that might have props.
 * @template Props Block-specific extensions, if defined by the Block's schema.
 * @template Options Options values as described by the Block's Base's options schema, as well as preset.
 * @see {@link https://www.create.bingo/engines/stratum/apis/producers#produceblock}
 */
export type ProduceBlockSettings<
	Props extends object | undefined,
	Options extends object,
> = Props extends object
	? ProduceBlockSettingsWithProps<Props, Options>
	: ProduceBlockSettingsWithoutProps<Options>;

/**
 * Settings to run a Block with {@link produceBlock} that defines props.
 * @template Props Block-specific extensions as defined by the Block's schema.
 * @template Options Options values as described by the Block's Base's options schema, as well as preset.
 * @see {@link https://www.create.bingo/engines/stratum/apis/producers#produceblock}
 */
export interface ProduceBlockSettingsWithProps<
	Props extends object,
	Options extends object,
> extends ProduceBlockSettingsWithoutProps<Options> {
	/**
	 * Props to provide to the Block.
	 */
	props?: Props;
}

/**
 * Settings to run a Block with {@link produceBlock} that does not define props.
 * @template Options Options values as described by the Block's Base's options schema, as well as preset.
 * @see {@link https://www.create.bingo/engines/stratum/apis/producers#produceblock}
 */
export interface ProduceBlockSettingsWithoutProps<Options extends object> {
	/**
	 * Which repository mode Bingo is being run in.
	 * @see {@link https://create.bingo/build/concepts/modes}
	 */
	mode?: ProductionMode;

	/**
	 * Whether Bingo is being run in an "offline" mode.
	 * @see {@link http://create.bingo/build/details/contexts#options-offline}
	 */
	offline?: boolean;

	/**
	 * Options values as described by the Block's Base's options schema.
	 */
	options: Options;
}

/**
 * Produces a single Block that defines props.
 * @template Props Block-specific extensions, if defined by the Block's schema.
 * @template Options Options values as described by the Block's Base's options schema, as well as preset.
 * @see {@link https://www.create.bingo/engines/stratum/apis/producers#produceblock}
 */
export function produceBlock<Props extends object, Options extends object>(
	block: BlockWithProps<Props, Options>,
	settings: ProduceBlockSettingsWithProps<Props, Options>,
): Partial<BlockCreation<Options>>;

/**
 * Produces a single Block that does not define props.
 * @template Options Options values as described by the Block's Base's options schema, as well as preset.
 * @see {@link https://www.create.bingo/engines/stratum/apis/producers#produceblock}
 */
export function produceBlock<Options extends object>(
	block: BlockWithoutProps<Options>,
	settings: ProduceBlockSettingsWithoutProps<Options>,
): Partial<BlockCreation<Options>>;

/**
 * Produces a single Block.
 * @template Props Block-specific extensions, if defined by the Block's schema.
 * @template Options Options values as described by the Block's Base's options schema, as well as preset.
 * @see {@link https://www.create.bingo/engines/stratum/apis/producers#produceblock}
 */
export function produceBlock<
	Props extends object,
	Options extends StratumTemplateOptions,
>(
	block: BlockWithoutProps<Options> | BlockWithProps<Props, Options>,
	settings: ProduceBlockSettings<Props, Options>,
): Partial<BlockCreation<Options>> {
	let creation = block.produce(settings);

	const augment = settings.mode && block[settings.mode];
	if (augment) {
		const augmented = augment({
			props: {} as Props,
			...settings,
		});
		creation = mergeBlockCreations(creation, augmented);
	}

	return creation;
}
