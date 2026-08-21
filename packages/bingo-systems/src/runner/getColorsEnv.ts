interface ColorsStream {
	hasColors(count: number): boolean;
	isTTY: boolean;
}

export function getColorsEnv(stdout: ColorsStream = process.stdout) {
	if (!stdout.isTTY) {
		return undefined;
	}

	if (stdout.hasColors(2 ** 24)) {
		return { FORCE_COLOR: "3" };
	}

	if (stdout.hasColors(2 ** 8)) {
		return { FORCE_COLOR: "2" };
	}

	if (stdout.hasColors(16)) {
		return { FORCE_COLOR: "1" };
	}

	return undefined;
}
