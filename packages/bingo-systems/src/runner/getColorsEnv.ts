interface ColorsStream {
	hasColors(count: number): boolean;
	isTTY: boolean;
}

/**
 * Commands run through execa don't see a TTY, so tools such as ESLint disable
 * their colors unless an env variable tells them the colors can be rendered.
 */
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
