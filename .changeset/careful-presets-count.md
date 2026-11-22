---
'bingo-stratum': patch
---

Counted files a Preset would produce that are missing on disk against it when inferring `--preset`, so a larger Preset is no longer inferred over a smaller one just because a few of its extra files exist.
