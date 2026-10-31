---
"bingo-stratum": minor
"bingo-stratum-testers": minor
---

Break up the `addons` api into `props` and `extensions`.
The `addons` name was being applied to two different concepts:

1. Extending a template by passing parameters to a block from the template
2. Defining the parameters that blocks can take in

Now, `extensions` is the name for concept 1, and `props` is the name for concept 2.
This helps disambiguate the name and provide users more clarity for each purpose.
