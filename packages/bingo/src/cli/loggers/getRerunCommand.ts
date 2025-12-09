export function getRerunCommand(argv: string[]) {
	return ["npx", argv[1].split(/[/\\]/).at(-1)].join(" ");
}
