# input-from-script

## 0.6.0

### Minor Changes

- [#480](https://github.com/bingo-js/bingo/pull/480) [`471336b`](https://github.com/bingo-js/bingo/commit/471336be2234f8569c0b7ad0cadebb9f5fc388cd) Thanks [@mike-4040](https://github.com/mike-4040)! - Declare `zod` as an optional peer dependency

  `bingo` and the `input-from-*` packages list `zod` (`^4.4.3`) under both `dependencies` and optional `peerDependencies`.
Package managers that support peers with defaults, such as pnpm and Yarn, give `bingo` the project's own copy of `zod` and warn when its version falls outside the supported range.
Projects that use `zod` only through `bingo` get it installed as a regular dependency.

### Patch Changes

- Updated dependencies [[`471336b`](https://github.com/bingo-js/bingo/commit/471336be2234f8569c0b7ad0cadebb9f5fc388cd)]:
  - bingo@0.14.0

## 0.5.9

### Patch Changes

- Updated dependencies [[`e0bd07b`](https://github.com/bingo-js/bingo/commit/e0bd07b3b41ac0c5e02c6d3f2d4116003e3800fb)]:
  - bingo@0.13.0

## 0.5.8

### Patch Changes

- Updated dependencies [[`5fa9461`](https://github.com/bingo-js/bingo/commit/5fa946151c5900198f428d7c4519bdb7fcc95fb1), [`d731ecd`](https://github.com/bingo-js/bingo/commit/d731ecda765d6872c448729f267f95bb81affb30)]:
  - bingo@0.12.0

## 0.5.7

### Patch Changes

- Updated dependencies [[`345b031`](https://github.com/bingo-js/bingo/commit/345b031ba7c7be00fabf20b427591e5fffa71ca8), [`9863355`](https://github.com/bingo-js/bingo/commit/98633551b7c7cb9a682c380f575459d40acfc701), [`09fa877`](https://github.com/bingo-js/bingo/commit/09fa87762385860aa9b6c2b91fa3653cc75504a1)]:
  - bingo@0.11.0

## 0.5.6

### Patch Changes

- Updated dependencies [[`28d9563`](https://github.com/bingo-js/bingo/commit/28d9563a81be519d5b9edbda379975be466aa2df), [`d91c0f8`](https://github.com/bingo-js/bingo/commit/d91c0f8720e121d3c3a0715c1ce339dfb2900bb3), [`d1592dc`](https://github.com/bingo-js/bingo/commit/d1592dca2a356e6e7d3a1faf96eb620c94846645)]:
  - bingo@0.10.0
