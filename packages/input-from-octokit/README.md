<h1 align="center">input-from-octokit</h1>

<p align="center">Bingo input that sends a GitHub API request with <a href="https://github.com/octokit/octokit.js">Octokit</a>.</p>

<p align="center">
	<a href="https://github.com/bingo-js/bingo/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://github.com/bingo-js/bingo/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/input-from-octokit"><img alt="📦 npm version" src="https://img.shields.io/npm/v/input-from-octokit?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

```shell
npm i input-from-octokit
```

```ts
import { inputFromOctokit } from "input-from-octokit";

await take(inputFromOctokit, {
	endpoint: "GET /repos/{owner}/{repo}/labels",
	options: { owner: "bingo-js", repo: "bingo" },
});
```

## Options

`inputFromOctokit` defines two parameters:

- `endpoint` _(required)_: the GitHub API endpoint to request, such as `"GET /repos/{owner}/{repo}/labels"`
- `options` _(optional)_: any parameters to send with the request, as accepted by [`octokit.request`](https://github.com/octokit/request.js)

It sends a request to the `endpoint` with [Input Context `octokit`](https://create.bingo/build/details/contexts#input-fetchers) and returns either:

- `undefined`: If the [`offline`](https://create.bingo/cli#--offline) flag is enabled, `octokit` is not available, or an error was caught running the request
- The [response's](https://github.com/octokit/request.js#response) `data`: The awaited result of `octokit.request()`

Requests are sent with an `X-GitHub-Api-Version: 2022-11-28` header and `retries: 0` by default.
Any `headers` and `request` in `options` are merged on top of those defaults.

See **[create.bingo > Templates > Concepts > Inputs](https://create.bingo/build/details/inputs)** for more documentation on Inputs.
