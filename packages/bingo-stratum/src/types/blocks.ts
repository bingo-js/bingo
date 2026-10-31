import { AboutBase, AnyOptionalShape, InferredObject } from "bingo";
import { IntakeDirectory } from "bingo-fs";

import { BlockCreation, CreatedBlockExtension } from "./creations.js";
import { StratumTemplateOptions } from "./templates.js";

/**
 * Logic to create one portion of a repository.
 * @template Props Block-specific extensions, if defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export type Block<
	Props extends object | undefined = object | undefined,
	Options extends object = object,
> = Props extends object
	? BlockWithProps<Props, Options>
	: BlockWithoutProps<Options>;

/**
 * Augments additional creations into a production from a Block with Props.
 * @param context Shared Block helper functions and information.
 * @template Props Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export type BlockAugmentWithProps<
	Props extends object,
	Options extends object,
> = (
	context: BlockContextWithProps<Props, Options>,
) => Partial<BlockCreation<Options>>;

/**
 * Augments additional creations into a production from a Block without Props.
 * @param context Shared Block helper functions and information.
 * @template Options Options values as described by the Base's options schema.
 */
export type BlockAugmentWithoutProps<Options extends object> = (
	context: BlockContextWithoutProps<Options>,
) => Partial<BlockCreation<Options>>;

export interface BlockBase {
	/**
	 * Metadata about the Block that can be used by tooling to describe it.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-about}
	 */
	about?: AboutBase;
}

/**
 * Shared helper functions and information passed to producers of Blocks with required Props.
 * @template Props Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export interface BlockContextWithProps<
	Props extends object,
	Options extends object,
> extends BlockContextWithoutProps<Options> {
	props: Props;
}

/**
 * Shared helper functions and information passed to Block intake()s.
 */
export interface BlockIntakeContext<Options extends object> {
	/**
	 * Any existing files on disk.
	 */
	files: IntakeDirectory;

	/**
	 * Options values as described by the Base's options schema.
	 */
	options: Options;
}

/**
 * Shared helper functions and information passed to producers of Blocks with optional Props.
 * @template Props Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export interface BlockContextWithOptionalProps<
	Props extends object,
	Options extends object,
> extends BlockContextWithoutProps<Options> {
	props?: Props;
}

/**
 * Shared helper functions and information passed to producers of Blocks without props.
 * @template Options Options values as described by the Base's options schema.
 */
export interface BlockContextWithoutProps<Options extends object> {
	offline?: boolean;
	options: Options & StratumTemplateOptions;
}

/**
 * Definition for creating a new Block that may have props.
 * @template PropsShape Schema of Props the Block takes in, if defined.
 * @template Options Options values as described by the Base's options schema.
 */
export type BlockDefinition<
	PropsShape extends AnyOptionalShape | undefined,
	Options extends object,
> = PropsShape extends object
	? BlockDefinitionWithProps<PropsShape, Options>
	: BlockDefinitionWithoutProps<Options>;

/**
 * Generates the creations describing a portion of a repository from a Block with props.
 * @template Props Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export type BlockDefinitionProducerWithProps<
	Props extends object,
	Options extends object,
> = (
	context: BlockContextWithProps<Props, Options>,
) => Partial<BlockCreation<Options>>;

/**
 * Generates the creations describing a portion of a repository from a Block without props.
 * @template Options Options values as described by the Base's options schema.
 */
export type BlockDefinitionProducerWithoutProps<Options extends object> = (
	context: BlockContextWithoutProps<Options>,
) => Partial<BlockCreation<Options>>;

/**
 * Definition for creating a new Block with props.
 * @template PropsShape Schema of Props the Block takes in.
 * @template Options Options values as described by the Base's options schema.
 */
export interface BlockDefinitionWithProps<
	PropsShape extends AnyOptionalShape,
	Options extends object,
> extends BlockBase {
	/**
	 * Schema of Props the Block takes in.
	 */
	props: PropsShape;

	/**
	 * Infers Props from existing files in the repository.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-intake}
	 */
	intake?: BlockIntake<InferredObject<PropsShape>, Options>;

	/**
	 * Generates the creations describing a portion of a repository.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-produce}
	 */
	produce?: BlockDefinitionProducerWithProps<
		InferredObject<PropsShape>,
		Options
	>;

	/**
	 * Augments a Block creation with additional creations for setup mode.
	 * @template Options Options values as described by the Base's options schema.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-setup}
	 */
	setup?: BlockAugmentWithProps<InferredObject<PropsShape>, Options>;

	/**
	 * Augments a Block creation with additional creations for transition mode.
	 * @template Options Options values as described by the Base's options schema.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-transition}
	 */
	transition?: BlockAugmentWithProps<InferredObject<PropsShape>, Options>;
}

/**
 * Definition for creating a new Block without Props.
 * @template Options Options values as described by the Base's options schema.
 */
export interface BlockDefinitionWithoutProps<
	Options extends object,
> extends BlockBase {
	/**
	 * Generates the creations describing a portion of a repository.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-produce}
	 */
	produce?: BlockDefinitionProducerWithoutProps<Options>;

	/**
	 * Augments a Block creation with additional creations for setup mode.
	 * @template Options Options values as described by the Base's options schema.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-setup}
	 */
	setup?: BlockAugmentWithoutProps<Options>;

	/**
	 * Augments a Block creation with additional creations for transition mode.
	 * @template Options Options values as described by the Base's options schema.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-transition}
	 */
	transition?: BlockAugmentWithoutProps<Options>;
}

/**
 * Infers any Props for the Block from existing creations.
 * @param context Shared Block helper functions and information.
 * @template Props Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export type BlockIntake<Props extends object, Options extends object> = (
	context: BlockIntakeContext<Options>,
) => Partial<Props> | undefined;

/**
 * Generates the creations describing a portion of a repository with props.
 * @param context Shared Block helper functions and information.
 * @template Props Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the template's options schema.
 * @see {@link https://www.create.bingo/engines/stratum/concepts/blocks#production}
 */
export type BlockProducerWithProps<
	Props extends object,
	Options extends object,
> = (
	context: BlockContextWithOptionalProps<Props, Options>,
) => Partial<BlockCreation<Options>>;

/**
 * Generates the creations describing a portion of a repository without props.
 * @param context Shared Block helper functions and information.
 * @template Options Options values as described by the template's options schema.
 * @see {@link https://www.create.bingo/engines/stratum/concepts/blocks#production}
 */
export type BlockProducerWithoutProps<Options extends object> = (
	context: BlockContextWithoutProps<Options>,
) => Partial<BlockCreation<Options>>;

/**
 * Block that defines a schema for Props.
 * @template Props Block-specific extensions, as defined by the Block's schema.
 * @template Options Options values as described by the Base's options schema.
 */
export interface BlockWithProps<
	Props extends object,
	Options extends object,
> extends BlockBase {
	/**
	 * Infers Props from existing files in the repository.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-intake}
	 */
	intake?: BlockIntake<Props, Options>;

	/**
	 * Generates the creations describing a portion of a repository.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-produce}
	 */
	produce(
		context: BlockContextWithOptionalProps<Props, Options>,
	): Partial<BlockCreation<Options>>;

	/**
	 * Augments a Block creation with additional creations for setup mode.
	 * @template Options Options values as described by the Base's options schema.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-setup}
	 */
	setup?(
		context: BlockContextWithProps<Props, Options>,
	): Partial<BlockCreation<Options>>;

	/**
	 * Augments a Block creation with additional creations for transition mode.
	 * @template Options Options values as described by the Base's options schema.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-transition}
	 */
	transition?(
		context: BlockContextWithProps<Props, Options>,
	): Partial<BlockCreation<Options>>;

	/**
	 * Creates a description of Props to provide for the Block.
	 */
	(props: Partial<Props>): CreatedBlockExtension<Props, Options>;
}

/**
 * Block that does not define a schema for Props.
 * @template Options Options values as described by the Base's options schema.
 */
export interface BlockWithoutProps<Options extends object> extends BlockBase {
	/**
	 * Generates the creations describing a portion of a repository.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-produce}
	 */
	produce: BlockProducerWithoutProps<Options>;

	/**
	 * Augments a Block creation with additional creations for setup mode.
	 * @template Options Options values as described by the Base's options schema.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-setup}
	 */
	setup?: BlockAugmentWithoutProps<Options>;

	/**
	 * Augments a Block creation with additional creations for transition mode.
	 * @template Options Options values as described by the Base's options schema.
	 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base#createblock-transition}
	 */
	transition?: BlockAugmentWithoutProps<Options>;
}
