export function makeRelative(item: string) {
	return item.startsWith(".") ? item : `./${item}`;
}

export function quoteIfSpaced(text: string) {
	return text.includes(" ") ? `"${text}"` : text;
}
