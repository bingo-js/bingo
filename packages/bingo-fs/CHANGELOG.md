# bingo-fs

## 0.8.0

### Minor Changes

- [#552](https://github.com/bingo-js/bingo/pull/552) [`8f50ea7`](https://github.com/bingo-js/bingo/commit/8f50ea7e8bdc4608213bfaba2108d2aebb1e8470) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Bumped Node support to `^22.22.2 || ^24.15.0 || >=26.0.0`. Namely, this just means a slightly higher minimum for v22.

### Patch Changes

- [#544](https://github.com/bingo-js/bingo/pull/544) [`94c14ee`](https://github.com/bingo-js/bingo/commit/94c14ee7d83e96a24efe67d21510578e4dd79e54) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Updated attribution for all packages to include both maintainers.

## 0.7.0

### Minor Changes

- [#495](https://github.com/bingo-js/bingo/pull/495) [`1e0acec`](https://github.com/bingo-js/bingo/commit/1e0acece25c593e8f22727006ed239c440c287e3) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Added `exports` conditions to the package to establish a strict public API.
In addition to the primary entry point, the `package.json` is also exported.

- [#495](https://github.com/bingo-js/bingo/pull/495) [`1e0acec`](https://github.com/bingo-js/bingo/commit/1e0acece25c593e8f22727006ed239c440c287e3) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Updated supported versions of node to `^22.15.0 || ^24.15.0 || >=26.0.0`, removing support for EoL versions.

### Patch Changes

- [#509](https://github.com/bingo-js/bingo/pull/509) [`89223e9`](https://github.com/bingo-js/bingo/commit/89223e9724b08d8747ad7e9d91bd07bff623d6b5) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Declared `sideEffects: false` to the package.json.

## 0.6.0

### Minor Changes

- [#450](https://github.com/bingo-js/bingo/pull/450) [`e0bd07b`](https://github.com/bingo-js/bingo/commit/e0bd07b3b41ac0c5e02c6d3f2d4116003e3800fb) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Added `previously` file metadata: paths that earlier versions of a file were created at, which Stratum's inference treats as the file and which are removed after the file is written

## 0.5.7

### Patch Changes

- [#430](https://github.com/bingo-js/bingo/pull/430) [`bfa8306`](https://github.com/bingo-js/bingo/commit/bfa8306ffa76bfdb000c41de72cecf115c71d4bd) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - fixed `intake` reporting every file as not executable on Windows, which caused `diffCreatedDirectory` to report spurious `executable` diffs
