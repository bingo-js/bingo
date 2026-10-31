import { Creation } from "bingo";

import { BlockWithProps } from "./blocks.js";

export interface BlockCreation<Options extends object> extends Creation {
	extensions: CreatedBlockExtension<object, Options>[];
}

/**
 * Describes Props to provide to a Block before production.
 * @template Props Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export interface CreatedBlockExtension<
	Props extends object = object,
	Options extends object = object,
> {
	block: BlockWithProps<Props, Options>;
	props: Props;
}
