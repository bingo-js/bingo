import { describe, expect, it, vi } from "vitest";

import { createReadingFileSystem } from "./createReadingFileSystem.js";

const mockReaddir = vi.fn();
const mockReadFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get readdir() {
		return mockReaddir;
	},
	get readFile() {
		return mockReadFile;
	},
}));

const mockGlob = vi.fn();

vi.mock("tinyglobby", () => ({
	get glob() {
		return mockGlob;
	},
}));

describe("createReadingFileSystem", () => {
	describe("glob", () => {
		it("resolves with the matched paths when given one pattern", async () => {
			const matches = [".github/workflows/ci.yml"];
			mockGlob.mockResolvedValueOnce(matches);
			const system = createReadingFileSystem();

			const actual = await system.glob(".github/**/*.yml");

			expect(actual).toBe(matches);
			expect(mockGlob).toHaveBeenCalledWith(".github/**/*.yml");
		});

		it("resolves with the matched paths when given multiple patterns", async () => {
			const patterns = [".github/**/*.yml", "src/**/*.ts"];
			const matches = [".github/workflows/ci.yml", "src/index.ts"];
			mockGlob.mockResolvedValueOnce(matches);
			const system = createReadingFileSystem();

			const actual = await system.glob(patterns);

			expect(actual).toBe(matches);
			expect(mockGlob).toHaveBeenCalledWith(patterns);
		});
	});

	describe("readDirectory", () => {
		it("resolves with the directory's children", async () => {
			const children = ["index.ts"];
			mockReaddir.mockResolvedValueOnce(children);
			const system = createReadingFileSystem();

			const actual = await system.readDirectory("src");

			expect(actual).toBe(children);
			expect(mockReaddir).toHaveBeenCalledWith("src");
		});
	});

	describe("readFile", () => {
		it("resolves with the file's contents as text", async () => {
			mockReadFile.mockResolvedValueOnce(Buffer.from("abc123"));
			const system = createReadingFileSystem();

			const actual = await system.readFile("src/index.ts");

			expect(actual).toBe("abc123");
			expect(mockReadFile).toHaveBeenCalledWith("src/index.ts");
		});
	});
});
