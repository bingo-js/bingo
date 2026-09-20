import {
	AnyShape,
	InferredObject,
	Input,
	InputContextWithArgs,
	InputContextWithoutArgs,
	InputProducerWithArgs,
	ProvidedInputArgs,
	TakeInput,
} from "bingo";

import { createMockSystems } from "./createMockSystems.js";
import { MockSystemOptions } from "./types.js";

export interface InputContextSettingsWithArgs<
	Args extends object,
> extends InputContextSettingsWithoutArgs {
	args: Args;
}

export interface InputContextSettingsWithoutArgs extends MockSystemOptions {
	take?: TakeInput;
}

/**
 * Runs the produce() of an Input whose result type depends on its args with mock systems.
 * @param input Input whose result type depends on its args.
 * @param settings Settings including values corresponding to the Input's args.
 */
export function testInput<
	const Args extends object,
	Result,
	Context extends InputContextWithoutArgs = InputContextWithArgs<Args>,
>(
	input: (context: Context) => Result,
	settings: InputContextSettingsWithArgs<ProvidedInputArgs<Args, Context>>,
): Result;

/**
 * Runs the produce() of an Input with mock systems.
 * @param input Input that may define an args schema.
 * @param settings Settings including any values corresponding to the Input's args schema.
 */
export function testInput<Result, ArgsShape extends AnyShape>(
	input: Input<Result, ArgsShape>,
	settings?: Partial<InputContextSettingsWithArgs<InferredObject<ArgsShape>>>,
): Result;

export function testInput(
	input: InputProducerWithArgs<unknown, AnyShape>,
	settings: Partial<
		InputContextSettingsWithArgs<InferredObject<AnyShape>>
	> = {},
) {
	const { system, take } = createMockSystems(settings);

	return input({
		...(settings as InputContextSettingsWithArgs<InferredObject<AnyShape>>),
		...system,
		take,
	});
}
