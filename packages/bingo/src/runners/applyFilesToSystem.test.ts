import { normalize } from "node:path";
import { describe, expect, it, vi } from "vitest";

import { applyFilesToSystem } from "./applyFilesToSystem.js";

function createMockSystem() {
	return {
		glob: vi.fn(),
		readDirectory: vi.fn(),
		readFile: vi.fn(),
		removeFile: vi.fn(),
		writeDirectory: vi.fn(),
		writeFile: vi.fn(),
	};
}

describe(applyFilesToSystem, () => {
	it("writes nested files and directories", async () => {
		const system = createMockSystem();

		await applyFilesToSystem(
			{
				".github": { "FUNDING.yaml": "github: abc" },
				"README.md": ["# Hello", { executable: true }],
			},
			system,
			"root",
		);

		expect(system.writeDirectory.mock.calls).toEqual([
			["root"],
			[normalize("root/.github")],
		]);
		expect(system.writeFile.mock.calls).toEqual([
			[normalize("root/.github/FUNDING.yaml"), "github: abc"],
			[normalize("root/README.md"), "# Hello", { executable: true }],
		]);
		expect(system.removeFile).not.toHaveBeenCalled();
	});

	it("removes previous paths relative to a file's directory after writing it", async () => {
		const system = createMockSystem();

		await applyFilesToSystem(
			{
				".github": {
					"FUNDING.yaml": ["github: abc", { previously: ["FUNDING.yml"] }],
				},
			},
			system,
			"root",
		);

		expect(system.writeFile).toHaveBeenCalledWith(
			normalize("root/.github/FUNDING.yaml"),
			"github: abc",
			{ previously: ["FUNDING.yml"] },
		);
		expect(system.removeFile.mock.calls).toEqual([
			[normalize("root/.github/FUNDING.yml")],
		]);
	});
});
