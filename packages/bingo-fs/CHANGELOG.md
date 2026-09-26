# bingo-fs

## 0.6.0

### Minor Changes

- [#450](https://github.com/bingo-js/bingo/pull/450) [`e0bd07b`](https://github.com/bingo-js/bingo/commit/e0bd07b3b41ac0c5e02c6d3f2d4116003e3800fb) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Added `previously` file metadata: paths that earlier versions of a file were created at, which Stratum's inference treats as the file and which are removed after the file is written

## 0.5.7

### Patch Changes

- [#430](https://github.com/bingo-js/bingo/pull/430) [`bfa8306`](https://github.com/bingo-js/bingo/commit/bfa8306ffa76bfdb000c41de72cecf115c71d4bd) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - fixed `intake` reporting every file as not executable on Windows, which caused `diffCreatedDirectory` to report spurious `executable` diffs
