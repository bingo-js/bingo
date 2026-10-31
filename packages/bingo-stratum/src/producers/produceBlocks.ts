import { ProductionMode } from "bingo";
import { IntakeDirectory } from "bingo-fs";

import { mergeBlockCreations } from "../mergers/mergeBlockCreations.js";
import { Block, BlockWithProps } from "../types/blocks.js";
import { CreatedBlockExtension } from "../types/creations.js";
import {
	BlockProduction,
	getUpdatedBlockExtensions,
} from "./getUpdatedBlockExtensions.js";
import { produceBlock } from "./produceBlock.js";

export interface ProduceBlocksSettings<Options extends object> {
	blockExtensions?: CreatedBlockExtension<object, Options>[];
	files?: IntakeDirectory;
	mode?: ProductionMode;
	offline?: boolean;
	options: Options;
}

export function produceBlocks<Options extends object>(
	blocks: Block<object | undefined, Options>[],
	{
		blockExtensions,
		files = {},
		mode,
		offline,
		options,
	}: ProduceBlocksSettings<Options>,
) {
	// From Templating Engines > Stratum > Details > Execution:
	// This engine continuously re-runs Blocks until no new extensions are provided.

	// Collect all Blocks defined in the Preset, along with their Extensions:
	const blockProductions = new Map<
		Block<object | undefined, Options>,
		BlockProduction<object>
	>();

	// 1.1. Run any intake methods to generate default Prop values
	for (const block of blocks) {
		if (isBlockWithProps(block)) {
			const props = block.intake?.({ files, options });
			if (props) {
				blockProductions.set(block, { props });
			}
		}
	}
	// 2.2. Apply all provided refinements on top of those
	for (const { block, props } of blockExtensions ?? []) {
		blockProductions.set(block, {
			props: {
				...blockProductions.get(block)?.props,
				...props,
			},
		});
	}

	// 2. Create a queue of Blocks to be run, starting with all defined in the Preset
	const allowedBlocks = new Set(blocks);
	const blocksToBeRun = new Set(blocks);

	// 3. For each Block in the queue:
	while (blocksToBeRun.size) {
		for (const currentBlock of blocksToBeRun) {
			blocksToBeRun.delete(currentBlock);

			// 3.1. Get the Creation from the Block, passing any current known Props
			// 3.2. If a mode is specified, additionally generate the appropriate Block Creations
			const previousProduction = blockProductions.get(currentBlock);
			const previousProps = previousProduction?.props ?? {};
			const blockCreation = produceBlock(
				currentBlock as BlockWithProps<object, Options>,
				{
					mode,
					offline,
					options,
					props: previousProps,
				},
			);

			// 3.3. Store that Block's Creation
			blockProductions.set(currentBlock, {
				creation: blockCreation,
				props: previousProps,
			});

			// 3.4. If the Block specified new extensions for any defined Blocks:
			// 3.4.1: Merge those Extensions into the Blocks' existing Props, throwing an error if any values conflict
			const updatedBlockExtensions = getUpdatedBlockExtensions(
				allowedBlocks,
				blockProductions,
				currentBlock,
				blockCreation.extensions,
			);

			// 3.4.2: Add those Blocks to the queue to re-run
			for (const [updatedBlock, updatedProps] of updatedBlockExtensions) {
				const addedBlockPreviousProduction = blockProductions.get(updatedBlock);
				blockProductions.set(updatedBlock, {
					...addedBlockPreviousProduction,
					props: updatedProps,
				});
				blocksToBeRun.add(updatedBlock);
			}
		}
	}

	// 4. Merge all Block Creations together
	return (
		Array.from(blockProductions.values()) as BlockProduction<Options>[]
	).reduce(
		(created, next) => mergeBlockCreations(created, next.creation ?? {}),
		{},
	);
}

function isBlockWithProps<Options extends object>(
	block: Block<object | undefined, Options>,
): block is BlockWithProps<object, Options> {
	return "props" in block;
}
