---
"bingo": minor
"input-from-fetch": minor
"input-from-file": minor
"input-from-octokit": minor
"input-from-script": minor
---

Declare `zod` as a peer dependency

`bingo` and the `input-from-*` packages now list `zod` (`^4.4.3`) under `peerDependencies`.
Projects install `zod` alongside `bingo`, and `bingo` inspects schemas from that same copy of `zod`.
A `zod` version outside the supported range produces a peer-range warning at install time.
