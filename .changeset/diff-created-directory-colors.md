---
"bingo-testers": minor
---

Added a `colors` option to `diffCreatedDirectory` that adds ANSI colors to file diffs, highlighting the changed segments within lines.
`processText` may now be passed as an optional `processText` property of that options object instead of as a required function.
This raises the minimum Node.js version for `bingo-testers` to 20.18.0.
