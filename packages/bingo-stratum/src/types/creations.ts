import { Creation } from "bingo";

import { BlockWithAddons } from "./blocks.js";

export interface BlockCreation<Options extends object> extends Creation {
	addons: CreatedBlockAddons<object, Options>[];
}

/**
 * Describes Addons to provide to a Block before production.
 * @template Addons Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export interface CreatedBlockAddons<
	Addons extends object = object,
	Options extends object = object,
> {
	addons: Addons;
	block: BlockWithAddons<Addons, Options>;
}
