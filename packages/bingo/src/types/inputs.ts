import { ReadingFileSystem, SystemFetchers, SystemRunner } from "bingo-systems";

import { AnyShape, InferredObject } from "./shapes.js";

/**
 * An Input that might have args schema defined.
 * @template Result Return type from the Input's produce().
 * @template ArgsShape Arguments schema, if the Input defines them.
 * @see {@link https://create.bingo/build/details/inputs}
 */
export type Input<
	Result,
	ArgsShape extends AnyShape | undefined = undefined,
> = ArgsShape extends AnyShape
	? InputWithArgs<Result, ArgsShape>
	: InputWithoutArgs<Result>;

/**
 * Shared helper functions and information passed to Inputs, including args.
 * @template Args Values as defined by the Input's args schema.
 * @see {@link https://create.bingo/build/details/contexts#input-contexts}
 */
export interface InputContextWithArgs<
	Args extends object,
> extends InputContextWithoutArgs {
	args: Args;
}

/**
 * Shared helper functions and information passed to Inputs.
 * @see {@link https://create.bingo/build/details/contexts#input-contexts}
 */
export interface InputContextWithoutArgs {
	fetchers: SystemFetchers;

	/**
	 * APIs to read from a file system.
	 */
	fs: ReadingFileSystem;

	/**
	 * Whether Bingo is being run in an "offline" mode.
	 * @see {@link http://create.bingo/build/details/contexts#input-offline}
	 */
	offline?: boolean;
	runner: SystemRunner;
	take: TakeInput;
}

/**
 * Producer function for an Input that defines an args schema.
 */
export type InputProducerWithArgs<Result, ArgsSchema extends AnyShape> = (
	context: InputContextWithArgs<InferredObject<ArgsSchema>>,
) => Result;

/**
 * Producer function for an Input that does not define an args schema.
 */
export type InputProducerWithoutArgs<Result> = (
	context: InputContextWithoutArgs,
) => Result;

/**
 * An Input that defines an args schema.
 * @see {@link https://create.bingo/build/details/inputs}
 */
export interface InputWithArgs<Result, ArgsSchema extends AnyShape> {
	(context: InputContextWithArgs<InferredObject<ArgsSchema>>): Result;
	args: ArgsSchema;
}

/**
 * An Input that does not define an args schema.
 * @see {@link https://create.bingo/build/details/inputs}
 */
export type InputWithoutArgs<Result> = (
	context: InputContextWithoutArgs,
) => Result;

/**
 * Args provided to an Input, checked against the args expected by its context.
 * Resolves to never on mismatch so calls fall through to the args schema overload.
 * @template Args Values provided for the Input's args.
 * @template Context Input context expected by the Input.
 */
export type ProvidedInputArgs<Args extends object, Context> =
	Context extends InputContextWithArgs<infer Expected>
		? Expected extends Args
			? Args
			: never
		: never;

/**
 * Shared context function to run an Input.
 * @see {@link http://create.bingo/build/details/contexts#input-take}
 */
export interface TakeInput {
	/**
	 * Runs the produce() of an Input whose result type depends on its args.
	 * @param input Input whose result type depends on its args.
	 * @param args Values corresponding to the Input's args.
	 */
	<
		const Args extends object,
		Result,
		Context extends InputContextWithoutArgs = InputContextWithArgs<Args>,
	>(
		input: (context: Context) => Result,
		args: ProvidedInputArgs<Args, Context>,
	): Result;

	/**
	 * Runs the produce() of an Input with args schema.
	 * @param input Input that defines an args schema.
	 * @param args Values corresponding to the Input's args schema.
	 */
	<Result, ArgsShape extends AnyShape>(
		input: InputWithArgs<Result, ArgsShape>,
		args: InferredObject<ArgsShape>,
	): Result;

	/**
	 * Runs the produce() of an Input without an args schema.
	 * @param input Input that does not define an args schema.
	 */
	<Result>(input: InputWithoutArgs<Result>): Result;
}
