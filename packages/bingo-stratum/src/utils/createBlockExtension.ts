export function createBlockExtension<Block, Props extends object>(
	block: Block,
	props: Props,
	name: string | undefined,
) {
	const created = { block, props };

	if (name) {
		Object.defineProperty(created, "toJSON", {
			value: () => ({ block: `[Block ${name}]`, props }),
		});
	}

	return created;
}
