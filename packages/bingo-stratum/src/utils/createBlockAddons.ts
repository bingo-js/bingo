export function createBlockAddons<Addons extends object, Block>(
	addons: Addons,
	block: Block,
	name: string | undefined,
) {
	const created = { addons, block };

	if (name) {
		Object.defineProperty(created, "toJSON", {
			value: () => ({ addons, block: `[Block ${name}]` }),
		});
	}

	return created;
}
