---
"bingo": minor
"input-from-fetch": minor
"input-from-file": minor
"input-from-octokit": minor
"input-from-script": minor
---

Declare `zod` as an optional peer dependency

`bingo` and the `input-from-*` packages list `zod` (`^4.4.3`) under both `dependencies` and optional `peerDependencies`.
Package managers that support peers with defaults, such as pnpm and Yarn, give `bingo` the project's own copy of `zod` and warn when its version falls outside the supported range.
Projects that use `zod` only through `bingo` get it installed as a regular dependency.
