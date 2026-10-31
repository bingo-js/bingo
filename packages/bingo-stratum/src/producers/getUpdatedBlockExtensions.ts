import { Creation } from "bingo";

import { mergePropsIfUpdated } from "../mergers/mergePropsIfUpdated.js";
import { Block, BlockWithProps } from "../types/blocks.js";
import { CreatedBlockExtension } from "../types/creations.js";
import { getName } from "../utils/getName.js";

export interface BlockProduction<Props extends object | undefined> {
	creation?: Partial<Creation>;
	props: Props;
}

export function getUpdatedBlockExtensions<Options extends object>(
	allowedBlocks: Set<Block<object | undefined, Options>>,
	blockProductions: Map<
		Block<object | undefined, Options>,
		BlockProduction<object>
	>,
	producingBlock: Block<object | undefined, Options>,
	newBlockExtensions: CreatedBlockExtension<object, Options>[] = [],
) {
	const updated: [BlockWithProps<object, Options>, object][] = [];

	for (const newExtension of newBlockExtensions) {
		if (!allowedBlocks.has(newExtension.block)) {
			continue;
		}

		const existingProduction = blockProductions.get(newExtension.block);
		if (!existingProduction) {
			updated.push([newExtension.block, newExtension.props]);
			continue;
		}

		const updatedProps = mergePropsIfUpdated(
			existingProduction.props,
			newExtension.props,
		);
		if (updatedProps instanceof Error) {
			throw new Error(
				`Could not merge the props from Block ${getName(producingBlock)}'s extension into Block ${getName(newExtension.block)}. ${updatedProps.message}`,
			);
		}

		if (updatedProps) {
			updated.push([newExtension.block, updatedProps]);
		}
	}

	return updated;
}
