import { AboutBase, AnyShape, InferredObject } from "bingo";

import { Base } from "./bases.js";
import { Block, BlockWithoutProps, BlockWithProps } from "./blocks.js";

export interface Preset<OptionsShape extends AnyShape = AnyShape> {
	about: PresetAbout;
	base: Base<OptionsShape>;
	blocks: Block<object | undefined, InferredObject<OptionsShape>>[];
}

export interface PresetAbout extends AboutBase {
	name: string;
}

export interface PresetDefinition<Options extends object = object> {
	about: PresetAbout;
	// TODO: Figure out how to replace this with ... never? object?
	// Note it needs to pass tsc both in this repo and in create-typescript-app.
	// https://github.com/bingo-js/bingo/issues/283
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	blocks: (BlockWithoutProps<Options> | BlockWithProps<any, Options>)[];
}
