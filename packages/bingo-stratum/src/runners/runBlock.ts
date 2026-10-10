import { createSystemContextWithAuth, runCreation } from "bingo";
import { BingoSystem } from "bingo-systems";

import { produceBlock } from "../producers/produceBlock.js";
import { BlockWithoutProps, BlockWithProps } from "../types/blocks.js";

export type RunBlockSettings<
	Props extends object | undefined,
	Options extends object,
> = Props extends object
	? RunBlockSettingsWithOptionalProps<Props, Options>
	: RunBlockSettingsWithoutProps<Options>;

export interface RunBlockSettingsWithOptionalProps<
	Props extends object,
	Options extends object,
> extends RunBlockSettingsWithoutProps<Options> {
	props?: Props;
}

export interface RunBlockSettingsWithoutProps<
	Options extends object,
> extends Partial<BingoSystem> {
	directory?: string;
	offline?: boolean;
	options: Options;
}

export interface RunBlockSettingsWithRequiredProps<
	Props extends object,
	Options extends object,
> extends RunBlockSettingsWithoutProps<Options> {
	props: Props;
}

export async function runBlock<Props extends object, Options extends object>(
	block: BlockWithProps<Props, Options>,
	settings: RunBlockSettingsWithOptionalProps<Props, Options>,
): Promise<void>;
export async function runBlock<Options extends object>(
	block: BlockWithoutProps<Options>,
	settings: RunBlockSettingsWithoutProps<Options>,
): Promise<void>;
export async function runBlock<Props extends object, Options extends object>(
	block: BlockWithoutProps<Options> | BlockWithProps<Props, Options>,
	settings: RunBlockSettings<Props, Options>,
): Promise<void> {
	const { directory = ".", offline } = settings;
	const system = await createSystemContextWithAuth({ directory, ...settings });

	const creation = produceBlock(
		// TODO: Why are these assertions necessary?
		// https://github.com/bingo-js/bingo/issues/283
		block as BlockWithProps<Props, Options>,
		settings as RunBlockSettingsWithRequiredProps<Props, Options>,
	);

	await runCreation(creation, { offline, system });
}
