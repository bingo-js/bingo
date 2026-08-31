# bingo

## 0.11.0

### Minor Changes

- [#410](https://github.com/bingo-js/bingo/pull/410) [`345b031`](https://github.com/bingo-js/bingo/commit/345b031ba7c7be00fabf20b427591e5fffa71ca8) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Logged script outputs with their colors.

- [#411](https://github.com/bingo-js/bingo/pull/411) [`9863355`](https://github.com/bingo-js/bingo/commit/98633551b7c7cb9a682c380f575459d40acfc701) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Replaced chalk with Node.js `styleText` in user-facing packages.
This raises the minimum Node.js version for `bingo-stratum` to 20.18.0.

- [#408](https://github.com/bingo-js/bingo/pull/408) [`09fa877`](https://github.com/bingo-js/bingo/commit/09fa87762385860aa9b6c2b91fa3653cc75504a1) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Added a `glob` function to `ReadingFileSystem`.
This raises the minimum supported Node.js version to 22.

### Patch Changes

- Updated dependencies [[`345b031`](https://github.com/bingo-js/bingo/commit/345b031ba7c7be00fabf20b427591e5fffa71ca8), [`09fa877`](https://github.com/bingo-js/bingo/commit/09fa87762385860aa9b6c2b91fa3653cc75504a1)]:
  - bingo-systems@0.6.0

## 0.10.0

### Minor Changes

- [#401](https://github.com/bingo-js/bingo/pull/401) [`28d9563`](https://github.com/bingo-js/bingo/commit/28d9563a81be519d5b9edbda379975be466aa2df) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Reported an error on unknown CLI flags, with a suggestion for the closest known flag.

- [#400](https://github.com/bingo-js/bingo/pull/400) [`d91c0f8`](https://github.com/bingo-js/bingo/commit/d91c0f8720e121d3c3a0715c1ce339dfb2900bb3) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Checked that the running user has access to the GitHub owner before creating a repository.

### Patch Changes

- [#402](https://github.com/bingo-js/bingo/pull/402) [`d1592dc`](https://github.com/bingo-js/bingo/commit/d1592dca2a356e6e7d3a1faf96eb620c94846645) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Simplified Handlebars-generated files from arrays to strings when they carry no metadata.
