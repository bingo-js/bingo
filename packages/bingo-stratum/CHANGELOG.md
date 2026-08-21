# bingo-stratum

## 0.6.0

### Minor Changes

- [#407](https://github.com/bingo-js/bingo/pull/407) [`b2e1d53`](https://github.com/bingo-js/bingo/commit/b2e1d536671d60771228ffd1ce08d23a3495cf53) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Made `produce()` optional in Stratum Blocks.

- [#411](https://github.com/bingo-js/bingo/pull/411) [`9863355`](https://github.com/bingo-js/bingo/commit/98633551b7c7cb9a682c380f575459d40acfc701) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Replaced chalk with Node.js `styleText` in user-facing packages.
This raises the minimum Node.js version for `bingo-stratum` to 20.18.0.

### Patch Changes

- [#409](https://github.com/bingo-js/bingo/pull/409) [`0a22be3`](https://github.com/bingo-js/bingo/commit/0a22be318ad53c3c020e3413c95cd1b2bab6b8da) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Named Stratum Blocks in created Addons test snapshots.

- [#403](https://github.com/bingo-js/bingo/pull/403) [`f427fdd`](https://github.com/bingo-js/bingo/commit/f427fdd9af4e8ca5f2da8dde46f22eb4ec14b99b) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Made `StratumTemplateOptionsShape` a type so Stratum templates infer as `Template`s.
- Updated dependencies [[`345b031`](https://github.com/bingo-js/bingo/commit/345b031ba7c7be00fabf20b427591e5fffa71ca8), [`9863355`](https://github.com/bingo-js/bingo/commit/98633551b7c7cb9a682c380f575459d40acfc701), [`09fa877`](https://github.com/bingo-js/bingo/commit/09fa87762385860aa9b6c2b91fa3653cc75504a1)]:
  - bingo@0.11.0
  - bingo-systems@0.6.0

## 0.5.14

### Patch Changes

- [#401](https://github.com/bingo-js/bingo/pull/401) [`28d9563`](https://github.com/bingo-js/bingo/commit/28d9563a81be519d5b9edbda379975be466aa2df) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Reported an error on unknown CLI flags, with a suggestion for the closest known flag.

- [#405](https://github.com/bingo-js/bingo/pull/405) [`22dc359`](https://github.com/bingo-js/bingo/commit/22dc3590c2faab17af449ae83a18ee33595d5c17) Thanks [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)! - Typed `CreatedBlockAddons` with `object` instead of `any`.
- Updated dependencies [[`28d9563`](https://github.com/bingo-js/bingo/commit/28d9563a81be519d5b9edbda379975be466aa2df), [`d91c0f8`](https://github.com/bingo-js/bingo/commit/d91c0f8720e121d3c3a0715c1ce339dfb2900bb3), [`d1592dc`](https://github.com/bingo-js/bingo/commit/d1592dca2a356e6e7d3a1faf96eb620c94846645)]:
  - bingo@0.10.0
