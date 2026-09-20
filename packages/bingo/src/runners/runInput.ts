import { BingoSystem } from "bingo-systems";

import { createSystemContext } from "../contexts/createSystemContext.js";
import {
	Input,
	InputContextWithArgs,
	InputContextWithoutArgs,
	ProvidedInputArgs,
} from "../types/inputs.js";
import { AnyShape, InferredObject } from "../types/shapes.js";

export interface RunInputSettings<
	Args extends object = object,
> extends Partial<BingoSystem> {
	args: Args;
	auth?: string;
	directory?: string;
	offline?: boolean;
}

/**
 * Runs the produce() of an Input whose result type depends on its args.
 * @param input Input whose result type depends on its args.
 * @param settings Settings including values corresponding to the Input's args.
 */
export function runInput<
	const Args extends object,
	Result,
	Context extends InputContextWithoutArgs = InputContextWithArgs<Args>,
>(
	input: (context: Context) => Result,
	settings: RunInputSettings<ProvidedInputArgs<Args, Context>>,
): Result;

/**
 * Runs the produce() of an Input with args schema.
 * @param input Input that defines an args schema.
 * @param settings Settings including values corresponding to the Input's args schema.
 */
export function runInput<Result, ArgsShape extends AnyShape>(
	input: Input<Result, ArgsShape>,
	settings: RunInputSettings<InferredObject<ArgsShape>>,
): Result;

export function runInput(
	input: (
		context: InputContextWithoutArgs & {
			args: InferredObject<AnyShape> | undefined;
		},
	) => unknown,
	settings: Partial<RunInputSettings<InferredObject<AnyShape>>>,
) {
	const system = createSystemContext({
		directory: settings.directory ?? ".",
		...settings,
	});

	return input({
		args: settings.args,
		...system,
	});
}
