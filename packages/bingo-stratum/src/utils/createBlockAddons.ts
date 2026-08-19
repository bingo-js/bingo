export function createBlockAddons<Addons extends object, Block>(
	addons: Addons,
	block: Block,
	name: string | undefined,
) {
	const created = { addons, block };

	// Test framework snapshots print Blocks as an unhelpful [Function], so this
	// gives them a serialization that says which Block the Addons are for.
	// https://github.com/bingo-js/bingo/issues/314
	if (name) {
		Object.defineProperty(created, "toJSON", {
			value: () => ({ addons, block: `[Block ${name}]` }),
		});
	}

	return created;
}
