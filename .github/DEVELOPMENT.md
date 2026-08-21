# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

```shell
git clone https://github.com/(your-name-here)/bingo
cd bingo
pnpm install
```

Run a prebuild to prepare the repository for building:

```shell
pnpm run -r prebuild
```

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

## Building

Run [TypeScript](https://typescriptlang.org) in `--build` mode to build all packages:

```shell
pnpm build
```

Add `--watch` to run in a rebuilding watch mode:

```shell
pnpm build --watch
```

Alternately, you can build an individual package from within its folder:

```shell
cd packages/bingo
pnpm build
```

You should be able to see suggestions from TypeScript in your editor for all open files.

## Formatting

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

```shell
pnpm format --write
```

## Linting

This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- `pnpm lint` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files
- `pnpm lint:knip` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports
- `pnpm lint:md` ([Markdownlint](https://github.com/DavidAnson/markdownlint): Checks Markdown source files
- `pnpm lint:packages` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the `pnpm-lock.yml` file
- `pnpm lint:spelling` ([cspell](https://cspell.org)): Spell checks across all source files

Read the individual documentation for each linter to understand how it can be configured and used best.

For example, ESLint can be run with `--fix` to auto-fix some lint rule complaints:

```shell
pnpm run lint --fix
```

Note that you'll likely need to run `pnpm build` before `pnpm lint` so that lint rules which check the file system can pick up on any built files.

## Testing

[Vitest](https://vitest.dev) is used for tests.
You can run it locally on the command-line:

```shell
pnpm run test
```

Add the `--coverage` flag to compute test coverage and place reports in the `coverage/` directory:

```shell
pnpm run test --coverage
```

Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to `console.log`, `console.warn`, and other console methods will cause a test to fail.

### Debugging Tests

This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).

## Releases

[Changesets](https://changesets.dev) versions and publishes the packages in this repository.
Releasing is fully automated: no maintainer runs `pnpm publish` by hand.

Every push to `main` runs the `Release` workflow, which does one of two things:

1. If any changesets are pending, it opens or updates a _`chore: version packages`_ pull request
2. If no changesets are pending but some package version in the repository isn't on npm yet, it publishes those packages, then pushes a Git tag and GitHub release for each

That version pull request applies each pending changeset: it bumps the affected packages' versions, writes their `CHANGELOG.md` entries, and deletes the changesets it consumed.
Merging it is therefore what triggers a release.
A `Merge Changesets PR` workflow runs each Monday and enables auto-merge on the version PR once it's at least three days old, so releases batch up rather than going out on every merge.
You can also merge it yourself at any time, or run that workflow manually from the Actions tab.

Publishing uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers).
Each published package is configured on npm to trust this repository's `release.yml` workflow, which is also what earns the packages their [provenance](https://docs.npmjs.com/generating-provenance-statements) attestations.
npm can't yet enable trusted publishing for a package that doesn't exist on the registry ([npm/cli#8544](https://github.com/npm/cli/issues/8544)), so a new package needs one manual `pnpm publish` from a maintainer's machine before its trusted publisher can be configured.
Every release after that goes through this workflow.
