# bingo-testers

## 0.6.0

### Minor Changes

- [#435](https://github.com/bingo-js/bingo/pull/435) [`c4e4cc2`](https://github.com/bingo-js/bingo/commit/c4e4cc278c17c913c895972f5d5b46f3f45b9809) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - `diffCreatedDirectory` now returns file diffs in the colored, line-by-line format test runners print for failed string comparisons, highlighting the changed segments within lines.
`processText` is now an optional property of an options object instead of a required function argument.

- [#434](https://github.com/bingo-js/bingo/pull/434) [`d731ecd`](https://github.com/bingo-js/bingo/commit/d731ecda765d6872c448729f267f95bb81affb30) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Allowed `take`, `runInput`, and `testInput` to infer the result type of Inputs with a generic call signature from their args.

### Patch Changes

- Updated dependencies [[`5fa9461`](https://github.com/bingo-js/bingo/commit/5fa946151c5900198f428d7c4519bdb7fcc95fb1), [`d731ecd`](https://github.com/bingo-js/bingo/commit/d731ecda765d6872c448729f267f95bb81affb30)]:
  - bingo@0.12.0

## 0.5.11

### Patch Changes

- [#430](https://github.com/bingo-js/bingo/pull/430) [`bfa8306`](https://github.com/bingo-js/bingo/commit/bfa8306ffa76bfdb000c41de72cecf115c71d4bd) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - fixed `intake` reporting every file as not executable on Windows, which caused `diffCreatedDirectory` to report spurious `executable` diffs
- Updated dependencies [[`bfa8306`](https://github.com/bingo-js/bingo/commit/bfa8306ffa76bfdb000c41de72cecf115c71d4bd)]:
  - bingo-fs@0.5.7

## 0.5.10

### Patch Changes

- Updated dependencies [[`345b031`](https://github.com/bingo-js/bingo/commit/345b031ba7c7be00fabf20b427591e5fffa71ca8), [`9863355`](https://github.com/bingo-js/bingo/commit/98633551b7c7cb9a682c380f575459d40acfc701), [`09fa877`](https://github.com/bingo-js/bingo/commit/09fa87762385860aa9b6c2b91fa3653cc75504a1)]:
  - bingo@0.11.0
  - bingo-systems@0.6.0

## 0.5.9

### Patch Changes

- Updated dependencies [[`28d9563`](https://github.com/bingo-js/bingo/commit/28d9563a81be519d5b9edbda379975be466aa2df), [`d91c0f8`](https://github.com/bingo-js/bingo/commit/d91c0f8720e121d3c3a0715c1ce339dfb2900bb3), [`d1592dc`](https://github.com/bingo-js/bingo/commit/d1592dca2a356e6e7d3a1faf96eb620c94846645)]:
  - bingo@0.10.0
