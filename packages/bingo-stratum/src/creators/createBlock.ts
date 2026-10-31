import { AnyOptionalShape, InferredObject } from "bingo";

import {
	BlockContextWithProps,
	BlockDefinitionWithoutProps,
	BlockDefinitionWithProps,
	BlockWithoutProps,
	BlockWithProps,
} from "../types/blocks.js";
import { createBlockExtension } from "../utils/createBlockExtension.js";
import { applyZodDefaults, isDefinitionWithProps } from "./utils.js";

export function createBlock<
	PropsShape extends AnyOptionalShape,
	Options extends object,
>(
	blockDefinition: BlockDefinitionWithProps<PropsShape, Options>,
): BlockWithProps<InferredObject<PropsShape>, Options>;
export function createBlock<Options extends object>(
	blockDefinition: BlockDefinitionWithoutProps<Options>,
): BlockWithoutProps<Options>;
export function createBlock<
	PropsShape extends AnyOptionalShape,
	Options extends object,
>(
	blockDefinition:
		| BlockDefinitionWithoutProps<Options>
		| BlockDefinitionWithProps<PropsShape, Options>,
) {
	const produce = blockDefinition.produce ?? produceNothing;

	// Blocks without Props can't be called as functions.
	if (!isDefinitionWithProps(blockDefinition)) {
		return { ...blockDefinition, produce };
	}

	const propsSchema = blockDefinition.props;

	type Props = InferredObject<PropsShape>;

	// Blocks with Props do need to be callable as functions...
	function block(props: Props) {
		return createBlockExtension(block, props, blockDefinition.about?.name);
	}

	// ...and also still have the Block Definition properties.
	Object.assign(block, blockDefinition);

	block.produce = (context: BlockContextWithProps<Props, Options>) => {
		return produce({
			...context,
			props: applyZodDefaults(
				propsSchema,
				context.props,
				blockDefinition.about?.name,
			),
		});
	};

	return block as BlockWithProps<Props, Options>;
}

function produceNothing() {
	return {};
}
