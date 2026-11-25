---
'bingo-stratum': patch
---

Adjusted the calculation that determines how Presets are inferred, penalizing Presets when files they would normally produce are missing on disk. This resolves the issue where a larger Preset was inferred over a smaller one just because a few of its additional files exist.
