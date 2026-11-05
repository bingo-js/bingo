// https://github.com/typescript-eslint/typescript-eslint/issues/10508
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import markdown from "eslint-plugin-markdown";
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import * as regexp from "eslint-plugin-regexp";
import yml from "eslint-plugin-yml";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
	{
		ignores: [
			"**/*.snap",
			"coverage",
			"lib",
			"node_modules",
			"packages/*/dist",
			"packages/*/lib",
			// Remove after https://github.com/bingo-js/bingo/issues/527
			"packages/*/bin/*.js",
			"packages/*/src/**/*.d.ts",
			"packages/*/src/**/*.js",
			"packages/*/tsconfig.tsbuildinfo",
			"packages/site/.astro",
			"packages/site/src/content",
			"packages/site/src/env.d.ts",
			"pnpm-lock.yaml",
		],
	},
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	js.configs.recommended,
	comments.recommended,
	jsdoc.configs["flat/contents-typescript-error"],
	jsdoc.configs["flat/logical-typescript-error"],
	jsdoc.configs["flat/stylistic-typescript-error"],
	...jsonc.configs["flat/recommended-with-json"],
	...markdown.configs.recommended,
	perfectionist.configs["recommended-natural"],
	regexp.configs["flat/recommended"],
	{
		extends: [
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		files: ["**/*.js", "**/*.ts"],
		ignores: ["**/*.md/*"],
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ["*.config.{js,ts}"],
				},
			},
		},
		rules: {
			// These on-by-default rules work well for this repo if configured
			"@typescript-eslint/no-unnecessary-condition": [
				"error",
				{ allowConstantLoopConditions: "only-allowed-literals" },
			],
			"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],
			"jsdoc/informative-docs": "error",

			// These on-by-default rules cause too much friction for this repo
			"no-undef": "off",

			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
		},
		settings: { perfectionist: { partitionByComment: true, type: "natural" } },
	},
	{
		extends: [packageJson.configs.recommended, packageJson.configs.stylistic],
		files: ["**/package.json"],
	},
	{
		extends: [vitest.configs.recommended],
		files: ["**/*.test.*"],
		rules: {
			"@typescript-eslint/no-unsafe-assignment": "off",
			"vitest/no-conditional-expect": "off",
		},
		settings: { vitest: { typecheck: true } },
	},
	{
		extends: [yml.configs["flat/recommended"], yml.configs["flat/prettier"]],
		files: ["**/*.{yml,yaml}"],
		rules: {
			"yml/file-extension": ["error", { extension: "yml" }],
			"yml/sort-sequence-values": [
				"error",
				{
					order: { type: "asc" },
					pathPattern: "^.*$",
				},
			],
		},
	},
	{
		files: ["pnpm-workspace.yaml"],
		rules: {
			"yml/file-extension": "off",
			"yml/sort-keys": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
);
