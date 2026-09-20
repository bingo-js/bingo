import { AnyShape, InferredObject, InputWithArgs, TakeInput } from "bingo";
import { BingoSystem } from "bingo-systems";

import { createMockFetchers } from "./createMockFetchers.js";
import { createMockFileSystem } from "./createMockFileSystem.js";
import { MockSystemOptions } from "./types.js";
import { createFailingFunction } from "./utils.js";

export interface MockSystems {
	system: BingoSystem;
	take: TakeInput;
}

export function createMockSystems(
	settings: MockSystemOptions = {},
): MockSystems {
	const fetchers = settings.fetchers ?? createMockFetchers(fetch);
	const fs = createMockFileSystem(settings.fs);
	const runner = settings.runner ?? createFailingFunction("runner", "an input");

	const system = { fetchers, fs, runner };

	const take =
		settings.take ??
		(((
			input: InputWithArgs<unknown, AnyShape>,
			args: InferredObject<AnyShape>,
		) => input({ args, take, ...system })) as TakeInput);

	return { system, take };
}
