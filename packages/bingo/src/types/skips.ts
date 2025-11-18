/**
 * Settings to opt out of applying specific parts of a template.
 */
export interface RequestedSkips {
	/**
	 * Whether to opt out of writing files to disk.
	 */
	files?: boolean;

	/**
	 * Whether to opt out of sending network requests.
	 */
	requests?: boolean;

	/**
	 * Whether to opt out of running terminal commands.
	 */
	scripts?: boolean;
}
