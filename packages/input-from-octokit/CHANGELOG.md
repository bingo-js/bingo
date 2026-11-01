# input-from-octokit

## 0.2.0

### Minor Changes

- [#480](https://github.com/bingo-js/bingo/pull/480) [`471336b`](https://github.com/bingo-js/bingo/commit/471336be2234f8569c0b7ad0cadebb9f5fc388cd) Thanks [@mike-4040](https://github.com/mike-4040)! - Declare `zod` as an optional peer dependency

  `bingo` and the `input-from-*` packages list `zod` (`^4.4.3`) under both `dependencies` and optional `peerDependencies`.
Package managers that support peers with defaults, such as pnpm and Yarn, give `bingo` the project's own copy of `zod` and warn when its version falls outside the supported range.
Projects that use `zod` only through `bingo` get it installed as a regular dependency.

### Patch Changes

- Updated dependencies [[`471336b`](https://github.com/bingo-js/bingo/commit/471336be2234f8569c0b7ad0cadebb9f5fc388cd)]:
  - bingo@0.14.0

## 0.1.1

### Patch Changes

- Updated dependencies [[`e0bd07b`](https://github.com/bingo-js/bingo/commit/e0bd07b3b41ac0c5e02c6d3f2d4116003e3800fb)]:
  - bingo@0.13.0

## 0.1.0

### Minor Changes

- [#434](https://github.com/bingo-js/bingo/pull/434) [`d731ecd`](https://github.com/bingo-js/bingo/commit/d731ecda765d6872c448729f267f95bb81affb30) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Added `input-from-octokit`: a Bingo input that sends a GitHub API request with Octokit.

### Patch Changes

- Updated dependencies [[`5fa9461`](https://github.com/bingo-js/bingo/commit/5fa946151c5900198f428d7c4519bdb7fcc95fb1), [`d731ecd`](https://github.com/bingo-js/bingo/commit/d731ecda765d6872c448729f267f95bb81affb30)]:
  - bingo@0.12.0
