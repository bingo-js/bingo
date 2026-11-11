# input-from-octokit

## 0.4.1

### Patch Changes

- [#561](https://github.com/bingo-js/bingo/pull/561) [`75f9c35`](https://github.com/bingo-js/bingo/commit/75f9c35c86100d100121254a1ad25152144bbe57) Thanks [@michaelfaith](https://github.com/michaelfaith)! - **Deps:** Update `@octokit/types` to v18.
- Updated dependencies [[`75f9c35`](https://github.com/bingo-js/bingo/commit/75f9c35c86100d100121254a1ad25152144bbe57)]:
  - bingo-requests@0.7.1

## 0.4.0

### Minor Changes

- [#552](https://github.com/bingo-js/bingo/pull/552) [`8f50ea7`](https://github.com/bingo-js/bingo/commit/8f50ea7e8bdc4608213bfaba2108d2aebb1e8470) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Bumped Node support to `^22.22.2 || ^24.15.0 || >=26.0.0`. Namely, this just means a slightly higher minimum for v22.

### Patch Changes

- [#544](https://github.com/bingo-js/bingo/pull/544) [`94c14ee`](https://github.com/bingo-js/bingo/commit/94c14ee7d83e96a24efe67d21510578e4dd79e54) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Updated attribution for all packages to include both maintainers.
- Updated dependencies [[`94c14ee`](https://github.com/bingo-js/bingo/commit/94c14ee7d83e96a24efe67d21510578e4dd79e54), [`41f0dbe`](https://github.com/bingo-js/bingo/commit/41f0dbe2d45509e82bf9569bd815df4d9174414d), [`f256818`](https://github.com/bingo-js/bingo/commit/f25681821ac79bccf85a71322cd644b995b9ea81), [`8f50ea7`](https://github.com/bingo-js/bingo/commit/8f50ea7e8bdc4608213bfaba2108d2aebb1e8470)]:
  - bingo@0.16.0
  - bingo-requests@0.7.0

## 0.3.0

### Minor Changes

- [#495](https://github.com/bingo-js/bingo/pull/495) [`1e0acec`](https://github.com/bingo-js/bingo/commit/1e0acece25c593e8f22727006ed239c440c287e3) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Added `exports` conditions to the package to establish a strict public API.
In addition to the primary entry point, the `package.json` is also exported.

- [#495](https://github.com/bingo-js/bingo/pull/495) [`1e0acec`](https://github.com/bingo-js/bingo/commit/1e0acece25c593e8f22727006ed239c440c287e3) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Updated supported versions of node to `^22.15.0 || ^24.15.0 || >=26.0.0`, removing support for EoL versions.

### Patch Changes

- [#509](https://github.com/bingo-js/bingo/pull/509) [`89223e9`](https://github.com/bingo-js/bingo/commit/89223e9724b08d8747ad7e9d91bd07bff623d6b5) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Declared `sideEffects: false` to the package.json.
- Updated dependencies [[`1e0acec`](https://github.com/bingo-js/bingo/commit/1e0acece25c593e8f22727006ed239c440c287e3), [`1e0acec`](https://github.com/bingo-js/bingo/commit/1e0acece25c593e8f22727006ed239c440c287e3), [`89223e9`](https://github.com/bingo-js/bingo/commit/89223e9724b08d8747ad7e9d91bd07bff623d6b5)]:
  - bingo@0.15.0
  - bingo-requests@0.6.0

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
