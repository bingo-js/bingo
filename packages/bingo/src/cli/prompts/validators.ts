import * as fs from "node:fs";

export function validateNewDirectory(value: string) {
	if (value && fs.existsSync(value)) {
		return `That directory already exists. Please choose another one.`;
	}

	return validateText(value);
}

function validateText(value: string) {
	if (!value) {
		return "Please enter a value.";
	}
}
