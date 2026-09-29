export function getRerunCommand(from: string) {
	return `${getPackageRunner()} ${from}`;
}

function getPackageRunner() {
	const userAgent = process.env.npm_config_user_agent ?? "";

	if (userAgent.startsWith("bun/")) {
		return "bunx";
	}

	if (userAgent.startsWith("pnpm/")) {
		return "pnpm dlx";
	}

	// Yarn Classic (v1) doesn't have a dlx command
	if (userAgent.startsWith("yarn/") && !userAgent.startsWith("yarn/1.")) {
		return "yarn dlx";
	}

	return "npx";
}
