import { Block } from "./blocks.js";
import { CreatedBlockExtension } from "./creations.js";

/**
 * Blocks to add and/or exclude from production.
 * @template Options Options values as described by the template's options schema.
 * @see {@link https://www.create.bingo/engines/stratum/details/configurations#blocks}
 */
export interface BlockRefinements<Options extends object = object> {
	add?: Block<object | undefined, Options>[];
	exclude?: Block<object | undefined, Options>[];
}

/**
 * Customizations that all Stratum templates may apply in a config file.
 * @template Options Options values as described by the template's options schema.
 * @see {@link https://www.create.bingo/engines/stratum/details/configurations#settings}
 */
export interface StratumRefinements<Options extends object = object> {
	/**
	 * Blocks to add and/or exclude from production.
	 */
	blocks?: BlockRefinements<Options>;

	/**
	 * Any extra props to merge in and pass to blocks.
	 */
	extensions?: CreatedBlockExtension<object, Options>[];
}
