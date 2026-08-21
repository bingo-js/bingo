import { styleText } from "node:util";

export function formatFlag(flag: string, type: string) {
	return [
		flag.startsWith("--")
			? [
					styleText("green", "--"),
					styleText(["bold", "green"], flag.slice(2)),
				].join("")
			: styleText(["bold", "green"], flag),
		" ",
		styleText("green", `(${type})`),
		styleText("blue", ": "),
	].join("");
}
