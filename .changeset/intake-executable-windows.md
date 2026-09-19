---
"bingo-fs": patch
"bingo-testers": patch
---

fixed `intake` reporting every file as not executable on Windows, which caused `diffCreatedDirectory` to report spurious `executable` diffs
