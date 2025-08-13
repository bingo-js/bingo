import { describe, expect, it, vi } from "vitest";

import { Creation } from "../types/creations.js";
import { SystemContext } from "../types/system.js";
import { runCreation } from "./runCreation.js";

const mockApplyFilesToSystem = vi.fn();

vi.mock("./applyFilesToSystem", () => ({
	get applyFilesToSystem() {
		return mockApplyFilesToSystem;
	},
}));

const mockApplyRequestsToSystem = vi.fn();

vi.mock("./applyRequestsToSystem", () => ({
	get applyRequestsToSystem() {
		return mockApplyRequestsToSystem;
	},
}));

const mockApplyScriptsToSystem = vi.fn();

vi.mock("./applyScriptsToSystem", () => ({
	get applyScriptsToSystem() {
		return mockApplyScriptsToSystem;
	},
}));

const mockSystem = {
	directory: "example-directory",
	fs: {},
} as SystemContext;

describe(runCreation, () => {
	it("doesn't apply files to system when no files are provided", async () => {
		const creation = {};

		await runCreation(creation, {
			system: mockSystem,
		});

		expect(mockApplyFilesToSystem).not.toHaveBeenCalled();
	});

	it("doesn't apply files to system when files are provided and skips.files is true", async () => {
		const creation = {
			files: {
				"README.md": "# Hello, world!",
			},
		};

		await runCreation(creation, {
			skips: {
				files: true,
			},
			system: mockSystem,
		});

		expect(mockApplyFilesToSystem).not.toHaveBeenCalled();
	});

	it("applies files to system when files are provided and skips.files is falsy", async () => {
		const creation = {
			files: {
				"README.md": "# Hello, world!",
			},
		};

		await runCreation(creation, {
			skips: {},
			system: mockSystem,
		});

		expect(mockApplyFilesToSystem).toHaveBeenCalledWith(
			creation.files,
			mockSystem.fs,
			mockSystem.directory,
		);
	});

	it("doesn't apply scripts to system when no scripts are provided", async () => {
		const creation = {};

		await runCreation(creation, {
			system: mockSystem,
		});

		expect(mockApplyScriptsToSystem).not.toHaveBeenCalled();
	});

	it("doesn't apply scripts to system when scripts are provided and skips.scripts is true", async () => {
		const creation = {
			scripts: ["echo Hello, world"],
		};

		await runCreation(creation, {
			skips: {
				scripts: true,
			},
			system: mockSystem,
		});

		expect(mockApplyScriptsToSystem).not.toHaveBeenCalled();
	});

	it("applies scripts to system when scripts are provided and skips.scripts is falsy", async () => {
		const creation = {
			scripts: ["echo Hello, world"],
		};

		await runCreation(creation, {
			skips: {},
			system: mockSystem,
		});

		expect(mockApplyScriptsToSystem).toHaveBeenCalledWith(
			creation.scripts,
			mockSystem,
		);
	});

	it("doesn't apply requests to system when no requests are provided", async () => {
		const creation = {};

		await runCreation(creation, {
			system: mockSystem,
		});

		expect(mockApplyRequestsToSystem).not.toHaveBeenCalled();
	});

	it("doesn't apply requests to system when requests are provided and offline is true", async () => {
		const creation = {
			requests: [{ type: "fetch", url: "/" }],
		} satisfies Partial<Creation>;

		await runCreation(creation, {
			offline: true,
			system: mockSystem,
		});

		expect(mockApplyRequestsToSystem).not.toHaveBeenCalled();
	});

	it("doesn't apply requests to system when requests are provided and skips.requests is true", async () => {
		const creation = {
			requests: [{ type: "fetch", url: "/" }],
		} satisfies Partial<Creation>;

		await runCreation(creation, {
			skips: {
				requests: true,
			},
			system: mockSystem,
		});

		expect(mockApplyRequestsToSystem).not.toHaveBeenCalled();
	});

	it("applies requests to system when requests are provided and offline and skips.requests is falsy", async () => {
		const creation = {
			requests: [{ type: "fetch", url: "/" }],
		} satisfies Partial<Creation>;

		await runCreation(creation, {
			skips: {},
			system: mockSystem,
		});

		expect(mockApplyRequestsToSystem).toHaveBeenCalledWith(
			creation.requests,
			mockSystem,
		);
	});
});
